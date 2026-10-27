// In-page anchors (#work, #about...). One handler owns them: it stops Astro's router from treating
// the click as a navigation, then glides there. Cross-page links like /#about are left to
// the router (the engine lands on the hash after the swap).
import { scrollToTarget } from '../engine';

export function startAnchors() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a || (a.target && a.target !== '_self')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    history.replaceState(history.state, '', url.hash);
    // Let the link's own handlers run first (the phone menu closes and unlocks scrolling).
    requestAnimationFrame(() => {
      const h = document.documentElement.classList;
      h.add('is-jumping');
      h.remove('frame-away');
      scrollToTarget(el, () => {
        h.remove('is-jumping');
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      });
    });
  }, true);
}
