export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;
export const isMobile = () => matchMedia('(max-width: 767px)').matches;

// Shared easing vocabulary. Use these names everywhere; never invent per-component curves.
export const ease = {
  out: 'expo.out', // default entrance: a span being drawn
  inOut: 'expo.inOut', // curtains, page transitions
  soft: 'power3.out', // small UI
  spring: 'back.out(1.6)', // unused on purpose: nothing bounces in a trace
} as const;
