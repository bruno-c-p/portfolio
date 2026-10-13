// Declarative motion through data attributes. Authoring happens in markup:
//   data-split="lines|words|chars"   text reveal (SplitText), on scroll or on intro
//   data-reveal="span|up|fade"       block reveal ("span" draws open left to right)
//   data-intro                       play with the page intro instead of on scroll
//   data-delay="0.2"                 extra delay (seconds)
//   data-parallax="0.15"             scrubbed vertical drift (fraction of element height)
// Motion verb: lines are recorded like spans, so they clip open from the left.
// Every effect is skipped under reduced motion; CSS keeps content visible without JS.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ease, prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger, SplitText);

const durations = { lines: 1.1, words: 0.9, chars: 0.8 } as const;
const staggers = { lines: 0.08, words: 0.03, chars: 0.016 } as const;

// autoSplit re-splits after font load / resize. A text that already revealed must stay revealed,
// so the state lives outside onSplit.
function splitTween(el: HTMLElement, isIntro: boolean) {
  const type = (el.dataset.split || 'lines') as keyof typeof durations;
  const delay = parseFloat(el.dataset.delay || '0');
  const s = { tween: undefined as gsap.core.Tween | undefined, done: false, requested: false };
  SplitText.create(el, {
    type: type === 'lines' ? 'lines' : `lines,${type}`,
    mask: type === 'lines' ? undefined : 'lines',
    autoSplit: true,
    linesClass: 'split-line',
    onSplit(self) {
      gsap.set(el, { visibility: 'visible' });
      if (s.done) return;
      const lines = type === 'lines';
      const targets = lines ? self.lines : type === 'words' ? self.words : self.chars;
      s.tween = gsap.fromTo(
        targets,
        lines ? { clipPath: 'inset(-10% 100% -20% -2%)' } : { yPercent: 110 },
        {
          ...(lines ? { clipPath: 'inset(-10% -25% -20% -2%)', clearProps: 'clipPath' } : { yPercent: 0 }),
          duration: durations[type],
          stagger: staggers[type],
          ease: ease.out,
          delay,
          paused: isIntro && !s.requested,
          onComplete: () => { s.done = true; },
          scrollTrigger: isIntro ? undefined : { trigger: el, start: 'top 88%', once: true },
        },
      );
      return s.tween;
    },
  });
  return () => { s.requested = true; s.tween?.play(); };
}

function blockTween(el: HTMLElement, paused: boolean) {
  const kind = el.dataset.reveal || 'span';
  const delay = parseFloat(el.dataset.delay || '0');
  const from: gsap.TweenVars =
    kind === 'fade' ? { autoAlpha: 0 }
    : kind === 'span' ? { clipPath: 'inset(0% 100% 0% 0%)', autoAlpha: 1 }
    : { y: 40, autoAlpha: 0 };
  const to: gsap.TweenVars = kind === 'span' ? { clipPath: 'inset(0% 0% 0% 0%)' } : {};
  gsap.set(el, { visibility: 'visible' });
  return gsap.fromTo(el, from, {
    ...to,
    y: 0,
    autoAlpha: 1,
    duration: kind === 'fade' ? 1 : 1.3,
    ease: ease.out,
    delay,
    paused,
    scrollTrigger: paused ? undefined : { trigger: el, start: 'top 90%', once: true },
  });
}

/** Wire every reveal inside `root`. Returns the intro timeline (paused) for the page entrance. */
export function initReveals(root: ParentNode = document) {
  const intro = gsap.timeline({ paused: true });
  if (prefersReducedMotion()) return intro;

  root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const play = splitTween(el, isIntro);
    if (isIntro) intro.add(play, 0);
  });
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const t = blockTween(el, isIntro);
    if (isIntro) intro.add(() => { t.play(); }, 0);
  });
  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(el, { yPercent: -amount * 100 }, {
      yPercent: amount * 100,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
  return intro;
}
