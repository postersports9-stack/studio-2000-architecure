# /projects Page — Design Spec

**Date:** 2026-06-05  
**Status:** Approved

## Overview

Replace the five individual category pages (`/administrativni`, `/komercijalni`, `/hoteli`, `/stanbeni`, `/enterieri`) with a single `/projects` page showing all projects, with multi-select category filters synced to the URL.

## Page Structure

Top to bottom:

1. `SiteHeader` (existing, fixed)
2. **Hero** — typographic only, no background image. Large serif "Проекти" right-aligned (matching `CategoryPage` title alignment). Below title: reactive project count in uppercase tracking style (`"24 проекти"`).
3. **Filter bar** — sticky horizontal pill row, pins to viewport top once hero scrolls out. `border-b border-foreground/10 bg-background`.
4. **Project grid** — 3-col (`lg`), 2-col (`md`), 1-col (mobile). Same card design as `CategoryPage`: grayscale→color hover, sequential numbering, serif title, location + year.
5. `SiteFooter` (existing)

## Filter Bar

- Pills: **"Сите"** + one per category (5 total)
- **Inactive state:** `border border-foreground/20 text-foreground/50`
- **Active state:** `bg-foreground text-background` (inverted)
- Behavior:
  - Clicking a category toggles it on/off
  - Multiple categories can be active simultaneously
  - Zero active = show all (equivalent to "Сите")
  - "Сите" clears all active filters; appears active only when nothing else is selected
- Mobile: `overflow-x-auto`, no wrap, hidden scrollbar

## Filtering Logic

- All projects fetched server-side via `getAllProjects()` (Sanity)
- Passed as props to a `'use client'` child component for filter interaction
- Client-side filtering — no re-fetch on filter change, instant response
- Project count in hero updates reactively to reflect current filtered result

## URL Sync

- No filter: `/projects`
- Single filter: `/projects?category=stanbeni`
- Multiple filters: `/projects?category=stanbeni,enterieri`
- Uses `useSearchParams` + `useRouter`
- `router.replace()` (not `push`) — back button skips individual filter states

## Navigation

- Remove all 5 category links from `SiteHeader` `navLinks`
- Add single `{ label: "Проекти", href: "/projects" }` entry before "За Нас"

## Files Affected

| File | Change |
|------|--------|
| `app/projects/page.tsx` | New server component — fetches all projects, renders hero + passes to client |
| `components/projects-client.tsx` | New `'use client'` component — filter state, URL sync, grid render |
| `components/site-header.tsx` | Replace 5 category links with single "Проекти" link |
| `app/administrativni/page.tsx` | Delete |
| `app/komercijalni/page.tsx` | Delete |
| `app/hoteli/page.tsx` | Delete |
| `app/stanbeni/page.tsx` | Delete |
| `app/enterieri/page.tsx` | Delete |
| `lib/projects.ts` | Add `getAllProjects()` async function |

## Out of Scope

- Animations/transitions between filter states (can add later)
- Per-category hero images (removed with category pages)
- Mobile hamburger menu update (separate concern)
