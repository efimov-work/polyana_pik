'use client';

import { useState } from 'react';
import { LAYOUT_FILTERS, LAYOUTS } from '@/lib/content';
import { askPrice } from '@/lib/interest';

type Filter = (typeof LAYOUT_FILTERS)[number]['id'];

export default function Layouts() {
  const [filter, setFilter] = useState<Filter>('all');
  const shown = LAYOUTS.filter((l) => filter === 'all' || l.group === filter);

  return (
    <section data-section="layouts" style={{ background: '#F4F1EC', color: '#0E1311' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(72px,8vw,120px) clamp(20px,4.5vw,64px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 24, marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#A85E2A', marginBottom: 20 }}>Планировки</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--fd)', fontWeight: 400, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1.05 }}>
              6 планировок от 45,9 до 119 м²
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14, fontWeight: 600 }}>
            {LAYOUT_FILTERS.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  className="chip"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  style={{
                    padding: '12px 22px',
                    borderRadius: 40,
                    fontSize: 14,
                    background: active ? '#0E1311' : 'transparent',
                    color: active ? '#F4F1EC' : '#0E1311',
                    borderColor: active ? '#0E1311' : 'rgba(14,19,17,.25)'
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap: 20 }}>
          {shown.map((l) => (
            <div key={l.area} style={{ background: '#FFFFFF', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: 52, lineHeight: 0.9 }}>
                  {l.area}
                  <span style={{ fontSize: 24 }}> м²</span>
                </div>
                <span style={{ padding: '6px 12px', borderRadius: 30, background: '#F4E6DA', color: '#8A4A1E', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {l.tag}
                </span>
              </div>
              <div
                aria-hidden="true"
                style={{
                  height: 180,
                  borderRadius: 12,
                  background: 'repeating-linear-gradient(135deg,#F1EEE8 0 10px,#E9E5DE 10px 20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#7a746c'
                }}
              >
                планировка {l.area} м²
              </div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{l.title}</h3>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: '#4f544f' }}>{l.desc}</div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  borderTop: '1px solid #E6E1D9',
                  paddingTop: 18,
                  marginTop: 'auto'
                }}
              >
                <span style={{ fontSize: 14, color: '#4f544f' }}>Цена по запросу</span>
                <button type="button" className="price-btn" onClick={() => askPrice(`Планировка ${l.area} м², ${l.title.toLowerCase()}`)}>
                  Узнать цену
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
