import { asset } from '@/lib/asset';
import { SERVICES } from '@/lib/content';

export default function Infrastructure() {
  return (
    <section data-section="infrastructure" data-clip="0" style={{ position: 'relative', background: '#1b2420', overflow: 'hidden' }}>
      <img className="cover" src={asset('/assets/infrastructure.webp')} alt="Бассейн с панорамными окнами и видом на горы" loading="lazy" decoding="async" />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,19,17,.84)' }}></div>
      <div
        style={{
          position: 'relative',
          maxWidth: 1440,
          margin: '0 auto',
          padding: 'clamp(72px,9vw,140px) clamp(20px,4.5vw,64px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: 'clamp(40px,6vw,96px)'
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#E39A62', marginBottom: 24 }}>Инфраструктура</div>
          <h2 style={{ margin: 0, fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05 }}>
            12 сервисов <em style={{ color: '#F0B07E' }}>на территории</em>
          </h2>
          <p style={{ margin: '24px 0 0', fontSize: 17, lineHeight: 1.6, color: '#E8E3DB', maxWidth: 480 }}>
            Уборкой, ремонтом и поиском арендаторов занимается управляющая компания.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,240px),1fr))', columnGap: 48 }}>
          {SERVICES.map((name, i) => (
            <div key={name} style={{ display: 'flex', gap: 18, alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid rgba(244,241,236,.18)' }}>
              <span style={{ fontSize: 13, color: '#E39A62', fontWeight: 700, width: 24, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 19, fontWeight: 500 }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
