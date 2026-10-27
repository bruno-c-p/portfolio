// The driver for the signature. One variable (hero scroll progress p, plus the intro) sets the
// span width, the color flip of the headline, the ghost of the old six minutes, the readout and
// its label. Idle: at the top, a playhead crawls the six-minute axis at true speed (the pointer
// borrows it to read the time under it). Once the rewrite runs, the playhead steps aside and
// the 800 ms sliver re-fires every 800 ms. One frame loop, running only while the hero is on screen.
import { onPage, onScroll, expoInOut, isTouch, prefersReducedMotion } from '../engine';
import { clock, logLerp, smooth } from './time';

const BEFORE = 360000;
const AFTER = 800;
const DONE = 0.985;

/** Frame-rate independent approach of `from` toward `to` with time constant `tau` (ms). */
const approach = (from: number, to: number, dt: number, tau: number) => from + (to - from) * (1 - Math.exp(-dt / tau));

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
    // Wheels scroll in steps, so the progress glides toward the scroll; touch scrolling is already smooth.
    const fine = !isTouch();

    let introAt = Infinity;
    intro(() => { introAt = performance.now() + 150; });

    const s = { intro: 0, p: 0 };
    let phase = '';
    let lastText = '';
    // At rest nothing changes, so nothing is written: a new --w repaints the whole headline.
    const vars: Record<string, string> = {};
    const set = (k: string, v: string) => { if (vars[k] !== v) { vars[k] = v; stage.style.setProperty(k, v); } };
    const apply = (t: number) => {
      const dur = logLerp(BEFORE, AFTER, s.p);
      const w = s.intro * (dur / BEFORE);
      const done = s.p >= DONE;
      const fire = done ? 1 - ((t % 800) / 800) : 1; // the fast request, again and again
      set('--w', w.toFixed(5));
      set('--g', smooth(0.04, 0.35, s.p).toFixed(3));
      set('--fo', (0.35 + 0.65 * fire).toFixed(3));
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

    let top = 0, len = 1;
    const measure = () => { top = hero.getBoundingClientRect().top + scrollY; len = Math.max(1, hero.offsetHeight - innerHeight); };
    const progress = () => Math.min(1, Math.max(0, (scrollY - top) / len));

    // Frames run while something moves. At rest (the playhead crawling, the clock ticking) the
    // loop sleeps a quarter second between frames; scroll, pointer and resize wake it at once.
    let raf = 0, timer: ReturnType<typeof setTimeout> | undefined;
    const frame = () => { timer = undefined; raf = requestAnimationFrame(tick); };
    const wake = () => { if (timer) { clearTimeout(timer); frame(); } };
    const stop = () => { cancelAnimationFrame(raf); clearTimeout(timer); raf = 0; timer = undefined; };

    // Playhead: real time on the six-minute axis, or the time under the pointer.
    let pointer: number | null = null;
    let lastMove = 0;
    const move = (e: PointerEvent) => {
      const r = track.getBoundingClientRect();
      if (e.clientY < r.top - 40 || e.clientY > r.bottom) { pointer = null; return; }
      pointer = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      lastMove = performance.now();
      wake();
    };
    const leave = () => { pointer = null; };
    if (fine) { hero.addEventListener('pointermove', move); hero.addEventListener('pointerleave', leave); }

    const t0 = performance.now();
    let hx = 0, cx = 0, last = t0;
    const tick = (t: number) => {
      // Read layout before this frame writes anything, so the browser never lays out twice.
      const W = track.clientWidth, cw = chip.offsetWidth;
      const dt = t - last;
      last = t;
      const target = progress();
      s.intro = expoInOut((t - introAt) / 1300);
      s.p = fine && Math.abs(target - s.p) > 1e-4 ? approach(s.p, target, dt, 150) : target;
      apply(t);
      const show = s.intro >= 1 && s.p < 0.02;
      const o = show ? '1' : '0';
      if (head.style.opacity !== o) { head.style.opacity = o; chip.style.opacity = o; }
      let settled = true;
      if (show) {
        const usePointer = pointer !== null && t - lastMove < 2500;
        const f = usePointer ? pointer! : ((t - t0) % BEFORE) / BEFORE;
        // The tag sits right of the playhead when it fits, left when it doesn't, and never
        // leaves the axis (on phones it is wide relative to the screen).
        const gap = 8, at = f * W;
        const side = Math.max(0, Math.min(at + gap + cw <= W ? at + gap : at - gap - cw, W - cw));
        hx = approach(hx, at, dt, 120);
        cx = approach(cx, side, dt, 120);
        settled = !usePointer && Math.abs(hx - at) < 0.5 && Math.abs(cx - side) < 0.5;
        // Each move repaints the blend under the playhead, so it moves in whole device pixels.
        const hp = `translateX(${Math.round(hx * devicePixelRatio) / devicePixelRatio}px)`;
        const cp = `translateX(${Math.round(cx * devicePixelRatio) / devicePixelRatio}px)`;
        if (head.style.transform !== hp) head.style.transform = hp;
        if (chip.style.transform !== cp) chip.style.transform = cp;
        const txt = usePointer ? clock(f * BEFORE) : `${waited} ${clock((t - t0) % BEFORE).slice(0, -4)}`;
        if (chip.textContent !== txt) chip.textContent = txt;
      }
      const rest = settled && s.intro >= 1 && s.p === target && s.p < DONE;
      if (rest) timer = setTimeout(frame, 250);
      else raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      stop();
      if (e.isIntersecting) { last = performance.now(); frame(); }
    });
    io.observe(hero);
    const resize = () => { measure(); wake(); };
    const offScroll = onScroll(wake);
    measure();
    addEventListener('resize', resize);
    apply(0);
    return () => {
      stop();
      offScroll();
      io.disconnect();
      removeEventListener('resize', resize);
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
    };
  });
}
