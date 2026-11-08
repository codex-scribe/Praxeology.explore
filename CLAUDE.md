# Praxeology.explore (repo: prax.exp)

A static website of interactive explorations of _Man, Economy, and State_ (with _Power and
Market_) by Murray N. Rothbard. Personal project of GitHub user `codex-scribe`; hosted on GitHub
Pages at https://codex-scribe.github.io/prax.exp/.

## Commands

| Task          | Command                                                               |
| ------------- | --------------------------------------------------------------------- |
| Dev server    | `npm start` — port 5180, `strictPort`, at `/prax.exp/`                |
| Build         | `npm run build` → `dist/`                                             |
| Preview build | `npm run preview` — port 5181                                         |
| Deploy        | push to `master`; `.github/workflows/pages.yml` runs `npm run deploy` |
| Checks        | `npm run lint`, `npm run prettier`, `npm run typecheck`               |
| Tests         | `npm test` (vitest); model tests live beside the models               |

No backend, no database, no env vars. If persistence is ever needed, use `localStorage`.

## Structure

- `/` — the main experience: `src/prologue/`. A white page where "Man acts." fades in, then each
  click advances through the propositions in `src/prologue/scenes.ts` (currently placeholders).
- `/outline/...` — the working outline: `src/outline/`. Section-by-section drafts of the book
  with interactive figures; material is reworked into the main experience as it's built.
  - `src/outline/sections/<chapter>/` — prose per section, registered in
    `src/outline/sections/registry.ts`.
- `src/content/book.ts` — table of contents (parts → chapters → sections, with Scholar's Edition
  page ranges), shared by both.
- `src/models/` — pure economic models, tested. `src/components/figures/` — interactive figures.
- `reference/` (gitignored, never published) holds the Mises Institute's free PDF of the Scholar's
  Edition. Check section titles, page numbers, and Rothbard's figures against it. Cite pages as
  printed in the book, not PDF page numbers (for _MES_, PDF page = book page + 65).
- Routing uses `HashRouter` because GitHub Pages has no SPA fallback. `vite.config.ts` sets
  `base: '/prax.exp/'`; both change if the site moves to its own domain.

## Typography

The look takes its cue from the book, which is set in Janson Text: light, elegant, airy; a white
field, small capitals for labels, italics for the secondary voice. Janson isn't freely licensed
for the web, so the site uses EB Garamond (self-hosted via `@fontsource/eb-garamond`), set in the
`--serif` variable in `src/index.css`.

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
