// Astro adapter (ClientRouter). Call start(setup) once from the layout's <script>.
// The leave animation runs IN PARALLEL with fetching the next page, so transitions add no latency.
import { boot, cleanup, enter, leave, syncFlags } from './index';

let navigating = false;
let backForward = false;
/** The last navigation: target path and how long the page fetch really took (ms). */
export const nav = { to: '', ms: 0 };
// Scroll positions per path, so back/forward lands where the visitor left (the browser's own
// restore runs before the sticky hero has its height).
const positions = new Map<string, number>();

export function start(setup?: () => void) {
  document.addEventListener('astro:before-preparation', (e) => {
    navigating = true;
    backForward = e.navigationType === 'traverse';
    positions.set(e.from.pathname, scrollY);
    nav.to = e.to.pathname;
    const load = e.loader;
    e.loader = async () => {
      const t0 = performance.now();
      const timed = load().then(() => { nav.ms = performance.now() - t0; });
      await Promise.all([backForward ? Promise.resolve() : leave(), timed]);
    };
  });
  document.addEventListener('astro:before-swap', () => cleanup());
  document.addEventListener('astro:after-swap', () => syncFlags());
  document.addEventListener('astro:page-load', () => {
    if (!navigating) return void boot(setup);
    navigating = false;
    enter(backForward ? { transition: false, scrollTop: false, restoreTo: positions.get(location.pathname) } : undefined);
  });
  boot(setup);
}
