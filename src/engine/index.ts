// Engine core: framework-agnostic page lifecycle. No DOM access at import time (SSR-safe).
// A framework adapter calls:
//   boot(setup)            once, on first load: setup → page init → intro
//   leave() → cleanup()    before the route swaps (leave can run in parallel with the fetch)
//   enter()                after the new page is in the DOM: init → enter animation → intro
// Project code hooks in with onPage(fn): fn runs on every page load and may return a cleanup.
// This site has no loader (a site about speed does not make you wait) and no WebGL.
import { initScroll, resetScroll, adoptScroll, stopScroll, startScroll } from './scroll';
import { initReveals } from './reveal';
import { playEnter, playLeave } from './transition';
import { prefersReducedMotion } from './env';

export { onScroll, scrollToTarget, stopScroll, startScroll } from './scroll';
export { setTransition } from './transition';
export { animate } from './animate';
export { ease, expoInOut, isTouch, prefersReducedMotion } from './env';

export type PageFn = (page: { intro: (fn: () => void) => void; path: string }) => void | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
const intros: (() => void)[] = [];
let ready = false;
let booted = false;

/** Run fn on every page load. */
export const onPage = (fn: PageFn) => { pageFns.add(fn); };

// Flags on <html>. Re-applied on every page because the router swaps root attributes.
export function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted', 'is-loaded');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage(late = false) {
  syncFlags();
  const intro = (fn: () => void) => { intros.push(fn); };
  cleanups.push(initReveals(intro, late));
  ready = true;
  pageFns.forEach((fn) => {
    const c = fn({ intro, path: location.pathname });
    if (typeof c === 'function') cleanups.push(c);
  });
}

const playIntro = () => intros.splice(0).forEach((fn) => fn());

/** First load. `setup` runs once on the client before the first page: register global motion there. */
export function boot(setup?: () => void) {
  if (booted) return;
  booted = true;
  // The CSS failsafe shows hidden content when this script is slow to arrive; if it already
  // has, the page must not hide and replay what the visitor is reading.
  const probe = document.querySelector('[data-split], [data-reveal]');
  const late = !!probe && getComputedStyle(probe).visibility === 'visible';
  initScroll();
  setup?.();
  initPage(late);
  playIntro();
}

/** Play the leave animation (resolve when the screen is covered). */
export async function leave() {
  stopScroll();
  await playLeave();
}

/** Tear down the current page. */
export function cleanup() {
  if (!ready) return;
  ready = false;
  cleanups.splice(0).forEach((c) => c());
  intros.length = 0;
}

/** Init the new page. `transition: false` for back/forward, where no leave ran. */
export async function enter({ transition = true, scrollTop = true, restoreTo }: { transition?: boolean; scrollTop?: boolean; restoreTo?: number } = {}) {
  if (!booted) return;
  cleanup();
  if (scrollTop) resetScroll();
  initPage();
  if (!scrollTop) requestAnimationFrame(() => requestAnimationFrame(() => adoptScroll(restoreTo)));
  if (transition) await playEnter();
  startScroll();
  playIntro();
}
