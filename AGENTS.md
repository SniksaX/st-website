# Repository Guidelines

## Project Structure & Module Organization
`app/` is the App Router entry point (Hero, Campaign, stream calendar). Shared UI pieces live in `components/`, domain helpers in `lib/`, structured content in `data/`, static media in `public/`, and automation tooling in `scripts/`. Anything still inside `src/` is treated as legacy; migrate it into `app/` before expanding a route.

## Build, Test, and Development Commands
- `npm run dev`: hot-reload dev server at `http://localhost:3000`.
- `npm run build`: production build plus lint/type checks; writes to `.next/`.
- `npm run start`: serves the compiled build for staging parity.
Run `npx eslint .` for lint-only passes via `eslint.config.mjs`, and surface new automation through npm scripts once the helpers in `scripts/` stabilize.

## Coding Style & Naming Conventions
Write TypeScript function components and add `'use client'` whenever they touch browser APIs. Keep the two-space indentation, single quotes, and early-return style already used in `app/page.tsx`. Compose UI with Tailwind plus `clsx`/`tailwind-merge`; skip manual class concatenation. Use PascalCase for components, camelCase for hooks or helpers, kebab-case for route folders, and prefer the `@/` alias over deep relative paths.

## Testing Guidelines
There is no automated suite yet, so pair lint/type checks with the smoke guard inside `app/page.tsx` (it logs `Smoke test failed` when required sections disappear). Seed new data files under `data/`, then validate navigation and accessibility manually in the browser. For non-trivial logic, create a Playwright spec under `tests/` and add it to CI when ready.

## Commit & Pull Request Guidelines
History favors bracketed verbs (`[ADD]`, `[FIX]`, `[CHORE]`) plus a short description, so stick to that pattern and mention issue IDs in the body when relevant. Every PR should describe scope, attach UI captures for visual tweaks, list new scripts or migrations, and flag environment keys that demand `.env.local` updates. Run `npm run build` before requesting review.

## Security & Configuration Notes
Secrets belong only in `.env.local`, which is git-ignored; never commit API keys or HelloAsso tokens. Keep dependencies minimal by extending helpers in `lib/` before pulling a new package. Wrap third-party embeds in isolated components and sanitize props to prevent data leaks or layout shifts.
