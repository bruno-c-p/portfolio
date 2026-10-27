export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;

// Shared easing vocabulary (CSS timing functions for the Web Animations API). Use these names
// everywhere; never invent per-component curves.
export const ease = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)', // default entrance: a span being drawn
  inOut: 'cubic-bezier(0.87, 0, 0.13, 1)', // curtains, page transitions
  soft: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // small UI
} as const;

/** expo in-out, for values driven per frame in JS. */
export const expoInOut = (t: number) =>
  t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (10 - 20 * t)) / 2;
