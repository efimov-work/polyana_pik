import type { CSSProperties } from 'react';
import { asset } from '@/lib/asset';
import { CONTACTS } from '@/lib/content';
import HeroForm from './HeroForm';

const step = (i: number) => ({ ['--i' as string]: i }) as CSSProperties;

export default function Hero() {
  return (
    <section
      data-section="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 48,
        background: '#1b2420',
        overflow: 'hidden'
      }}
    >
      <div className="kb" data-kb="1" style={{ position: 'absolute', inset: 0, background: '#1b2420', transformOrigin: '60% 40%' }}>
        <img
          className="cover"
          src={asset('/assets/hero.webp')}
          srcSet={`${asset('/assets/hero-1200.webp')} 1200w, ${asset('/assets/hero.webp')} 2400w`}
          sizes="100vw"
          alt="Комплекс апартаментов «Поляна Пик» на фоне гор Красной Поляны"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg,rgba(14,19,17,.6) 0%,rgba(14,19,17,.1) 30%,rgba(14,19,17,.3) 55%,rgba(14,19,17,.94) 100%)'
        }}
      ></div>
      <header
        className="hero-in"
        style={{
          ...step(0),
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 'clamp(18px,2.5vw,28px) clamp(20px,4.5vw,64px)'
        }}
      >
        <img src={asset('/logo.svg')} alt="Поляна Пик" width={121} height={73} style={{ height: 'clamp(30px,4vw,52px)', width: 'auto', display: 'block' }} />
        <a className="phone-link" href={CONTACTS.phoneHref} style={{ fontSize: 'clamp(14px,1.2vw,16px)', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {CONTACTS.phone}
        </a>
      </header>
      <div
        style={{
          position: 'relative',
          padding: '0 clamp(20px,4.5vw,64px) clamp(40px,6vw,72px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
          gap: 'clamp(32px,5vw,64px)',
          alignItems: 'end'
        }}
      >
        <div>
          <div
            className="hero-in"
            style={{
              ...step(1),
              display: 'inline-flex',
              gap: 10,
              alignItems: 'center',
              padding: '8px 16px',
              border: '1px solid rgba(244,241,236,.5)',
              borderRadius: 40,
              fontSize: 'clamp(12px,1.1vw,14px)',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              marginBottom: 28,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              background: 'rgba(14,19,17,.25)'
            }}
          >
            <span className="pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#E39A62', flexShrink: 0 }}></span>
            Рассрочка 0% до 3 лет, взнос 15%
          </div>
          <h1
            className="hero-in"
            style={{
              ...step(2),
              margin: 0,
              fontFamily: 'var(--fd)',
              fontWeight: 400,
              fontSize: 'clamp(44px,6.6vw,96px)',
              lineHeight: 1,
              letterSpacing: '-.01em',
              textWrap: 'balance'
            }}
          >
            Апартаменты <em style={{ color: '#F0B07E' }}>в Красной Поляне</em>
          </h1>
          <p className="hero-in" style={{ ...step(3), margin: '24px 0 0', maxWidth: 620, fontSize: 'clamp(17px,1.4vw,20px)', lineHeight: 1.5 }}>
            Квартиры, пентхаусы и шале в комплексе под управлением Hilton. Отель сам сдаёт ваш апартамент и перечисляет доход.
          </p>
        </div>
        <HeroForm />
      </div>
    </section>
  );
}
