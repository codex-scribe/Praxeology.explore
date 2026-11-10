# Praxeology.explore

Interactive explorations of economic theory, following the chapter structure of Murray N.
Rothbard's _Man, Economy, and State_ with _Power and Market_. Each chapter pairs the deductive
argument with visual tools you can manipulate (value scales, supply and demand schedules,
discounted marginal value products, the structure of production) and with real-world examples.

Live site: https://codex-scribe.github.io/Praxeology.explore/

## Commands

| Task                  | Command                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| Dev server            | `npm start` (http://localhost:5180/Praxeology.explore/)                                               |
| Build                 | `npm run build` → `dist/`                                                                             |
| Preview built bundle  | `npm run preview` (http://localhost:5181/Praxeology.explore/)                                         |
| Deploy                | push to `master`; GitHub Actions runs `npm run deploy` and publishes `dist/` to Pages                 |
| Lint / format / types | `npm run lint`, `npm run prettier`, `npm run typecheck` (`:fix` variants exist for lint and prettier) |

There is no database and no backend, so there are no migrate commands. No environment variables
are required.

A pre-commit hook (husky + lint-staged) runs oxlint and Prettier on staged files.

## Stack

Vite, React, TypeScript, React Router (hash routing, so deep links work on GitHub Pages).
Charts are hand-built SVG components.
