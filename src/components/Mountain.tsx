import { COMPLEX } from '@/lib/content';

const RIDGE =
  '0,366 194,272 238,294 324,236 454,308 540,265 583,279 641,236 698,294 914,150 950,164 986,114 1022,128 1102,20 1202,150 1260,121 1440,229';

export default function Mountain() {
  return (
    <section
      data-section="mountain"
      data-interlude="1"
      style={{
        position: 'relative',
        minHeight: 'clamp(440px,75vh,760px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: 'clamp(220px,22vw,320px)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg,#0E1311 0%,#17201c 100%)'
      }}
    >
      <div
        data-il-logo="1"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 'clamp(48px,6vw,96px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          padding: '0 20px',
          textAlign: 'center'
        }}
      >
        <img
          src="/logo.svg"
          alt=""
          width={121}
          height={73}
          loading="lazy"
          decoding="async"
          style={{ height: 'clamp(56px,8vw,120px)', width: 'auto' }}
        />
        <div style={{ fontSize: 'clamp(15px,1.3vw,18px)', color: '#E8E3DB' }}>{COMPLEX.place}</div>
      </div>
      <svg
        data-il-hills="0.35"
        viewBox="0 -20 1440 420"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: 'relative',
          display: 'block',
          flexShrink: 0,
          width: '100%',
          height: 'auto',
          aspectRatio: '1440/420',
          marginBottom: -2,
          overflow: 'visible'
        }}
      >
        <polyline data-il-line="1" points={RIDGE} fill="none" stroke="#E39A62" strokeWidth="2.2" strokeLinejoin="round"></polyline>
      </svg>
    </section>
  );
}
