# STUDIO 2000 — Архитектонско Студио

Marketing / portfolio website for **STUDIO 2000**, an architecture studio based in Skopje, North Macedonia, founded in 2000. Single-language site in **Macedonian (Cyrillic)** — `<html lang="mk">`.

## What it is

Static-style marketing site showcasing the studio's work across project categories. No backend, no database, no auth — it's a presentational Next.js App Router site. All content (projects, images, descriptions, phone) is hardcoded; project data lives in one central file, [lib/projects.ts](lib/projects.ts).

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js **16** (App Router, RSC, Turbopack) |
| React | **19** |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS **v4** (`@tailwindcss/postcss`, CSS variables in `app/globals.css`) |
| UI kit | shadcn/ui (new-york style) on Radix UI primitives |
| Icons | lucide-react |
| Fonts | **Onest** (sans/body) + **Cormorant** (serif/headings), via `next/font/google`, `latin` + `cyrillic` subsets |
| Analytics | `@vercel/analytics` (production only) |
| Origin | Scaffolded with **v0.app** |

Package manager: **pnpm** (`pnpm-lock.yaml`).

See [DESIGN.md](DESIGN.md) for the full design system — colour tokens, type scale, fonts, layout, component patterns.

## Routes (`app/`)

| Path | Page | Meaning |
|------|------|---------|
| `/` | `page.tsx` | Home — header, hero, footer |
| `/administrativni` | Административни | Administrative buildings |
| `/komercijalni` | Комерцијални | Commercial |
| `/hoteli` | Хотели | Hotels |
| `/stanbeni` | Станбени | Residential |
| `/enterieri` | Ентериери | Interiors |
| `/project/[slug]` | Project detail | One page per project (hero → text → gallery) |
| `/about` | За Нас | About the studio |
| `/contact` | Контакт | Contact |

The five category routes all render the shared [components/category-page.tsx](components/category-page.tsx). Each pulls its title, hero image, and project list from [lib/projects.ts](lib/projects.ts) via `getCategory()` / `getProjectsByCategory()`. Categories with no projects yet (Хотели, Административни) render a "Наскоро" placeholder.

## Projects & detail pages

All project data is centralized in [lib/projects.ts](lib/projects.ts):

- `categories[]` — `{ slug, title, heroImage }` per category.
- `projects[]` — `{ slug, title, category, location, year, description, images[] }`. First entry in `images[]` is the hero; the rest form the gallery.
- Helpers: `getProjectsByCategory()`, `getProject()`, `getCategory()`.

`/project/[slug]` ([app/project/[slug]/page.tsx](app/project/%5Bslug%5D/page.tsx)) is a single dynamic route, statically generated for every project via `generateStaticParams()`. Layout: full-width hero image → title + location/year + description → 2-column gallery → footer. Category grid cards link here.

Project images live in `public/projects/<slug>/`. **Only `*_result.webp` (compressed) images are used.** Filenames with spaces are percent-encoded in the data file (`%20`).

## Sticky hero behaviour

On category pages the title + hero image sit in a `sticky top-20` block that sticks **from page load**. As the user scrolls, the whole block (title + image) fades out — opacity driven by a scroll listener: `Math.max(0, 1 - window.scrollY / 500)`. The scrollable content (project grid) slides up over it. This makes [components/category-page.tsx](components/category-page.tsx) a client component (`"use client"`). Hero heights: `h-[420px] sm:h-[520px] md:h-[640px]`.

## Structure

```
app/                # App Router pages + globals.css + layout.tsx (metadata, fonts)
  project/[slug]/   # Dynamic project detail page
components/         # Page sections: site-header, site-footer, hero, about, contact, category-page
components/ui/      # shadcn/ui primitives (Radix wrappers)
lib/projects.ts    # Central project + category data (single source of truth)
lib/utils.ts       # cn() class-merge helper
hooks/             # use-mobile, use-toast
public/            # Images + icons + logo.png
  projects/<slug>/ # Per-project _result.webp images
DESIGN.md          # Design system documentation
```

Path aliases (`tsconfig.json` / `components.json`): `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve production build
pnpm lint
```

> **Build note:** `pnpm build` may fail its dependency precheck over the ignored `sharp` build script (`ERR_PNPM_IGNORED_BUILDS`). Run `pnpm approve-builds` once, or build directly with `node node_modules/next/dist/bin/next build` to bypass the pnpm wrapper.

## Editing content

- **Projects** — add/edit entries in [lib/projects.ts](lib/projects.ts). Drop `_result.webp` images into `public/projects/<slug>/` and list them in `images[]` (percent-encode spaces). First image is the hero.
- **Categories** — `categories[]` in [lib/projects.ts](lib/projects.ts); each needs a matching `app/<slug>/page.tsx` and a nav link.
- **Nav links** — `navLinks` in [components/site-header.tsx](components/site-header.tsx).
- **Phone** — `tel:070220772` (display `070 220 772`) in header, hero, footer.
- **Logo** — `public/logo.png`, used in header and footer.
- **Fonts / design** — see [DESIGN.md](DESIGN.md). Fonts wired in [app/layout.tsx](app/layout.tsx) + `@theme` block of [app/globals.css](app/globals.css).
- **Site title / SEO** — `metadata` in [app/layout.tsx](app/layout.tsx).
