'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import { Filter } from 'lucide-react'
import { ProjectImage } from '@/components/project-image'
import { Checkbox } from '@/components/ui/checkbox'
import type { Project, CategorySlug } from '@/lib/projects'

type Category = { slug: CategorySlug; title: string }

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

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-24 z-30 mt-28 border-b border-foreground/10 bg-background/95 backdrop-blur-sm md:mt-32">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
            <div className="flex items-center gap-2 font-serif text-[10px] uppercase tracking-[0.15em] text-foreground sm:text-xs">
              <Filter className="h-3.5 w-3.5" />
              <span>Филтер</span>
            </div>
            {categories.map((cat) => {
              const active = activeCategories.includes(cat.slug)
              return (
                <label
                  key={cat.slug}
                  className={`flex cursor-pointer items-center gap-2.5 font-serif text-[10px] uppercase tracking-[0.15em] transition-colors sm:text-xs ${
                    active
                      ? 'text-foreground'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <Checkbox
                    checked={active}
                    onCheckedChange={() => toggleCategory(cat.slug)}
                    className="h-3.5 w-3.5 border-foreground/30"
                  />
                  <span>{cat.title}</span>
                </label>
              )
            })}
            
            <div className="ml-auto flex items-center gap-6">
              {activeCategories.length > 0 && (
                <button
                  onClick={() => router.replace('/projects')}
                  className="font-serif text-[10px] uppercase tracking-[0.15em] text-foreground/40 transition-colors hover:text-foreground sm:text-xs"
                >
                  Избриши
                </button>
              )}
              <span className="font-serif text-[10px] uppercase tracking-[0.15em] text-foreground/60 sm:text-xs">
                {filteredProjects.length} проекти
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1920px] px-6 md:px-12">
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
                  <ProjectImage
                    src={project.images[0] || '/placeholder.svg'}
                    alt={project.title}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-serif mb-1 text-xs uppercase tracking-[0.2em] text-foreground/40">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h2 className="font-serif text-xl leading-tight md:text-2xl">
                      {project.title}
                    </h2>
                    <div className="mt-1 text-sm text-foreground/60">
                      {project.location}
                    </div>
                  </div>
                  <div className="font-serif text-xs uppercase tracking-[0.2em] text-foreground/50">
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
