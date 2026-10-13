// Case-study figures, in the same verb as the hero: the fast span is recorded by compressing
// the slow one; one-by-one updates draw as a staircase; records tick across in rows.
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { clock, logLerp } from './time';

const fmt = (ms: number) => (ms >= 60000 ? clock(ms).replace(/\.\d+$/, '') : `${Math.round(ms)} ms`);

export function startFigures() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    document.querySelectorAll<HTMLElement>('[data-fig="compare"]').forEach((fig) => {
      const fast = fig.querySelector<HTMLElement>('[data-fig-fast]')!;
      const out = fig.querySelector<HTMLElement>('[data-fig-readout]')!;
      const before = +fig.dataset.before!, after = +fig.dataset.after!;
      const final = out.textContent;
      const s = { p: 0 };
      const apply = () => {
        const ms = logLerp(before, after, s.p);
        fast.style.setProperty('--fw', String(ms / before));
        out.textContent = s.p >= 0.999 ? final : fmt(ms);
      };
      apply();
      gsap.to(s, {
        p: 1, ease: 'none', onUpdate: apply,
        scrollTrigger: { trigger: fig, start: 'top 75%', end: 'center 40%', scrub: 0.6 },
      });
    });
    document.querySelectorAll<HTMLElement>('[data-fig="batch"]').forEach((fig) => {
      const steps = fig.querySelectorAll('[data-step]');
      const bulk = fig.querySelector('[data-bulk]');
      gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 70%', once: true } })
        .fromTo(steps, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.35, ease: ease.soft, stagger: 0.07 })
        .fromTo(bulk, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.out }, 0.2);
    });
    document.querySelectorAll<HTMLElement>('[data-fig="records"]').forEach((fig) => {
      gsap.fromTo(fig.querySelectorAll('[data-rec]'), { clipPath: 'inset(0% 100% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: ease.out, stagger: 0.09,
        scrollTrigger: { trigger: fig, start: 'top 70%', once: true },
      });
    });
  });
}
