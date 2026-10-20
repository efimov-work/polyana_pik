import type { CSSProperties } from 'react';

const card: CSSProperties = {
  borderRadius: 24,
  padding: 'clamp(28px,3vw,44px)',
  minHeight: 340,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 32
};

const dark: CSSProperties = { ...card, background: '#161D1A', border: '1px solid rgba(244,241,236,.12)' };
const figure: CSSProperties = { fontFamily: 'var(--fd)', fontSize: 'clamp(72px,8vw,110px)', lineHeight: 0.85 };
const title: CSSProperties = { margin: 0, fontSize: 21, fontWeight: 700 };
const text: CSSProperties = { marginTop: 10, fontSize: 16, lineHeight: 1.5 };

export default function Terms() {
  return (
    <section data-section="terms" style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(72px,9vw,140px) clamp(20px,4.5vw,64px)' }}>
      <div style={{ textAlign: 'center', maxWidth: 980, margin: '0 auto 56px' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#E39A62', marginBottom: 24 }}>Условия покупки</div>
        <h2 style={{ margin: 0, fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1.05 }}>
          Рассрочка 0% <em style={{ color: '#F0B07E' }}>на 3 года</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 20 }}>
        <div style={{ ...card, background: '#E39A62', color: '#0E1311' }}>
          <div style={figure}>0%</div>
          <div>
            <h3 style={title}>Рассрочка от застройщика</h3>
            <div style={text}>Первоначальный взнос 15%, остаток частями до 3 лет. Цена в договоре не меняется.</div>
          </div>
        </div>
        <div style={dark}>
          <div style={figure}>
            18<span style={{ fontSize: 36 }}> мес</span>
          </div>
          <div>
            <h3 style={title}>Коммерция: 50% взнос</h3>
            <div style={{ ...text, color: '#B9BFB9' }}>Остаток равными платежами в течение 18 месяцев.</div>
          </div>
        </div>
        <div style={dark}>
          <div style={figure}>ДДУ</div>
          <div>
            <h3 style={title}>Сделка по 214‑ФЗ</h3>
            <div style={{ ...text, color: '#B9BFB9' }}>Регистрация в Росреестре. Проектная декларация на наш.дом.рф.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
