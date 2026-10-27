import { ease } from './env';

type Frame = Record<string, string>;
type Targets = Element | Iterable<Element> | null;

/** Web Animations from → to (seconds). The end state is written inline first, so it holds after
 *  the animation ends; `fill: backwards` holds the start state through the delay. */
export function animate(targets: Targets, from: Frame, to: Frame, { duration, ease: easing = ease.out, delay = 0, stagger = 0 }: { duration: number; ease?: string; delay?: number; stagger?: number }) {
  const els = !targets ? [] : targets instanceof Element ? [targets] : [...targets];
  return Promise.all(els.map((el, i) => {
    Object.assign((el as HTMLElement).style, to);
    return el.animate([from, to], { duration: duration * 1000, easing, delay: (delay + i * stagger) * 1000, fill: 'backwards' }).finished.catch(() => {});
  }));
}
