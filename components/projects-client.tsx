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
    const validSlugs = new Set(categories.map((c) => c.slug))
    return param.split(',').filter((s): s is CategorySlug => validSlugs.has(s as CategorySlug))
  }, [searchParams, categories])

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
              aria-pressed={isAllActive}
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
                  aria-pressed={active}
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
