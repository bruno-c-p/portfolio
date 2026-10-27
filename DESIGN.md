# brunocardozo.com.br, rebuild

## Brief

- **Subject:** Bruno Cardozo, full-stack engineer (backend-leaning), Santa Catarina, Brazil.
  Five years: Projedata (2021 to 2022, ERP migration), Wise (2022 to 2025, APIs), Frengee
  (2025 to now, global ecommerce + LLM category matching). One side project (the Wild West
  Vibes VS Code theme).
- **Audience:** engineering managers, founders and recruiters hiring a remote senior-leaning
  engineer; peers who arrive from GitHub.
- **Job:** get hired or get a contract. Make "he makes slow systems fast" obvious in 3 seconds,
  then prove it with numbers that are real.
- **Assets:** one real portrait (Frengee talk), the CV PDF, real copy in EN and PT from the
  current site and CV. No project imagery: the work is backend.
- **Language:** EN (default, `/`) and PT-BR (`/pt/`). The current site is bilingual; the
  rebuild keeps it.
- **Constraints:** everything must be true. No invented routes, clients or numbers.

## Concepts

| | Idea | Anchor | Signature | O / F / Fe / P |
|---|---|---|---|---|
| A. Material: the trace | The site is a performance trace of his career: every section is a span on a time axis, and the hero compresses a six-minute request to 800 ms as you scroll | His actual results are latency cuts (6 min to 800 ms at Wise, 15 min to under 1 min at Frengee). His own line: "If it's slow, I make it fast" | A full-width sunset-colored span holding the headline compresses to a 3 px sliver; letters flip color as its edge passes | 5 / 5 / 4 / 2 |
| B. Place: Serra do Rio do Rastro | The career as the switchback road near UNIBAVE, scrolling climbs the serra | He studied and worked in the south of Santa Catarina | A road line draws up the page in hairpins | 4 / 2 / 3 / 2 |
| C. Process: one-by-one vs bulk | Content arrives one item at a time until you scroll, then lands as one batch | The Shopify bulk-sync rebuild | Rows queue up then commit at once | 3 / 4 / 4 / 3 |

**Pick A.** It is built from his own numbers, so it can't move to another engineer without
lying, and it produces a whole system (axis, spans, durations, live edges). Steal from C for
the Frengee case: the one-by-one vs bulk figure is the explainer.

## Concept card

```
Idea:        Bruno makes slow systems fast, so his site is a performance trace: every section is a
             span on a time axis, and the hero squeezes a six-minute request down to 800 ms.
Metaphor:    a distributed trace / profiler waterfall, lit in the evening palette of his own
             VS Code theme (Wild West Vibes).
Signature:   hero compression. A full-width peach span (6 min) holds the headline; scroll scrubs
             it to 800 ms on the same axis while the readout counts down and each letter flips
             from dusk-on-sun to moonlight-on-dusk as the span's edge passes it.
             Recipe: sticky stage (patterns #2) + one driver module (patterns #1), DOM only.
Emotion:     the calm confidence of a fast system: warm, exact, unhurried.
Motion verb: "draw and snap on the time axis": things enter by drawing left to right like a span
             being recorded, and leave by collapsing to their end.
Screenshot:  mid-scroll hero. Half the headline still inside the peach span, half released onto
             dusk, the readout at 0:41.208, a hairline ghost of the old six minutes behind it.
```

Theatre scaled to the brief: **no loader** (a site about speed does not make you wait; the hero
text is the LCP and paints at once). No WebGL: the concept is typographic and data-driven, and a
light page is part of the argument. The footer reports the page's real load time.

## System

### Palette (from Wild West Vibes, his theme)

| Role | Hex | Use | Contrast on ground |
|---|---|---|---|
| ground (dusk) | `#1d1a23` | page | |
| ink (moonlight) | `#e1dfe5` | text | 12.98 |
| muted | `#aea8bb` | secondary text | 7.2 |
| line | `#3c3746` | hairlines, axis ticks | (decorative) |
| sun (accent) | `#fed9b7` | fast / now: spans, CTA fill, curtain, focus | 12.92; dusk on sun 12.92 |
| rock (slow) | `#a25a63` bars / `#c4727c` text | the "before" spans | 3.41 bars / 4.94 text |

### Type

- **Archivo** variable (wdth 62 to 125, wght 100 to 900), one file. Display: wdth 112 to 125,
  wght 700 to 800, tracking -0.035 to -0.05em, leading 0.88. Text: wdth 100, wght 400, 17 px,
  leading 1.55. Width is a live axis: hovered row names stretch to 125.
- **JetBrains Mono** 400 to 600, only for **measured values**: durations, timestamps, dates,
  axis ticks. Never for labels or nav (they are Archivo 500 at 13 to 14 px).

### Grid and rhythm

12 columns, fluid gutter. Three hanging lines: col 1 (titles), col 5 (text), col 9 (meta).
Section moods: hero (sticky 200svh), work (airy), projects (normal), about (airy), footer
(full viewport).

