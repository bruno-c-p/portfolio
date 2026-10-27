// Small global behaviors: the frame that steps aside, the phone menu, the current-section
// marker, and the footer meters (local time, real load time).
import { animate, onPage, onScroll, ease, prefersReducedMotion, stopScroll, startScroll } from '../engine';
import { nav } from '../engine/astro';
import { site } from '../data/site';

export function startFrame() {
  let last = 0;
  onScroll((y) => {
    if (document.documentElement.classList.contains('is-jumping')) { // keep the nav on screen during a jump
      document.documentElement.classList.toggle('frame-solid', y > 40);
      last = y;
      return;
    }
    if (Math.abs(y - last) < 4) return;
    const h = document.documentElement.classList;
    h.toggle('frame-away', y > 160 && y > last);
    h.toggle('frame-solid', y > 40);
    last = y;
  });
  onPage(() => {
    document.documentElement.classList.remove('frame-away', 'frame-solid');
    last = 0;
  });
}

export function startMenu() {
  onPage(() => {
    const menu = document.querySelector<HTMLElement>('[data-menu]');
    const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
    const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
    if (!menu || !openBtn || !closeBtn) return;
    const focusables = () => [...menu.querySelectorAll<HTMLElement>('a[href], button')];
    let isOpen = false;
    const reduced = prefersReducedMotion();

    const open = () => {
      if (isOpen) return;
      isOpen = true;
      menu.hidden = false;
      openBtn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-open');
      stopScroll();
      if (!reduced) animate(menu, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, { duration: 0.7, ease: ease.inOut });
      focusables()[1]?.focus();
    };
    const close = (restore = true) => {
      if (!isOpen) return;
      isOpen = false;
      openBtn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-open');
      startScroll();
      const done = () => {
        if (isOpen) return;
        menu.hidden = true;
        if (restore) openBtn.focus();
      };
      if (reduced) done();
      else animate(menu, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 100%)' }, { duration: 0.55, ease: ease.inOut }).then(done);
    };
    const key = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key === 'Tab') {
        const f = focusables();
        const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    };
    const onLink = () => close(false);
    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', () => close());
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', onLink));
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('keydown', key);
      document.documentElement.classList.remove('menu-open');
    };
  });
}

/** Marks the nav item of the section crossing 55% of the screen (home only). */
export function startSpy() {
  onPage(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav]')];
    if (!document.querySelector('[data-hero]')) return;
    const active = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? active.add(e.target.id) : active.delete(e.target.id)));
      const id = [...active].pop() ?? null;
      links.forEach((a) => {
        if (a.dataset.nav === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-55% 0px -45% 0px' });
    ['work', 'projects', 'about', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  });
}

/** Footer: local time in Santa Catarina, and how long this page really took. */
export function startMeters() {
  let first = true;
  onPage(() => {
    const clockEl = document.querySelector<HTMLElement>('[data-clock]');
    const load = document.querySelector<HTMLElement>('[data-loadtime]');
    if (load) {
      if (first) {
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        if (fcp) load.textContent = `${Math.round(fcp.startTime)} ms`;
        else new PerformanceObserver((list, obs) => {
          const e = list.getEntriesByName('first-contentful-paint')[0];
          if (e) { load.textContent = `${Math.round(e.startTime)} ms`; obs.disconnect(); }
        }).observe({ type: 'paint', buffered: true });
      } else {
        load.textContent = `${Math.max(1, Math.round(nav.ms))} ms`;
      }
      first = false;
    }
    if (!clockEl) return;
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: site.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const tick = () => {
      const t = fmt.format(Date.now());
      clockEl.textContent = t;
      clockEl.setAttribute('datetime', t);
    };
    tick();
    // Land each update on the second boundary.
    let id: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => { tick(); id = setInterval(tick, 1000); }, 1000 - (Date.now() % 1000));
    return () => { clearTimeout(timeout); clearInterval(id); };
  });
}

/** 404: the trace names the path that got no response. */
export function startNotFound() {
  onPage(() => {
    const el = document.querySelector<HTMLElement>('[data-nf-path]');
    if (el) el.textContent = decodeURI(location.pathname);
  });
}
