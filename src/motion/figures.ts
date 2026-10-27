// Case-study figures, in the same verb as the hero: the fast span is recorded by compressing
// the slow one; one-by-one updates draw as a staircase; records tick across in rows.
import { animate, onPage, onScroll, ease, prefersReducedMotion } from '../engine';
import { clock, logLerp } from './time';

const fmt = (ms: number) => (ms >= 60000 ? clock(ms).replace(/\.\d+$/, '') : `${Math.round(ms)} ms`);
const hidden = 'inset(0% 100% 0% 0%)';
const shown = 'inset(0% 0% 0% 0%)';

/** Run `fn` once, when `el` is 30% up from the bottom of the screen. */
function once(el: Element, fn: () => void) {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    fn();
  }, { rootMargin: '0px 0px -30% 0px' });
  io.observe(el);
  return () => io.disconnect();
}

export function startFigures() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-fig="compare"]').forEach((fig) => {
      const fast = fig.querySelector<HTMLElement>('[data-fig-fast]')!;
      const out = fig.querySelector<HTMLElement>('[data-fig-readout]')!;
      const before = +fig.dataset.before!, after = +fig.dataset.after!;
      const final = out.textContent;
      // Scrubbed from "top at 75% of the screen" to "center at 40%", eased toward the scroll.
      let p = 0, target = 0, raf = 0, last = 0;
      const apply = () => {
        const ms = logLerp(before, after, p);
        fast.style.setProperty('--fw', String(ms / before));
        out.textContent = p >= 0.999 ? final : fmt(ms);
      };
      const step = (now: number) => {
        p += (target - p) * (1 - Math.exp(-(now - last) / 150));
        last = now;
        if (Math.abs(target - p) < 0.001) p = target;
        apply();
        raf = p === target ? 0 : requestAnimationFrame(step);
      };
      const measure = () => {
        const r = fig.getBoundingClientRect(), vh = innerHeight;
        target = Math.min(1, Math.max(0, (0.75 * vh - r.top) / (0.35 * vh + r.height / 2)));
        if (!raf && target !== p) { last = performance.now(); raf = requestAnimationFrame(step); }
      };
      apply();
      measure();
      cleanups.push(onScroll(measure), () => cancelAnimationFrame(raf));
    });
    document.querySelectorAll<HTMLElement>('[data-fig="batch"]').forEach((fig) => {
      const steps = fig.querySelectorAll<HTMLElement>('[data-step]');
      const bulk = fig.querySelector<HTMLElement>('[data-bulk]')!;
      [...steps, bulk].forEach((el) => { el.style.clipPath = hidden; });
      cleanups.push(once(fig, () => {
        animate(steps, { clipPath: hidden }, { clipPath: shown }, { duration: 0.35, ease: ease.soft, stagger: 0.07 });
        animate(bulk, { clipPath: hidden }, { clipPath: shown }, { duration: 0.6, delay: 0.2 });
      }));
    });
    document.querySelectorAll<HTMLElement>('[data-fig="records"]').forEach((fig) => {
      const rows = fig.querySelectorAll<HTMLElement>('[data-rec]');
      rows.forEach((el) => { el.style.clipPath = hidden; });
      cleanups.push(once(fig, () => animate(rows, { clipPath: hidden }, { clipPath: shown }, { duration: 1.6, stagger: 0.09 })));
    });
    return () => cleanups.forEach((c) => c());
  });
}
