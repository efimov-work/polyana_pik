import { GALLERY } from '@/lib/content';
import Photo from './Photo';

export default function Gallery() {
  return (
    <section data-section="gallery" style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(72px,9vw,140px) clamp(20px,4.5vw,64px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 24, marginBottom: 40 }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05 }}>
          Как выглядят <em style={{ color: '#F0B07E' }}>апартаменты</em>
        </h2>
        <div style={{ fontSize: 17, lineHeight: 1.6, color: '#B9BFB9', maxWidth: 560 }}>
          Ремонт по стандартам Hilton, мебель и техника. Большие окна, дерево и спокойные цвета.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gridAutoRows: 320, gap: 20 }}>
        {GALLERY.map((g) => (
          <Photo key={g.img} src={g.img} alt={g.alt} clip={24} style={{ borderRadius: 24 }} />
        ))}
      </div>
    </section>
  );
}
