# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 5 individual category pages with a single `/projects` page showing all projects with multi-select category filters synced to the URL.

**Architecture:** Server component (`app/projects/page.tsx`) fetches all projects from Sanity and passes them to a `'use client'` component (`components/projects-client.tsx`) that handles filter state, URL sync via `useSearchParams`/`useRouter`, and renders the grid. The header is updated to replace 5 category links with one "Проекти" link.

**Tech Stack:** Next.js 15 App Router, Sanity (`@sanity/client`), Tailwind CSS v4, TypeScript

---

### Task 1: Add `getAllProjects()` to lib/projects.ts

**Files:**
- Modify: `lib/projects.ts`

- [ ] **Step 1: Add the function**

Open `lib/projects.ts`. After the `getAllProjectSlugs` function at the bottom, add:

```typescript
export async function getAllProjects(): Promise<Project[]> {
  const docs = await client.fetch(
    `*[_type == "project"] | order(_createdAt desc)`
  )
  return docs.map(toProject)
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```powershell
pnpm tsc --noEmit
```

Expected: no errors on `lib/projects.ts`

- [ ] **Step 3: Commit**

```bash
git add lib/projects.ts
git commit -m "feat: add getAllProjects query"
```

---

### Task 2: Create ProjectsClient component

**Files:**
- Create: `components/projects-client.tsx`

- [ ] **Step 1: Create the file**

```typescript
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project, CategorySlug } from '@/lib/projects'

type Category = { slug: CategorySlug; title: string; heroImage: string }

type Props = {
  projects: Project[]
  categories: Category[]
}

export function ProjectsClient({ projects, categories }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const activeCategories = useMemo<CategorySlug[]>(() => {
    const param = searchParams.get('category')
    if (!param) return []
    return param.split(',').filter(Boolean) as CategorySlug[]
  }, [searchParams])

  const filteredProjects = useMemo(() => {
    if (activeCategories.length === 0) return projects
    return projects.filter((p) => activeCategories.includes(p.category))
  }, [projects, activeCategories])

  function toggleCategory(slug: CategorySlug) {
    const next = activeCategories.includes(slug)
      ? activeCategories.filter((c) => c !== slug)
      : [...activeCategories, slug]
    const params = new URLSearchParams(searchParams.toString())
    if (next.length === 0) {
      params.delete('category')
    } else {
      params.set('category', next.join(','))
    }
    router.replace(`/projects${params.toString() ? `?${params}` : ''}`)
  }

  function clearFilters() {
    router.replace('/projects')
  }

  const isAllActive = activeCategories.length === 0

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="flex items-end justify-between gap-8">
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Проекти
            </h1>
            <span className="pb-2 text-xs uppercase tracking-[0.2em] text-foreground/40">
              {filteredProjects.length} проекти
            </span>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-24 z-30 border-b border-foreground/10 bg-background">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={clearFilters}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                isAllActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-foreground/20 text-foreground/50 hover:border-foreground/40'
              }`}
            >
              Сите
            </button>
            {categories.map((cat) => {
              const active = activeCategories.includes(cat.slug)
              return (
                <button
                  key={cat.slug}
                  onClick={() => toggleCategory(cat.slug)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                    active
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-foreground/20 text-foreground/50 hover:border-foreground/40'
                  }`}
                >
                  {cat.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Project grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          {filteredProjects.length === 0 && (
            <p className="text-sm uppercase tracking-[0.2em] text-foreground/40">
              Нема проекти
            </p>
          )}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/project/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={project.images[0] || '/placeholder.svg'}
                    alt={project.title}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-1 text-xs uppercase tracking-[0.2em] text-foreground/40">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h2 className="font-serif text-xl leading-tight md:text-2xl">
                      {project.title}
                    </h2>
                    <div className="mt-1 text-sm text-foreground/60">
                      {project.location}
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                    {project.year}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/projects-client.tsx
git commit -m "feat: add ProjectsClient component with filter + grid"
```

---

### Task 3: Create app/projects/page.tsx

**Files:**
- Create: `app/projects/page.tsx`

Note: `useSearchParams` requires a `Suspense` boundary in Next.js App Router. Wrap `ProjectsClient` accordingly.

- [ ] **Step 1: Create the file**

```typescript
import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProjectsClient } from '@/components/projects-client'
import { getAllProjects, categories } from '@/lib/projects'

export const metadata = {
  title: 'Проекти — STUDIO 2000',
  description: 'Сите архитектонски проекти на STUDIO 2000.',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Suspense>
        <ProjectsClient projects={projects} categories={categories} />
      </Suspense>
      <SiteFooter />
    </main>
  )
}
```

- [ ] **Step 2: Start dev server and visit `/projects`**

```powershell
pnpm dev
```

Visit `http://localhost:3000/projects`. Verify:
- Page loads with "Проекти" heading
- Filter bar is visible with "Сите" + 5 category pills
- If Sanity has no projects yet, grid is empty with "Нема проекти" text (expected)
- Filter bar sticks when scrolling

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: add /projects server page"
```

---

### Task 4: Update SiteHeader navigation

**Files:**
- Modify: `components/site-header.tsx`

- [ ] **Step 1: Replace the navLinks array**

In `components/site-header.tsx`, replace the `navLinks` constant:

```typescript
const navLinks = [
  { label: "Проекти", href: "/projects" },
  { label: "За Нас", href: "/about" },
  { label: "Контакт", href: "/contact" },
]
```

- [ ] **Step 2: Verify in browser**

Visit `http://localhost:3000`. Header should show: Проекти / За Нас / Контакт. Click "Проекти" → navigates to `/projects`.

- [ ] **Step 3: Commit**

```bash
git add components/site-header.tsx
git commit -m "feat: replace category nav links with single Проекти link"
```

---

### Task 5: Delete individual category pages

**Files:**
- Delete: `app/administrativni/page.tsx`
- Delete: `app/komercijalni/page.tsx`
- Delete: `app/hoteli/page.tsx`
- Delete: `app/stanbeni/page.tsx`
- Delete: `app/enterieri/page.tsx`

- [ ] **Step 1: Delete the files**

```powershell
Remove-Item "app/administrativni/page.tsx"
Remove-Item "app/komercijalni/page.tsx"
Remove-Item "app/hoteli/page.tsx"
Remove-Item "app/stanbeni/page.tsx"
Remove-Item "app/enterieri/page.tsx"
```

- [ ] **Step 2: Verify TypeScript and dev server still work**

```powershell
pnpm tsc --noEmit
```

Expected: no errors. Visit `http://localhost:3000/komercijalni` — should return 404.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: remove individual category pages"
```

---

### Task 6: Verify filter behavior end-to-end

- [ ] **Step 1: Test multi-select filters**

With dev server running at `http://localhost:3000/projects`:
- Click "Станбени" → URL becomes `/projects?category=stanbeni`, grid shows only stanbeni projects
- Click "Ентериери" while Станбени active → URL becomes `/projects?category=stanbeni,enterieri`, grid shows both
- Click "Сите" → URL becomes `/projects`, all projects shown, "Сите" pill is inverted
- Click "Станбени" again → deselects it
- Project count in top-right updates correctly on each filter change

- [ ] **Step 2: Test URL deep-link**

Visit `http://localhost:3000/projects?category=enterieri` directly. Page should load with "Ентериери" pill active and grid filtered. Verify back button returns to previous page (not stepping through filter states).

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete /projects page with multi-select category filter"
```
