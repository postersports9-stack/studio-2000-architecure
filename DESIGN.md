# STUDIO 2000 — Design System

Design reference for the STUDIO 2000 architecture studio website. Single-language site in **Macedonian (Cyrillic)** — every font choice **must** ship a complete Cyrillic character set, or headings/body text will fall back to a system font and look broken.

---

## 1. Design language

The site follows a **minimal, editorial, Swiss-grotesque** aesthetic — the same family of design as [tenberke.com](https://tenberke.com): lots of whitespace, large type, a strict grid, monochrome palette, photography does the talking.

Principles:

- **Monochrome.** Black text on white. No brand colour, no gradients. Images provide all the colour.
- **Type as the hero.** Oversized headings, tight leading, generous letter-spacing on small uppercase labels.
- **Grid discipline.** Everything aligns to a `max-w-[1600px]` container with `px-6 md:px-12` gutters.
- **Restraint over decoration.** No shadows, no rounded cards in layout, no borders unless structural. Motion is slow and subtle (700ms image transitions, grayscale→colour on hover).
- **Photography-led.** Project images are the content; UI gets out of the way.

---

## 2. Colour tokens

Defined in [app/globals.css](app/globals.css) as OKLCH CSS variables. The layout uses only a handful:

| Token | Light value | Use |
|-------|-------------|-----|
| `--background` | `oklch(1 0 0)` (white) | Page background |
| `--foreground` | `oklch(0.145 0 0)` (near-black) | Text |
| `--border` | `oklch(0.922 0 0)` | Hairline dividers (header border) |
| `--muted-foreground` | `oklch(0.556 0 0)` | Secondary/meta text |

Opacity modifiers carry most of the hierarchy instead of extra tokens:
`text-foreground/70` (body), `/60` (location), `/50` (year/labels), `/40` (numbers, "Наскоро").

A `.dark` theme is defined but not currently activated. Keep new colours inside these tokens — do not hardcode hex values in components.

---

## 3. Typography

### Active (2-font system)

- **Onest** (`--font-onest` → `--font-sans`) — body, nav, labels, UI. Neutral grotesque, the workhorse.
- **Cormorant** (`--font-cormorant` → `--font-serif`) — all headings (`font-serif`). High-contrast display serif for gravitas.

**Roles are strict:** Cormorant is **display only** (headings). Onest is everything else (body, meta, uppercase labels, buttons, nav). Never use Cormorant below ~`text-2xl` — its thin strokes need size to read, especially in Cyrillic.

Wired via `next/font/google` in [app/layout.tsx](app/layout.tsx), exposed as `--font-sans` / `--font-serif` in the `@theme` block of [app/globals.css](app/globals.css), and consumed through Tailwind's `font-sans` / `font-serif` utilities. Both ship `'cyrillic'` subsets.

### Type scale (keep regardless of font choice)

| Element | Classes |
|---------|---------|
| Hero H1 | `font-serif text-5xl … lg:text-8xl leading-[1.05]` |
| Category H1 | `font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95]` |
| Project title | `font-serif text-xl md:text-2xl` |
| Body / description | `text-base md:text-lg leading-relaxed text-foreground/70` |
| Uppercase label | `text-xs uppercase tracking-[0.2em]–[0.3em]` |

### Font recommendations (Cyrillic-ready)

tenberke uses a licensed Swiss grotesque (Söhne/Suisse family) with **no serif at all** — headings and body are the same grotesque at different sizes. Those exact faces are paid and Latin-focused. Below are free **Google Fonts with full Cyrillic** that hit the same register.

**Direction A — All-grotesque (closest to tenberke). Recommended.**
Drop the serif entirely; use one neutral grotesque everywhere, separated by size/weight.

| Role | Font | Why |
|------|------|-----|
| Everything | **Onest** | Modern neutral grotesque, complete Cyrillic, very close to Söhne/Suisse. Looks expensive at large sizes. |
| Alt | **Golos Text** | Cyrillic-first grotesque (designed for Russian/MK shapes), extremely clean. Safest Cyrillic rendering. |
| Alt | **IBM Plex Sans** | Neo-grotesque with a bit more engineering character; full Cyrillic. |

**Direction B — Grotesque body + grotesque display.**
Two grotesques for subtle contrast: a tighter display cut for headings, a neutral one for text.

| Role | Font |
|------|------|
| Headings | **Unbounded** (geometric display, Cyrillic) or **Manrope** (heavier weights) |
| Body | **Onest** or **Golos Text** |

**Direction C — Keep a serif, but a better one.**
If you want editorial serif headings (not tenberke's look, but elegant for an architecture studio) over a clean sans body.

| Role | Font | Why |
|------|------|-----|
| Headings | **Cormorant** | High-contrast display serif, full Cyrillic, refined. |
| Headings (alt) | **Source Serif 4** / **Lora** | Sturdier, very readable Cyrillic. |
| Body | **Onest** / **Golos Text** / **IBM Plex Sans** | |

All eight fonts above are on Google Fonts with a `cyrillic` subset — verify by adding `'cyrillic'` to the `subsets` array in the `next/font/google` call.

> **My pick:** Direction A with **Onest** (or **Golos Text** if you want the most bullet-proof Cyrillic). It matches tenberke most closely and removes Playfair, which is what reads as "AI default."

### How to swap (example: Direction A, Onest)

`app/layout.tsx`:

```ts
import { Onest } from 'next/font/google'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
})

// <html className={`${onest.variable} bg-background`}>
```

`app/globals.css` `@theme` block:

```css
--font-sans: var(--font-onest), ui-sans-serif, system-ui, sans-serif;
--font-serif: var(--font-onest), ui-sans-serif, sans-serif; /* same face → drop serif look */
```

Keeping `--font-serif` pointed at the same family means the existing `font-serif` heading classes keep working without touching every component. Later, swap headings to `font-sans` and delete `--font-serif` if you want a clean codebase.

**Always include `'cyrillic'` in `subsets`.** Without it, Cyrillic glyphs fall back to a system font.

---

## 4. Layout & spacing

- **Container:** `mx-auto max-w-[1600px] px-6 md:px-12`
- **Section rhythm:** `py-20 md:py-28` between major blocks
- **Fixed header:** `h-20` (80px), `fixed`, hairline `border-b`. Content offsets with `pt-*` / `top-20`.
- **Project grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-x-8 gap-y-16`
- **Project card aspect:** `aspect-[4/5]`; gallery images `aspect-[4/3]`

---

## 5. Component patterns

| Pattern | Where | Notes |
|---------|-------|-------|
| Sticky hero + fade | [components/category-page.tsx](components/category-page.tsx) | Title + hero sit in a `sticky top-20` block; opacity fades to 0 over the first 500px of scroll (`window.scrollY / 500`). |
| Image treatment | category grid | `grayscale` by default → `grayscale-0` + `scale-105` on hover, `duration-700`. |
| Project detail | [app/project/[slug]/page.tsx](app/project/%5Bslug%5D/page.tsx) | Hero image → title + meta + description → 2-col gallery. Data from [lib/projects.ts](lib/projects.ts). |
| Uppercase labels | header, meta, buttons | `text-xs uppercase tracking-[0.18em]–[0.3em]`. |
| CTA button | header, hero | Solid `bg-foreground text-background`, inverts to outline on hover. Square corners. |

---

## 6. Rules for new work

1. **Cyrillic first** — any new font must ship a `cyrillic` subset.
2. Stay monochrome; let images carry colour.
3. Reuse the container, type scale, and spacing rhythm above — don't invent new gutters.
4. No rounded cards, no shadows in layout-level components.
5. Square-cornered buttons, slow (500–700ms) transitions.
6. Drive content from [lib/projects.ts](lib/projects.ts), not hardcoded arrays in pages.
