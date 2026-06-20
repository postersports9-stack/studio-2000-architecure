'use client'

import Link from 'next/link'
import { ProjectImage } from '@/components/project-image'
import type { Project } from '@/lib/projects'

type Props = {
  projects: Project[]
}

export function FeaturedProjects({ projects }: Props) {
  if (projects.length === 0) return null

  const featured = projects.slice(0, 4)

  return (
    <section className="bg-background py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-12 flex items-center gap-3">
          <span className="h-px w-12 bg-foreground/60" aria-hidden="true" />
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/70">Истакнати проекти</span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, index) => (
            <Link
              key={project.slug}
              href={`/project/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <ProjectImage
                  src={project.images[0] || '/placeholder.svg'}
                  alt={project.title}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 text-xs uppercase tracking-[0.2em] text-foreground/40">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif text-lg leading-tight md:text-xl group-hover:text-foreground/70 transition-colors">
                    {project.title}
                  </h3>
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
  )
}
