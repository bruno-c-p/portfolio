// Declarative motion through data attributes. Authoring happens in markup:
//   data-split="lines|chars"   text reveal, on scroll or on intro
//   data-reveal                block reveal: a span drawn open left to right
//   data-intro                 play with the page intro instead of on scroll
//   data-delay="0.2"           extra delay (seconds)
// Motion verb: lines are recorded like spans, so they clip open from the left.
// Text is split only when it reveals and restored after. Lines measured against a fallback font
// would re-wrap when the web font swaps in, so until it has landed the text is wiped open whole.
// Every effect is skipped under reduced motion; CSS keeps content visible without JS.
import { animate } from './animate';
import { prefersReducedMotion } from './env';

function split(el: HTMLElement, chars: boolean) {
  const line = (text: string) => Object.assign(document.createElement('span'), { className: 'split-line', textContent: text });
  if (chars) {
    const spans = [...el.textContent!.trim()].map((ch) => Object.assign(document.createElement('span'), { textContent: ch }));
    const mask = line('');
    mask.append(...spans);
    el.replaceChildren(mask);
    return spans;
  }
  // Measure each breakable piece (words, and word parts after a hyphen) with its trailing space.
  const pieces = el.textContent!.trim().match(/\S+?-(?=\S)|\S+\s*/g)!;
  const words = pieces.map((p) => Object.assign(document.createElement('span'), { textContent: p }));
  el.replaceChildren(...words);
  const lines: string[] = [];
  let top = NaN;
  for (const w of words) {
    if (w.offsetTop !== top) { lines.push(''); top = w.offsetTop; }
    lines[lines.length - 1] += w.textContent;
  }
  const spans = lines.map((l) => line(l.trim()));
  el.replaceChildren(...spans);
  return spans;
}

function reveal(el: HTMLElement) {
  const delay = parseFloat(el.dataset.delay || '0');
  el.style.visibility = 'visible';
  if (!el.hasAttribute('data-split')) {
    animate(el, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, { duration: 1.3, delay });
    return;
  }
  const from = { clipPath: 'inset(-10% 100% -20% -2%)' }, to = { clipPath: 'inset(-10% -25% -20% -2%)' };
  if (!document.fonts.check(`1em ${getComputedStyle(el).fontFamily.split(',')[0]}`)) {
    animate(el, from, to, { duration: 1.1, delay }).then(() => { el.style.clipPath = ''; });
    return;
  }
  const text = el.textContent!;
  const done = el.dataset.split === 'chars'
    ? animate(split(el, true), { transform: 'translateY(110%)' }, { transform: 'none' }, { duration: 0.8, stagger: 0.016, delay })
    : animate(split(el, false), from, to, { duration: 1.1, stagger: 0.08, delay });
  done.then(() => { el.textContent = text; });
}

const inView = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top < innerHeight && r.bottom > 0;
};

/** Wire every reveal on the page. Intro reveals are handed to `intro`. When `late`, the CSS
 *  failsafe has already shown the content, so whatever is on screen stays put. Returns a cleanup. */
export function initReveals(intro: (fn: () => void) => void, late: boolean) {
  if (prefersReducedMotion()) return () => {};
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    reveal(e.target as HTMLElement);
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll<HTMLElement>('[data-split], [data-reveal]').forEach((el) => {
    if (late && inView(el)) el.style.visibility = 'visible';
    else if (el.hasAttribute('data-intro')) intro(() => reveal(el));
    else io.observe(el);
  });
  return () => io.disconnect();
}
