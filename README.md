# STUDIO 2000 — Архитектонско Студио

Marketing / portfolio website for **STUDIO 2000**, an architecture studio based in Skopje, North Macedonia. Single-language site in **Macedonian (Cyrillic)** — `<html lang="mk">`.

## What it is

Static-style marketing site showcasing the studio's work across four project categories. No backend, no database, no auth — it's a presentational Next.js App Router site. Content (project lists, images, phone number) is hardcoded in the page/component files.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js **16** (App Router, RSC) |
| React | **19** |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS **v4** (`@tailwindcss/postcss`, CSS variables in `app/globals.css`) |
| UI kit | shadcn/ui (new-york style) on Radix UI primitives |
| Icons | lucide-react |
| Fonts | Inter (sans) + Playfair Display (serif), via `next/font/google` |
| Analytics | `@vercel/analytics` (production only) |
| Origin | Scaffolded with **v0.app** |

Package manager: **pnpm** (`pnpm-lock.yaml`). A `package-lock.json` is also present (untracked).

## Routes (`app/`)

| Path | Page | Meaning |
|------|------|---------|
| `/` | `page.tsx` | Home — header, hero, footer |
| `/administrativni` | Административни | Administrative buildings |
| `/komercijalni` | Комерцијални | Commercial |
| `/hoteli` | Хотели | Hotels |
| `/stanbeni` | Станбени | Residential |
| `/about` | За Нас | About the studio |
| `/contact` | Контакт | Contact |

The four category routes all render the shared `components/category-page.tsx`, passing in `title`, `heroImage`, and a hardcoded `projects[]` array (`{ name, location, year, image }`). Images live in `public/` (`project-*.jpg`, `category-*.jpg`, `hero-architecture.jpg`).

## Structure

```
app/                # App Router pages + globals.css + layout.tsx (metadata, fonts)
components/         # Page sections: site-header, site-footer, hero, about, contact, category-page
components/ui/      # 57 shadcn/ui primitives (Radix wrappers)
lib/utils.ts        # cn() class-merge helper
hooks/             # use-mobile, use-toast
public/            # Images + icons
styles/            # extra styles
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

## Editing content

- **Project listings** — edit the `projects` array in each `app/<category>/page.tsx`.
- **Nav links / phone** — `components/site-header.tsx` (`navLinks`, `tel:+38923000000`).
- **Site title / SEO** — `metadata` in `app/layout.tsx`.
- **Images** — drop into `public/` and reference by `/filename.jpg`.
