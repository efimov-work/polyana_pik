import { COMPLEX, CONTACTS } from '@/lib/content';

export default function Footer() {
  return (
    <footer data-section="footer" style={{ borderTop: '1px solid rgba(244,241,236,.12)' }}>
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '40px clamp(20px,4.5vw,64px) 56px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
          gap: '32px 64px',
          fontSize: 13,
          lineHeight: 1.6,
          color: '#8E958F'
        }}
      >
        <div>
          <img src="/logo.svg" alt="Поляна Пик" width={121} height={73} loading="lazy" decoding="async" style={{ height: 40, width: 'auto', display: 'block' }} />
          <div style={{ marginTop: 12 }}>
            <a className="phone-link" href={CONTACTS.phoneHref}>
              {CONTACTS.phone}
            </a>
          </div>
        </div>
        <div>
          Информация носит ознакомительный характер и не является публичной офертой (ст. 437 ГК РФ). Проектная декларация на сайте наш.дом.рф.
          Застройщик: {COMPLEX.developer}.
        </div>
      </div>
    </footer>
  );
}