### Shape and motion

- Radius 0 everywhere (spans are hard-edged). Hairlines 1 px `line`.
- Eases: engine `ease.out` (expo.out) for draws, `ease.inOut` for the curtain, `soft` for hovers.
- Text lines reveal by clipping open left to right (a span being recorded), 1.1 s, 80 ms stagger.
- Curtain: a sun span grows from the clicked bar (or the left edge) to cover, labeled with the
  real request (`GET /work/wise`), then collapses to the right with the measured duration.

### Interaction (one treatment per role)

| Role | Treatment |
|---|---|
| Nav links | underline draws left to right; current page keeps it |
| Work rows (trace) | a sun field draws across the row, the bar inverts to dusk at its true span (scale is never broken), the name stretches (wdth 125) |
| Project rows | a sun field draws in behind the row from the left, ink flips to dusk |
| CTA (email) | sun fill draws left to right, label flips; leaves to the right |
| Inline links | underline at rest, thickens to a band |
| Utility (social, legal, lang) | color only |
| Hero pointer | a crosshair reads the time under the pointer on the six-minute axis |

### Idle (the concept breathes at rest)

A real-time playhead crawls along the hero's six-minute axis at true speed (about 4 px per
second at 1440 wide), which is the point: six minutes is slow. After compression, the 800 ms
sliver redraws every 800 ms. The Frengee span is still open: its live end has a slow sheen.
The playhead runs on one frame loop that stops off screen; the sheen is a CSS animation. Both are absent under reduced motion.

**Decision: case pages hold still at rest.** They are reading pages (problem, work, outcome,
numbers). Their life comes from the figures, which record themselves as they scroll in (the
fast span compressing out of the slow one, the staircase, the record rows), from the hovers,
and from the footer clock. Adding drift to a reading page would be decoration.

### Composition plan

```
HOME (desktop)
┌ Bruno Cardozo / Full-stack engineer ............. Work Projects About Contact  EN PT ┐
│ 0 ── 1 min ── 2 min ── 3 min ── 4 min ── 5 min ── 6 min           (axis, mono)    │
│ ██████████████████████████ SUN SPAN ███████████████████████████████████████████ │  poster
│ █ I build the layer                                                               █ │
│ █ under the product.                                    Wise, endpoint, 6 min+    █ │
│ 6:00.000 (readout)        caption              lede (col 9)                        │
├───────────────────────────────────────────────────────────────────────────────────┤
│ Work         2021 ── 2022 ── 2023 ── 2024 ── 2025 ── now                           │  waterfall
│ Projedata    ████                                       ERP, 0 records lost         │
│ Wise              ███████████████                       6 min to 800 ms             │
│ Frengee                               ██████████▒  (open)  15 min to under 1        │
├───────────────────────────────────────────────────────────────────────────────────┤
│ Off the clock (projects)  big names col 1–7 · kind/year mono col 8 · desc col 9–12  │  index list
├───────────────────────────────────────────────────────────────────────────────────┤
│ [portrait duotone col 1–5]      bio col 7–12, day to day, languages, school        │  asymmetric pair
├───────────────────────────────────────────────────────────────────────────────────┤
│ If a system is buckling, write to me.  (mega)                                      │  footer finale
│ [ dev@brunocardozo.com.br ]  LinkedIn GitHub CV        SC 19:42 · loaded in 312 ms  │
└───────────────────────────────────────────────────────────────────────────────────┘

CASE /work/<slug>
│ axis of the job's dates, span drawn                                               │
│ WISE (mega)     role · place · dates (meta col 9)                                 │  poster
│ summary (t-l, cols 1–9)                                                           │  statement
│ FIGURE: before (rock) vs after (sun) on one axis, scrubbed                        │  full-bleed figure
│ The problem / What I did / What changed: label col 1–3, text col 5–10             │  sticky narrative
│ numbers row (real only)                                                           │  data
│ stack                                                                             │
│ Next span: <next job>  (big link with bar)                                        │
```

Phone (390): hero stage 160svh, span full width, headline 2 to 4 lines at 13vw; waterfall rows
stack name above the bar; projects single column; menu becomes a full-screen overlay.

### Explainer figure

Frengee's bulk sync is a system worth explaining. It is drawn in the concept's own language (a
staircase of one-by-one spans vs one bulk span on a shared axis) rather than as an isometric
object, because a 3D figure would break the flat trace system. Decision: no anatomy figure.

### Genericness test

- "Dark dev portfolio with mono and an accent" is the generic landing. Changed: the palette is
  his own theme's dusk and sunset (not acid green), mono is restricted to measured values, and
  the hero is a real latency story rather than a terminal or code block.
- "Timeline of jobs" is generic. Changed: it is a trace waterfall on a true-scale axis whose
  rows open into the case page through the curtain.
- The current site is cream + Fraunces serif (an AI-default palette). Dropped entirely.
