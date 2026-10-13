/** 360000 → "6:00.000", 800 → "0:00.800" */
export function clock(ms: number) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const r = Math.floor(ms % 1000);
  return `${m}:${String(s).padStart(2, '0')}.${String(r).padStart(3, '0')}`;
}
/** Log interpolation between two durations: compression feels even on screen. */
export const logLerp = (a: number, b: number, p: number) => a * Math.pow(b / a, p);
export const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
