# brunocardozo.com.br

BRUNO CARDOZO's portfolio, rebuilt as a performance trace: every job is a span on a time
axis, and the hero compresses a real six-minute request (Wise) to 800 ms as you scroll.
Design decisions live in `DESIGN.md`.

## Stack

Astro 7 (static HTML, about 11 KB of gzipped JS per page). Motion runs on the Web Animations
API, IntersectionObserver and native scroll, with no animation library. No WebGL and no loader: a
site about speed should not make anyone wait.

## Run

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview
```

## Content

All English and Portuguese copy lives in `src/data/site.ts`: jobs, case
studies, figures, projects, about, footer. Pages: `/`, `/pt/`, `/work/<slug>/`,
`/pt/work/<slug>/`, `/404`.

## Deploy

Static output; any static host works. Production URL is set in `astro.config.mjs` (`site`) and
`src/data/site.ts` (`site.url`).

```bash
npx vercel --prod                          # Vercel
npx netlify deploy --prod --dir dist       # Netlify
npx wrangler pages deploy dist             # Cloudflare Pages
```

## To confirm before publishing

- The second About paragraph ("I like the part of the work nobody sees until it breaks...")
  is new copy written in Bruno's voice. Rewrite it if it doesn't sound like you.
- Case-study wording is condensed from the CV and the old site. Check every sentence.
- The one-by-one vs bulk figure (Frengee) and the record grid (Projedata) are labeled
  illustrations. The Wise and Frengee timing figures are to scale.
- `public/bruno-cardozo.pdf` is the CV copied from the current site.
