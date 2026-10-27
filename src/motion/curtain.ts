// Page transition: a sun span. It grows out of the clicked trace bar (or from the left edge) to
// cover the screen, labeled with the real request; then collapses to the right, reporting how
// long the fetch actually took.
import { animate, setTransition, ease } from '../engine';
import { nav } from '../engine/astro';

let source: DOMRect | null = null;
let path = '';
let quick = false; // language switch: same page, other language, so a plain swap

const opacity = (els: HTMLElement[], v: string) => els.forEach((el) => { el.style.opacity = v; });

export function startCurtain() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!a) return;
    const bar = a.matches('[data-span]') ? a.querySelector<HTMLElement>('[data-bar]') : null;
    source = bar ? bar.getBoundingClientRect() : null;
    quick = a.hasAttribute('hreflang');
    try { path = new URL(a.href).pathname; } catch { path = ''; }
  }, true);

  const parts = (c: HTMLElement) => ({
    panel: c.querySelector<HTMLElement>('.curtain__panel')!,
    req: c.querySelector<HTMLElement>('[data-curtain-req]')!,
    res: c.querySelector<HTMLElement>('[data-curtain-res]')!,
    line: c.querySelector<HTMLElement>('[data-curtain-line]')!,
  });

  setTransition({
    leave: (c) => {
      const { panel, req, res, line } = parts(c);
      req.textContent = `GET ${path || nav.to || '/'}`;
      res.textContent = '';
      line.style.clipPath = 'inset(0% 100% 0% 0%)';
      c.style.visibility = 'visible';
      if (quick) {
        opacity([req, res, line], '0');
        panel.style.clipPath = 'inset(0px 0% 0px 0px)';
        return animate(panel, { opacity: '0' }, { opacity: '1' }, { duration: 0.18 });
      }
      const W = innerWidth, H = innerHeight;
      const from = source
        ? `inset(${source.top}px ${W - source.right}px ${H - source.bottom}px ${source.left}px)`
        : 'inset(0px 100% 0px 0px)';
      source = null;
      opacity([req, res], '0');
      return Promise.all([
        animate(panel, { clipPath: from }, { clipPath: 'inset(0px 0% 0px 0px)' }, { duration: 0.7, ease: ease.inOut }),
        animate(req, { opacity: '0' }, { opacity: '1' }, { duration: 0.2, delay: 0.4 }),
        animate(line, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 35% 0% 0%)' }, { duration: 0.6, delay: 0.4 }),
      ]);
    },
    enter: async (c) => {
      const { panel, req, res, line } = parts(c);
      res.textContent = `200 · ${Math.max(1, Math.round(nav.ms))} ms`;
      if (quick) {
        quick = false;
        await animate(panel, { opacity: '1' }, { opacity: '0' }, { duration: 0.22 });
      } else {
        await Promise.all([
          animate(line, { clipPath: 'inset(0% 35% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, { duration: 0.35 }),
          animate(res, { opacity: '0' }, { opacity: '1' }, { duration: 0.15, delay: 0.15 }),
        ]);
        await Promise.all([
          animate([req, res, line], { opacity: '1' }, { opacity: '0' }, { duration: 0.2, delay: 0.2 }),
          animate(panel, { clipPath: 'inset(0px 0% 0px 0px)' }, { clipPath: 'inset(0px 0% 0px 100%)' }, { duration: 0.7, delay: 0.2, ease: ease.inOut }),
        ]);
      }
      c.style.visibility = 'hidden';
      panel.style.opacity = '1';
      opacity([req, res, line], '1');
    },
  });
}
