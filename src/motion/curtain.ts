// Page transition: a sun span. It grows out of the clicked trace bar (or from the left edge) to
// cover the screen, labeled with the real request; then collapses to the right, reporting how
// long the fetch actually took.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { nav } from '../engine/astro';

let source: DOMRect | null = null;
let path = '';
let quick = false; // language switch: same page, other language, so a plain swap

export function startCurtain() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!a) return;
    const bar = a.matches('[data-span]') ? a.querySelector<HTMLElement>('[data-bar]') : null;
    source = bar ? bar.getBoundingClientRect() : null;
    quick = a.hasAttribute('hreflang');
    try { path = new URL(a.href).pathname; } catch { path = ''; }
  }, true);

  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const req = c.querySelector<HTMLElement>('[data-curtain-req]')!;
      const res = c.querySelector<HTMLElement>('[data-curtain-res]')!;
      const line = c.querySelector<HTMLElement>('[data-curtain-line]')!;
      req.textContent = `GET ${path || nav.to || '/'}`;
      gsap.set(line, { clipPath: 'inset(0% 100% 0% 0%)' });
      res.textContent = '';
      if (quick) return gsap.timeline().set(c, { autoAlpha: 1 }).set([req, res, line], { autoAlpha: 0 }).fromTo(panel, { clipPath: 'inset(0px 0% 0px 0px)', opacity: 0 }, { opacity: 1, duration: 0.18 });
      const W = innerWidth, H = innerHeight;
      const from = source
        ? `inset(${source.top}px ${W - source.right}px ${H - source.bottom}px ${source.left}px)`
        : 'inset(0px 100% 0px 0px)';
      source = null;
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set([req, res], { autoAlpha: 0 })
        .fromTo(panel, { clipPath: from }, { clipPath: 'inset(0px 0% 0px 0px)', duration: 0.7, ease: ease.inOut })
        .to(req, { autoAlpha: 1, duration: 0.2 }, '-=0.3')
        .to(line, { clipPath: 'inset(0% 35% 0% 0%)', duration: 0.6, ease: ease.out }, '<');
    },
    enter: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const req = c.querySelector<HTMLElement>('[data-curtain-req]')!;
      const res = c.querySelector<HTMLElement>('[data-curtain-res]')!;
      const line = c.querySelector<HTMLElement>('[data-curtain-line]')!;
      res.textContent = `200 · ${Math.max(1, Math.round(nav.ms))} ms`;
      if (quick) { quick = false; return gsap.timeline().to(panel, { opacity: 0, duration: 0.22 }).set(c, { autoAlpha: 0 }).set(panel, { opacity: 1 }).set([req, res, line], { autoAlpha: 1 }); }
      return gsap.timeline()
        .to(line, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.35, ease: ease.out })
        .to(res, { autoAlpha: 1, duration: 0.15 }, '<0.15')
        .to([req, res, line], { autoAlpha: 0, duration: 0.2 }, '+=0.2')
        .to(panel, { clipPath: 'inset(0px 0% 0px 100%)', duration: 0.7, ease: ease.inOut }, '<')
        .set(c, { autoAlpha: 0 })
        .set(line, { autoAlpha: 1 });
    },
  });
}
