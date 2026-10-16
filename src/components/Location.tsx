import { asset } from '@/lib/asset';
import { COMPLEX, DISTANCES } from '@/lib/content';
import Photo from './Photo';

export default function Location() {
  return (
    <section
      data-section="location"
      style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '0 clamp(20px,4.5vw,64px) clamp(72px,9vw,140px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
        gap: 20
      }}
    >
      <Photo
        src={asset('/assets/map.webp')}
        alt="Генплан комплекса «Поляна Пик» с высоты"
        clip={24}
        style={{ minHeight: 'clamp(320px,40vw,600px)', borderRadius: 24 }}
      >
        <div style={{ position: 'absolute', left: 20, top: 20, background: '#0E1311', borderRadius: 12, padding: '12px 18px', fontSize: 14, fontWeight: 600 }}>
          {COMPLEX.street}
        </div>
      </Photo>
      <div
        style={{
          background: '#161D1A',
          borderRadius: 24,
          padding: 'clamp(28px,3.5vw,48px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 40
        }}
      >
        <h2 style={{ margin: 0, fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 'clamp(34px,4vw,56px)', lineHeight: 1.05 }}>Центр Красной Поляны</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {DISTANCES.map((d, i) => (
            <div
              key={d.place}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                padding: '18px 0',
                borderBottom: i < DISTANCES.length - 1 ? '1px solid rgba(244,241,236,.14)' : undefined,
                fontSize: 17
              }}
            >
              <span>{d.place}</span>
              <span style={{ color: '#F0B07E', fontWeight: 700, whiteSpace: 'nowrap' }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
