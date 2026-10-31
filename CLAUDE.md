# Praxeology.explore (repo: prax.exp)

A static website of interactive explorations of _Man, Economy, and State_ (with _Power and
Market_) by Murray N. Rothbard. Personal project of GitHub user `codex-scribe`; hosted on GitHub
Pages at https://codex-scribe.github.io/prax.exp/.

## Commands

| Task          | Command                                                             |
| ------------- | ------------------------------------------------------------------- |
| Dev server    | `npm start` — port 5180, `strictPort`, at `/prax.exp/`              |
| Build         | `npm run build` → `dist/`                                           |
| Preview build | `npm run preview` — port 5181                                       |
| Deploy        | push to `main`; `.github/workflows/pages.yml` runs `npm run deploy` |
| Checks        | `npm run lint`, `npm run prettier`, `npm run typecheck`             |

No backend, no database, no env vars. If persistence is ever needed, use `localStorage`.

## Structure

- `src/content/book.ts` — table of contents (parts → chapters). The site's navigation mirrors
  Rothbard's chapter and section divisions; add sections here as they get built.
- `src/pages/` — route components. `src/components/` — shared UI.
- Routing uses `HashRouter` because GitHub Pages has no SPA fallback. `vite.config.ts` sets
  `base: '/prax.exp/'`; both change if the site moves to its own domain.

## Conventions

- Visualizations are React components rendering SVG directly; no charting library unless one
  clearly earns its place.
- Economic models in explorations should be pure functions (inputs → schedules/prices) kept
  separate from the components that draw them, so they can be tested and reused across chapters.
- Follow Rothbard's own terms (value scales, DMVP, originary interest, etc.) and his
  ordinal-utility framing: individual value rankings are ordinal; only prices are cardinal.
- Explain in our own words and cite chapter/section. Short quotations are fine; do not
  reproduce long passages of the book.
- Lint is oxlint (the Vite template default; typescript-eslint's TypeScript 7 support was
  uncertain at setup). Prettier formats everything.
