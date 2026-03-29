# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Stack

- **Next.js 16.2.1** with App Router — **breaking changes vs prior versions**, read `node_modules/next/dist/docs/` before writing code
- **React 19.2.4**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) — config-less, no `tailwind.config.js`
- **TypeScript**


## Next.js Version & Conventions

- **Next.js 16** — using the latest version
- `proxy.ts` (in root or `src/`) is the **active Next.js Proxy** (formerly middleware)
- `middleware.ts` is deprecated and renamed to `proxy.ts` starting from Next.js 16
- Function is named `proxy` (not `middleware`): `export function proxy(request: NextRequest)`
- "Middleware manifest is empty" error is **expected** — manifest is generated for the old name
- Do NOT rename `proxy.ts` back to `middleware.ts` — that is a regression
- Do NOT look for a `middleware-manifest.json` entry for `proxy.ts` — the architecture has changed
- `config.matcher` export remains the same — do not change it

## Architecture

**Styling:** Tailwind utility classes only, dark mode via `dark:` variants. No CSS modules or styled-components.

**Client vs Server:** Pages are Server Components by default. Add `"use client"` only when hooks (e.g. `usePathname`, `useState`) or browser APIs are needed.
