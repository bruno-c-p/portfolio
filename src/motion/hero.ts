// The driver for the signature. One variable (hero scroll progress p, plus the intro) sets the
// span width, the color flip of the headline, the ghost of the old six minutes, the readout and
// its label. Idle: at the top, a playhead crawls the six-minute axis at true speed (the pointer
// borrows it to read the time under it). Once the rewrite runs, the playhead steps aside and
// the 800 ms sliver re-fires every 800 ms.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, isTouch, prefersReducedMotion } from '../engine';
import { clock, logLerp, smooth } from './time';

const BEFORE = 360000;
const AFTER = 800;
const DONE = 0.985;

export function startHero() {
  onPage(({ intro }) => {
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    if (!hero) return;
    if (prefersReducedMotion()) return; // CSS holds the full six-minute span still
    const stage = hero.querySelector<HTMLElement>('.hero__stage')!;
    const track = hero.querySelector<HTMLElement>('[data-hero-track]')!;
    const readout = hero.querySelector<HTMLElement>('[data-readout]')!;
    const label = hero.querySelector<HTMLElement>('[data-readout-label]')!;
    const hint = hero.querySelector<HTMLElement>('[data-hero-hint]')!;
    const head = hero.querySelector<HTMLElement>('[data-hero-head]')!;
    const chip = hero.querySelector<HTMLElement>('[data-hero-chip]')!;
    const waited = document.documentElement.lang.startsWith('pt') ? 'você esperou' : 'you’ve waited';

    const s = { intro: 0, p: 0 };
    let phase = '';
    let lastText = '';
    const apply = (t: number) => {
      const dur = logLerp(BEFORE, AFTER, s.p);
      const w = s.intro * (dur / BEFORE);
      const done = s.p >= DONE;
      const fire = done ? 1 - ((t % 0.8) / 0.8) : 1; // the fast request, again and again
      stage.style.setProperty('--w', w.toFixed(5));
      stage.style.setProperty('--g', smooth(0.04, 0.35, s.p).toFixed(3));
      stage.style.setProperty('--fo', (0.35 + 0.65 * fire).toFixed(3));
      const text = clock(s.intro < 1 ? s.intro * BEFORE : done ? AFTER : dur);
      if (text !== lastText) { readout.textContent = text; lastText = text; }
      const next = done ? 'after' : s.p > 0.01 ? 'during' : 'before';
      if (next !== phase) {
        phase = next;
        label.textContent = label.dataset[next] || '';
        label.classList.toggle('is-after', done);
        hint.classList.toggle('is-done', next !== 'before');
      }
    };

    intro.add(gsap.to(s, { intro: 1, duration: 1.3, ease: ease.inOut, onUpdate: () => apply(gsap.ticker.time) }), 0.15);

    ScrollTrigger.create({
      trigger: hero, start: 'top top', end: 'bottom bottom', scrub: true,
      onUpdate: (self) => { s.p = self.progress; },
    });

    // Playhead: real time on the six-minute axis, or the time under the pointer.
    const hx = gsap.quickTo(head, 'x', { duration: 0.5, ease: 'power3.out' });
    const cx = gsap.quickTo(chip, 'x', { duration: 0.5, ease: 'power3.out' });
    let pointer: number | null = null;
    let lastMove = 0;
    const move = (e: PointerEvent) => {
      const r = track.getBoundingClientRect();
      if (e.clientY < r.top - 40 || e.clientY > r.bottom) { pointer = null; return; }
      pointer = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      lastMove = gsap.ticker.time;
    };
    const leave = () => { pointer = null; };
    const fine = !isTouch();
    if (fine) { hero.addEventListener('pointermove', move); hero.addEventListener('pointerleave', leave); }
    const t0 = gsap.ticker.time;
    const tick = (t: number) => {
      apply(t);
      const show = s.intro >= 1 && s.p < 0.02;
      const o = show ? '1' : '0';
      if (head.style.opacity !== o) { head.style.opacity = o; chip.style.opacity = o; }
      if (!show) return;
      const W = track.clientWidth;
      const real = ((t - t0) % (BEFORE / 1000)) / (BEFORE / 1000);
      const usePointer = pointer !== null && t - lastMove < 2.5;
      const f = usePointer ? pointer! : real;
      hx(f * W);
      // The tag sits right of the playhead when it fits, left when it doesn't, and never
      // leaves the axis (on phones it is wide relative to the screen).
      const cw = chip.offsetWidth, gap = 8, at = f * W;
      const side = at + gap + cw <= W ? at + gap : at - gap - cw;
      cx(Math.max(0, Math.min(side, W - cw)));
      const txt = usePointer ? clock(f * BEFORE) : `${waited} ${clock(((t - t0) * 1000) % BEFORE).slice(0, -4)}`;
      if (chip.textContent !== txt) chip.textContent = txt;
    };
    const st = ScrollTrigger.create({
      trigger: hero, start: 'top bottom', end: 'bottom top',
      onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
    });
    gsap.ticker.add(tick);
    apply(0);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
    };
  });
}
