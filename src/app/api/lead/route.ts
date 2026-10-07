import { NextResponse } from 'next/server';
import { isPhone, phoneDigits } from '@/lib/contact';
import { PURPOSES } from '@/lib/content';
import { oneLine, readJson } from '@/lib/server/http';
import { recordLead, recordUndelivered, type Lead } from '@/lib/server/leadStore';
import { allow, clientKey } from '@/lib/server/rateLimit';
import { esc, sendToOwner, telegramConfigured } from '@/lib/server/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  name?: string;
  phone?: string;
  purpose?: string;
  interest?: string;
  form?: string;
  website?: string;
};

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

const FORMS: Record<string, string> = {
  hero: 'первый экран, презентация и цены',
  agent: 'консультация, прайс и расчёт дохода'
};

function format(lead: Lead): string {
  const row = (label: string, value: string) => `<b>${label}:</b> ${esc(value || '-')}`;
  return [
    '🏔 <b>Заявка с сайта «Поляна Пик»</b>',
    '',
    row('Имя', lead.name),
    `<b>Телефон:</b> <code>${esc(lead.phone)}</code>`,
    row('Цель', lead.purpose),
    row('Интерес', lead.interest),
    '',
    row('Форма', FORMS[lead.form] || lead.form)
  ].join('\n');
}

export async function POST(req: Request) {
  const parsed = await readJson<Body>(req);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }

  const body = parsed.data;
  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 });
  }

  if (String(body.website || '').trim()) {
    return NextResponse.json({ ok: true });
  }

  const phone = oneLine(String(body.phone || ''), 40);
  if (!isPhone(phone)) {
    return NextResponse.json({ ok: false, error: 'bad_phone' }, { status: 400 });
  }

  const ip = clientKey(req);
  if (!allow(`lead:${phoneDigits(phone)}`, 3, HOUR)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }
  if (ip && !allow(`lead-ip:${ip}`, 10, HOUR)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }
  if (!allow('lead:global', 120, MINUTE)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const purpose = String(body.purpose || '');
  const form = String(body.form || '');

  const lead: Lead = {
    name: oneLine(String(body.name || ''), 200),
    phone,
    purpose: (PURPOSES as readonly string[]).includes(purpose) ? purpose : '',
    interest: oneLine(String(body.interest || ''), 200),
    form: form in FORMS ? form : '',
    at: new Date().toISOString()
  };

  await recordLead(lead);

  const delivered = telegramConfigured()
    ? (await sendToOwner(format(lead), { html: true })) !== null
    : false;

  if (!delivered) {
    await recordUndelivered(lead);
    console.error('lead not delivered to telegram', JSON.stringify({ phone: lead.phone, at: lead.at }));
  }

  return NextResponse.json({ ok: true });
}
