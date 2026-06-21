# Implementation Plan — Site Updates (2026-06-20)

Scope: 7 changes. Decisions locked: "architecture" = project image cards (remove `rounded-xl` from cards + `rounded-md` from CTA buttons); featured projects = Sanity singleton settings doc with 4 ordered references.

---

## 1. /projects — remove "Проекти" header + darken filter text

File: `components/projects-client.tsx`

- Delete the hero `<section>` (lines ~49–61) that holds the `<h1>Проекти</h1>` and the `{count} проекти` span.
- Preserve the count: move `{filteredProjects.length} проекти` into the sticky filter bar (right side, before/with the "Избриши" button) so info isn't lost. Optional — drop it if not wanted.
- Compensate spacing now that header is gone: add `mt-28 md:mt-32` to the sticky filter-bar wrapper (`<div className="sticky top-24 ...">`). Margin (not padding) keeps the stuck bar height unchanged; bar still sticks at `top-24` under the fixed `h-24` header.
- Darken filter labels: inactive label color `text-foreground/40` → `text-foreground/70` (line ~79). Active stays `text-foreground`. Optionally bump count/"Избриши" `/40` → `/60` to match.

## 2. Contact — "Студио" → "Адреса"

File: `components/contact.tsx` line 61. Change `label="Студио"` → `label="Адреса"`. Value (`ул. Питу Гули 40` / `1000 Скопје`) unchanged.

## 3. Move nav menu to the right

File: `components/site-header.tsx`

- Change inner container (line ~45) from `grid h-24 ... grid-cols-3 items-center` → `flex h-24 ... items-center justify-between`.
- Wrap `<nav>` + the mobile hamburger `<button>` in one right-side group: `<div className="flex items-center gap-6">`. Logo stays first child (left).
- `<nav>` (line ~59): `justify-center` → `justify-end` (or drop — flex group already right-aligns).
- Removing the empty 3rd grid column also removes a wide-screen offset, supporting task 5.

## 4. Hero arrows — remove background

File: `components/hero.tsx` lines 79, 88 (prev + next buttons).

- Remove `rounded-full bg-black/30 backdrop-blur-sm` and `hover:bg-black/50`.
- Keep hit area (`flex h-10 w-10 ... items-center justify-center`). For legibility over images: `text-white/80 hover:text-white drop-shadow-lg`.

## 5. Align logo and "Види проекти" on wide monitors

Root cause: logo sits in header's centered `max-w-[1920px]` container with `px-6 md:px-12`; hero CTA is absolutely positioned at `left-6 md:left-10` relative to the full-width section. On viewports >1600px these left edges diverge.

File: `components/hero.tsx` CTA (lines ~108–114).

- Wrap CTA in a container matching the header exactly:
  `<div className="absolute inset-x-0 bottom-8 z-10 mx-auto max-w-[1920px] px-6 md:px-12">` and make the `<Link>` `relative inline-flex` with no `left-*` offset.
- Note `md:left-10` (40px) ≠ header `md:px-12` (48px) — switching to `px-6 md:px-12` is what makes them share a vertical line.

## 6. Remove rounded corners — CTA buttons + project image cards

Delete the `rounded-*` class from each:

CTA buttons (`rounded-md`):
- `components/about-snippet.tsx:30`
- `components/hero.tsx:110` (also gets the wrapper change from task 5)
- `components/contact.tsx:113`

Project image cards (`rounded-xl`):
- `components/featured-projects.tsx:36`
- `components/projects-client.tsx:119`
- `components/category-page.tsx:65`

(Leave shadcn `components/ui/*` and hero dots/arrows untouched.)

## 7. Editable backend via Sanity singleton — featured projects (4) + hero images

Design: one singleton `siteSettings` doc holding BOTH the 4 featured-project references AND the hero slideshow images. One place to edit, no duplicate docs.

**a. New schema** `sanity/schemas/siteSettings.ts`
- `defineType` name `siteSettings`, type `document`, title `Поставки`.
- Field `featuredProjects`: `type: 'array'`, `of: [{ type: 'reference', to: [{ type: 'project' }] }]`, title `Истакнати проекти`, `validation: (Rule) => Rule.max(4).min(4)`.
- Field `heroImages` (task 8): `type: 'array'`, title `Слики на почетна (hero)`, `of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Алт текст' }] }]`, `validation: (Rule) => Rule.min(1)`.

**b. Register + singleton** `sanity.config.ts`
- Add `siteSettings` to `schema.types`.
- Make it a singleton via `structureTool({ structure })`: custom structure listing one "Поставки" item bound to `.documentId('siteSettings')`, plus the normal `project` document list. Prevents duplicate settings docs.

