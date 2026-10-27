// Page transitions. The adapter runs leave() while the next page loads, so a transition adds
// little or no latency. The look is authored in src/motion/setup.ts with setTransition().
import { animate } from './animate';
import { prefersReducedMotion } from './env';

export type Transition = {
  leave: (curtain: HTMLElement) => Promise<unknown>;
  enter: (curtain: HTMLElement) => Promise<unknown>;
};

const show = (c: HTMLElement, on: boolean) => { c.style.visibility = on ? 'visible' : 'hidden'; };

let current: Transition = {
  leave: async (c) => show(c, true),
  enter: async (c) => show(c, false),
};

const reduced: Transition = {
  leave: (c) => { show(c, true); return animate(c, { opacity: '0' }, { opacity: '1' }, { duration: 0.2 }); },
  enter: async (c) => { await animate(c, { opacity: '1' }, { opacity: '0' }, { duration: 0.2 }); show(c, false); c.style.opacity = '1'; },
};

export const setTransition = (t: Transition) => { current = t; };
const pick = () => (prefersReducedMotion() ? reduced : current);
const curtain = () => document.getElementById('curtain') as HTMLElement;

export const playLeave = () => pick().leave(curtain());
export const playEnter = () => pick().enter(curtain());
