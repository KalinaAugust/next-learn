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

## Architecture

App Router structure under `app/`:

- `layout.tsx` — root layout, wraps all pages with `<Header>` and global fonts (Geist)
- `page.tsx` — home page (Server Component)
- `todos/page.tsx` — todos page (Server Component), static data
- `components/Header.tsx` — Client Component (`"use client"`), navigation with active-link highlighting via `usePathname`
- `LogTimeButton.tsx` — Client Component (`"use client"`), used inline in `page.tsx`

**Styling:** Tailwind utility classes only, dark mode via `dark:` variants. No CSS modules or styled-components.

**Client vs Server:** Pages are Server Components by default. Add `"use client"` only when hooks (e.g. `usePathname`, `useState`) or browser APIs are needed.