'use client';

import { useEffect } from 'react';

const EASE = 'cubic-bezier(.2,.7,.2,1)';

type Pending = { el: Element; fn: () => void };

export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let pending: Pending[] = [];
    const top = (el: Element) => el.getBoundingClientRect().top;

    document.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => {
      if (top(el) < window.innerHeight) return;
      const round = `round ${Number(el.dataset.clip) || 0}px`;
      const hidden = `inset(100% 0 0 0 ${round})`;
      el.style.clipPath = hidden;
      pending.push({
        el,
        fn: () => {
          const anim = el.animate([{ clipPath: hidden }, { clipPath: `inset(0 0 0 0 ${round})` }], {
            duration: 1300,
            delay: (Number(el.dataset.rvi) || 0) * 120,
            easing: 'cubic-bezier(.7,0,.2,1)',
            fill: 'forwards'
          });
          const reset = () => {
            el.style.clipPath = '';
            anim.cancel();
          };
          anim.finished.then(reset, () => {
            el.style.clipPath = '';
          });
        }
      });
    });

    const il = document.querySelector<HTMLElement>('[data-interlude]');
    const hills = il ? Array.from(il.querySelectorAll<SVGSVGElement>('[data-il-hills]')) : [];
    const ilLogo = il?.querySelector<HTMLElement>('[data-il-logo]') ?? null;
    const ilLine = il?.querySelector<SVGPolylineElement>('[data-il-line]') ?? null;
    let ilLen = 0;
    if (ilLine) {
      ilLen = ilLine.getTotalLength();
      ilLine.style.strokeDasharray = String(ilLen);
      ilLine.style.strokeDashoffset = String(ilLen);
    }
    if (ilLogo) ilLogo.style.opacity = '0';
    if (il) {
      pending.push({
        el: ilLine?.ownerSVGElement ?? il,
        fn: () => {
          if (ilLine) {
            const settle = () => {
              ilLine.style.strokeDasharray = 'none';
              ilLine.style.strokeDashoffset = '0';
            };
            ilLine
              .animate([{ strokeDashoffset: ilLen }, { strokeDashoffset: 0 }], {
                duration: 2200,
                delay: 150,
                easing: 'cubic-bezier(.6,0,.3,1)',
                fill: 'forwards'
              })
              .finished.then(settle, settle);
          }
          if (ilLogo) {
            ilLogo.animate(
              [
                { opacity: 0, transform: 'translateY(24px)', filter: 'blur(8px)' },
                { opacity: 1, transform: 'none', filter: 'blur(0)' }
              ],
              { duration: 1100, delay: 1500, easing: EASE, fill: 'backwards' }
            );
            ilLogo.style.opacity = '';
          }
        }
      });
    }

    const targets: [HTMLElement, number][] = [];
    document.querySelectorAll<HTMLElement>('[data-section]:not([data-section="hero"])').forEach((sec) => {
      sec.querySelectorAll<HTMLElement>('h2, h2 ~ p, h2 + div').forEach((el) => {
        if (!el.closest('[data-noreveal]')) targets.push([el, 0]);
      });
      sec.querySelectorAll<HTMLElement>('*').forEach((el) => {
        if (el.hasAttribute('data-noreveal')) {
          targets.push([el, 0]);
          return;
        }
        if (el.closest('[data-noreveal]') || el.closest('[data-px]')) return;
        if (getComputedStyle(el).display !== 'grid' || el.children.length < 2) return;
        Array.from(el.children).forEach((c, i) => {
          if (c instanceof HTMLElement && !c.matches('h2') && !c.querySelector('h2')) targets.push([c, i]);
        });
      });
    });

    const seen = new Set<HTMLElement>();
    targets.forEach(([el, i]) => {
      if (seen.has(el)) return;
      seen.add(el);
      el.dataset.rvi = String(i);
      if (top(el) <= window.innerHeight) return;
      el.style.opacity = '0';
      pending.push({
        el,
        fn: () => {
          el.animate(
            [
              { opacity: 0, transform: 'translateY(48px) scale(.98)' },
              { opacity: 1, transform: 'none' }
            ],
            { duration: 900, delay: Math.min(i, 6) * 90, easing: EASE, fill: 'backwards' }
          );
          el.style.opacity = '';
        }
      });
    });

    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-px]'));

    const update = () => {
      const vh = window.innerHeight;

      if (pending.length) {
        const line = vh * 0.9;
        pending = pending.filter((p) => {
          if (top(p.el) >= line) return true;
          p.fn();
          return false;
        });
      }

      parallax.forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        const c = r.top + r.height / 2 - vh / 2;
        const y = Math.max(-40, Math.min(40, c * Number(el.dataset.px)));
        el.style.transform = `translateY(${y.toFixed(1)}px)`;
      });

      if (il) {
        const r = il.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh + 200) {
          const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height * 0.4)));
          hills.forEach((h) => {
            h.style.transform = `translateY(${((1 - p) * 160 * Number(h.dataset.ilHills)).toFixed(1)}px)`;
          });
        }
      }
    };

    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();

    const flush = () => {
      pending.forEach((p) => p.fn());
      pending = [];
    };
    const fallback = window.setTimeout(flush, 15000);

    const kb = document.querySelector<HTMLElement>('[data-kb]');
    const kbWatch = kb
      ? new IntersectionObserver(([entry]) => kb.classList.toggle('kb--paused', !entry.isIntersecting))
      : null;
    if (kb) kbWatch?.observe(kb.parentElement ?? kb);

    return () => {
      window.clearTimeout(fallback);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      kbWatch?.disconnect();
      flush();
    };
  }, []);

  return null;
}
