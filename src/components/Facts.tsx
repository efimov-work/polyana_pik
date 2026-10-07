import { FACTS } from '@/lib/content';

export default function Facts() {
  return (
    <section
      data-section="facts"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(50%,220px),1fr))',
        gap: 1,
        background: 'rgba(244,241,236,.12)',
        borderBottom: '1px solid rgba(244,241,236,.12)'
      }}
    >
      {FACTS.map((f) => (
        <div key={f.value} style={{ background: '#0E1311', padding: '40px clamp(20px,3vw,40px)' }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(40px,4vw,56px)', lineHeight: 1, color: f.accent ? '#F0B07E' : undefined }}>
            {f.value}
          </div>
          <div style={{ marginTop: 10, fontSize: 15, color: '#B9BFB9', lineHeight: 1.4 }}>{f.text}</div>
        </div>
      ))}
    </section>
  );
}
