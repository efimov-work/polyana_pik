import { NextResponse } from 'next/server';
import { CHAT } from '@/lib/chat';
import { isPhone } from '@/lib/contact';
import { multiLine, oneLine, readJson } from '@/lib/server/http';
import { allow, clientKey } from '@/lib/server/rateLimit';
import { esc, sendToOwner, telegramConfigured } from '@/lib/server/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  session?: string;
  page?: string;
  text?: string;
  reply?: string;
  phone?: string;
};

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

function format(session: string, page: string, text: string, reply: string, phone: string): string {
  return [
    `${phone ? '📞' : '💬'} <b>Чат · ${esc(CHAT.site)}</b> · #${esc(session)}`,
    phone ? `<b>Телефон:</b> <code>${esc(phone)}</code>` : '',
    '',
    `👤 ${esc(text)}`,
    '',
    `🤖 ${esc(reply)}`,
    page && page !== '/' ? `\n<i>${esc(page)}</i>` : ''
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
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

  const session = oneLine(String(body.session || ''), 16).replace(/[^\w-]/g, '') || 'anon';
  const text = multiLine(String(body.text || ''), 600);
  if (!text) {
    return NextResponse.json({ ok: false, error: 'empty' }, { status: 400 });
  }

  const ip = clientKey(req);
  if (!allow(`chat:${session}`, 30, HOUR)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }
  if (ip && !allow(`chat-ip:${ip}`, 60, HOUR)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }
  if (!allow('chat:global', 120, MINUTE)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const phone = oneLine(String(body.phone || ''), 40);
  const message = format(session, oneLine(String(body.page || ''), 200), text, multiLine(String(body.reply || ''), 1500), isPhone(phone) ? phone : '');

  const delivered = telegramConfigured() ? (await sendToOwner(message, { html: true })) !== null : false;
  if (!delivered) console.error('chat not delivered to telegram', JSON.stringify({ session, phone }));

  return NextResponse.json({ ok: true });
}
