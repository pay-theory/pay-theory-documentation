# Repository Guidelines

## Project Structure & Module Organization
This repo is a Docusaurus 3 documentation site. Primary content lives in `docs/` (core guides, API, SDKs). Versioned content is in `versioned_docs/` with matching `versioned_sidebars/`. UI and MDX components live in `src/` and `components/`, with styling in `src/css/`. Static assets are in `static/`; blog posts in `blog/`; `build/` is the generated output. Key config files: `docusaurus.config.js`, `sidebars.js`, `babel.config.js`.

## Build, Test, and Development Commands
- `npm install` - Install dependencies (Node >=16.14).
- `npm start` - Run the local dev server with hot reload.
- `npm run build` - Produce the static site in `build/`.
- `npm run serve` - Preview the production build locally.
- `npm run lint` / `npm run lint:fix` - ESLint checks/fixes for `src/`.
- `npm run check-ts` - Type-check with `tsc --noEmit`.
- `npm run prettier` / `npm run prettier:fix` - Format `src/` files.
- `npm run clear` - Clear Docusaurus cache when builds act flaky.

## Coding Style & Naming Conventions
ESLint + Prettier are required; Husky/lint-staged run formatting and linting on staged files. Use 2-space indentation (Prettier defaults). Docs use MDX for guides and `.md` for API reference. Keep file and directory names lowercase with underscores (e.g., `getting_started/quickstart.mdx`), and include a `_category_.json` in each docs folder. Use H1 only for the page title, and specify languages on code fences (e.g., ` ```graphql `).

## Testing Guidelines
There is no automated test suite configured. Validate changes by running `npm run lint`, `npm run check-ts`, and `npm run build`. For docs-heavy edits, also check rendering via `npm start`.

## Commit & Pull Request Guidelines
Recent history follows conventional commits with emoji prefixes, e.g., `✨ feat(docs): add ...` or `🐛 fix(docs): ...`. Reviewpad enforces conventional commit titles, requires a linked issue and non-empty PR description, expects a clean linear history (rebase), and flags missing approvals. Include a concise summary and testing notes; add screenshots for visual doc/UI changes.