**c. Types** `lib/sanity.ts`
- Add `SanitySettings = { featuredProjects?: { _ref: string }[]; heroImages?: (SanityImageSource & { alt?: string })[] }`.

**d. Query** `lib/projects.ts`
- Add `getFeaturedProjects(): Promise<Project[]>`:
  `*[_type == "siteSettings"][0]{ featuredProjects[]->{ ...project fields... } }`
  Map results through `toProject`, filter nulls.
  Fallback: if empty/unset, return `(await getAllProjects()).slice(0, 4)`.

**e. Wire homepage** `app/page.tsx`
- Replace `getAllProjects()` with `getFeaturedProjects()`; pass to `<FeaturedProjects />`.

**f. Simplify component** `components/featured-projects.tsx`
- Remove the duplicate-first-project hack (lines 14–19).
- Map over `projects.slice(0, 4)` directly; key on `project.slug`; index from `.map((p, i) => i + 1)`.

**Note:** first open of "Поставки" in `/studio` creates the doc; editor then picks the 4 projects + order, and uploads hero images.

## 8. Editable hero images in Sanity

Hero currently uses a hardcoded `slides` array (6 files in `/public`). Make it driven by `siteSettings.heroImages` (schema field added in 7a).

**a. Query** `lib/projects.ts` (or `lib/sanity.ts`)
- Add `getHeroSlides(): Promise<{ src: string; alt: string }[]>`:
  `*[_type == "siteSettings"][0]{ heroImages }` → map each image via `urlFor(img).width(2400).quality(90).auto('format').url()`, alt from `img.alt ?? ''`.
  Fallback: if empty/unset, return the current hardcoded defaults so the site never renders an empty hero.

**b. Hero is `'use client'`, homepage is server** — pass slides as a prop.
- `components/hero.tsx`: add prop `slides?: { src: string; alt: string }[]`; keep the existing hardcoded array as the default value. Use the prop everywhere `slides` is referenced.
- `app/page.tsx`: `const heroSlides = await getHeroSlides()`; render `<Hero slides={heroSlides} />`.

**Note:** keep default fallback so an unconfigured/empty settings doc doesn't break the homepage.

---

## 9. Editable categories in Sanity (done)

Categories were a hardcoded array + a static string list on the project schema. Now Sanity-driven, reference-based, reflected everywhere.

- New `sanity/schemas/category.ts` document: `title`, `slug`, `order`, `heroImage`.
- `project.category`: `string` (hardcoded `list`) → `reference` to `category`.
- `sanity.config.ts`: registered `categorySchema`; added "Категории" to structure.
- `lib/sanity.ts`: `CategorySlug` → `string`; added `SanityCategory`; `SanityProject` gains projected `category` (slug) + `categoryTitle`.
- `lib/projects.ts`: removed static `categories`; added async `getCategories()` / `getCategory(slug)`; all project queries deref category via `PROJECT_PROJECTION` (`"category": category->slug.current`, `"categoryTitle": category->title`); `getProjectsByCategory` filters on `category->slug.current`.
- `app/projects/page.tsx`: filters from `getCategories()`.
- `app/project/[slug]/page.tsx`: back-link uses `project.category` + `project.categoryTitle` (dropped sync `getCategory`).
- Routing: deleted 5 empty `app/<slug>/` dirs; added dynamic `app/[category]/page.tsx` (generateStaticParams from Sanity, notFound on unknown). Static routes (about/contact/projects/project/studio) take precedence.
- Migration: `scripts/seed-categories.mjs` created 5 category docs (with hero images uploaded from `/public`) + converted existing projects' string category → reference. Idempotent.

To add a category now: Studio → "Категории" → create (title + slug + order + image). Appears in filters, project dropdown, and gets its own `/{slug}` landing page automatically.

## Suggested order
2 → 4 → 6 (mechanical, low risk) → 1 → 3 → 5 (layout, verify wide screen) → 7 + 8 (backend, share the `siteSettings` schema).

## Verification
- `npm run dev`; check `/`, `/projects`, `/contact`, a `/project/[slug]`, and `/studio`.
- Wide viewport (>1600px): confirm logo left edge and "Види проекти" left edge share a vertical line.
- Studio: set 4 featured projects → homepage reflects selection + order.
- Studio: upload/reorder hero images → homepage slideshow reflects them; empty settings falls back to defaults.
- `npm run build` clean.

## Open / low-confidence
- Task 1: keep or drop the `{count} проекти` text — plan keeps it (relocated). Confirm.
- Task 4: exact arrow treatment (plain white vs white + drop-shadow) — drop-shadow recommended for contrast over light slides.
