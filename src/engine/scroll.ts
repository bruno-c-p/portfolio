// Native scroll. One passive listener, coalesced to one callback per frame.
import { prefersReducedMotion } from './env';

const listeners = new Set<(y: number) => void>();
let queued = false;

export function initScroll() {
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      listeners.forEach((fn) => fn(scrollY));
    });
  }, { passive: true });
}

export const onScroll = (fn: (y: number) => void) => {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
};
export const stopScroll = () => document.documentElement.classList.add('is-locked');
export const startScroll = () => document.documentElement.classList.remove('is-locked');
export const resetScroll = () => scrollTo(0, 0);
/** After back/forward, land where the visitor left (the browser's own restore runs before the
 *  sticky hero has its height). */
export const adoptScroll = (y = scrollY) => scrollTo(0, y);

/** Glide to an element (ease-out quart, 1.2 s). A wheel or touch from the visitor, or a scroll
 *  lock (a page leaving, the menu opening), stops the glide. */
export function scrollToTarget(el: HTMLElement, done: () => void) {
  if (prefersReducedMotion()) { el.scrollIntoView(); return done(); }
  const from = scrollY;
  const to = Math.min(el.getBoundingClientRect().top + from, document.documentElement.scrollHeight - innerHeight);
  const t0 = performance.now();
  let stopped = false;
  const stop = () => { stopped = true; };
  addEventListener('wheel', stop, { once: true, passive: true });
  addEventListener('touchstart', stop, { once: true, passive: true });
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / 1200);
    if (document.documentElement.classList.contains('is-locked')) stopped = true;
    if (!stopped) scrollTo(0, from + (to - from) * (1 - (1 - t) ** 4));
    if (t < 1 && !stopped) return void requestAnimationFrame(step);
    removeEventListener('wheel', stop);
    removeEventListener('touchstart', stop);
    done();
  };
  requestAnimationFrame(step);
}
