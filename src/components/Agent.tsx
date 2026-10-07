import type { CSSProperties } from 'react';
import { CONTACTS } from '@/lib/content';
import { REQUEST_ID } from '@/lib/interest';
import AgentForm from './AgentForm';

const pill: CSSProperties = { padding: '12px 20px', borderRadius: 40, fontSize: 14, fontWeight: 600 };

const MESSENGERS = [
  { name: 'MAX', href: CONTACTS.max, style: { ...pill, background: '#0E1311', color: '#F4F1EC' } },
  { name: 'Telegram', href: CONTACTS.telegram, style: { ...pill, border: '1px solid rgba(14,19,17,.25)' } }
];

export default function Agent() {
  return (
    <section data-section="agent" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px,4.5vw,64px) clamp(64px,8vw,120px)' }}>
      <div
        id={REQUEST_ID}
        data-noreveal="1"
        style={{
          background: '#F4F1EC',
          color: '#0E1311',
          borderRadius: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: 'clamp(28px,4vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#A85E2A' }}>Консультация</div>
            <h2 style={{ margin: '16px 0 0', fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 'clamp(36px,4.4vw,60px)', lineHeight: 1.05 }}>
              Покажем комплекс вживую или по видео
            </h2>
            <div style={{ marginTop: 16, fontSize: 17, lineHeight: 1.55, color: '#4f544f', maxWidth: 520 }}>
              Расскажем, какие лоты свободны и сколько можно получать со сдачи. Пришлём прайс.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a className="phone-link" href={CONTACTS.phoneHref} style={{ fontSize: 26, fontWeight: 700, alignSelf: 'start' }}>
              {CONTACTS.phone}
            </a>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {MESSENGERS.map((m) =>
                m.href ? (
                  <a key={m.name} className="pill-link" href={m.href} target="_blank" rel="noopener noreferrer" style={m.style}>
                    {m.name}
                  </a>
                ) : (
                  <span key={m.name} style={m.style}>
                    {m.name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
        <div style={{ padding: 'clamp(28px,4vw,56px)', background: '#0E1311', color: '#F4F1EC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AgentForm />
        </div>
      </div>
    </section>
  );
}
