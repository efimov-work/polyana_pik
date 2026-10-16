import { asset } from '@/lib/asset';
import { REASONS } from '@/lib/content';
import Photo from './Photo';

export default function Why() {
  return (
    <section
      data-section="why"
      style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: 'clamp(72px,9vw,140px) clamp(20px,4.5vw,64px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,480px),1fr))',
        gap: 'clamp(48px,6vw,96px)',
        alignItems: 'center'
      }}
    >
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#E39A62', marginBottom: 24 }}>Почему сейчас</div>
        <h2 style={{ margin: 0, fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1.08, textWrap: 'balance' }}>
          Единственный комплекс Поляны под управлением Hilton, где апартаменты можно купить{' '}
          <em style={{ color: '#F0B07E' }}>в собственность</em>
        </h2>
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '36px 48px' }}>
          {REASONS.map((r) => (
            <div key={r.title} style={{ borderTop: '1px solid #E39A62', paddingTop: 20 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{r.title}</h3>
              <div style={{ marginTop: 8, fontSize: 16, lineHeight: 1.55, color: '#B9BFB9' }}>{r.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', maxHeight: 820, minHeight: 420 }}>
        <Photo
          src={asset('/assets/why-main.webp')}
          alt="Корпуса комплекса «Поляна Пик» и въездная группа"
          parallax={-0.06}
          style={{ position: 'absolute', right: 0, top: 0, width: '80%', height: '78%', borderRadius: 24 }}
        />
        <Photo
          src={asset('/assets/why-terrace.webp')}
          alt="Фасад корпуса с террасами среди сосен"
          parallax={0.08}
          style={{ position: 'absolute', left: 0, bottom: 0, width: '52%', height: '48%', borderRadius: 24, border: '8px solid #0E1311' }}
        />
        <div
          style={{
            position: 'absolute',
            right: '5%',
            bottom: '12%',
            background: '#F4F1EC',
            color: '#0E1311',
            borderRadius: 16,
            padding: '18px 22px',
            width: 'min(260px,44%)'
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, color: '#6b5a4c' }}>Каждый апартамент</div>
          <div style={{ marginTop: 6, fontFamily: 'var(--fd)', fontSize: 'clamp(18px,1.8vw,24px)', lineHeight: 1.15 }}>
            Подогреваемая терраса с видом на горы
          </div>
        </div>
      </div>
    </section>
  );
}
