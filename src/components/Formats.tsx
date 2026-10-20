import { COMMERCE, FORMATS } from '@/lib/content';
import Photo from './Photo';

export default function Formats() {
  return (
    <section data-section="formats" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px,4.5vw,64px) clamp(72px,9vw,140px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 20, marginBottom: 40 }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05 }}>
          Что можно <em style={{ color: '#F0B07E' }}>купить</em>
        </h2>
        <div style={{ maxWidth: 380, fontSize: 16, lineHeight: 1.55, color: '#B9BFB9' }}>Для себя, под сдачу или под свой бизнес.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 20 }}>
        {FORMATS.map((f) => (
          <Photo key={f.title} src={f.img} alt={f.alt} clip={24} style={{ height: 460, borderRadius: 24 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(14,19,17,0) 35%,rgba(14,19,17,.9))' }}></div>
            <div style={{ position: 'absolute', left: 28, right: 28, bottom: 28 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F0B07E' }}>{f.note}</div>
              <h3 style={{ margin: '8px 0 0', fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 40, lineHeight: 1 }}>{f.title}</h3>
              <div style={{ marginTop: 10, fontSize: 15, lineHeight: 1.5 }}>{f.text}</div>
            </div>
          </Photo>
        ))}
        <div
          style={{
            gridColumn: '1/-1',
            borderRadius: 24,
            background: '#E39A62',
            color: '#0E1311',
            padding: 'clamp(24px,3vw,40px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            gap: 32,
            alignItems: 'end'
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{COMMERCE.note}</div>
            <h3 style={{ margin: '8px 0 0', fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 44, lineHeight: 1 }}>{COMMERCE.title}</h3>
            <div style={{ marginTop: 12, fontSize: 16, lineHeight: 1.5 }}>{COMMERCE.text}</div>
            <div style={{ marginTop: 16, fontSize: 20, fontWeight: 700 }}>{COMMERCE.rent}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 16, fontWeight: 600 }}>
            {COMMERCE.lots.map((lot, i) => (
              <div
                key={lot.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                  ...(i < COMMERCE.lots.length - 1 ? { borderBottom: '1px solid rgba(14,19,17,.3)', paddingBottom: 10 } : null)
                }}
              >
                <span>{lot.name}</span>
                <span>{lot.area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
