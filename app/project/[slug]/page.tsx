import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getCategory, getProject, projects } from "@/lib/projects"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — STUDIO 2000`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const category = getCategory(project.category)
  const [hero, ...gallery] = project.images

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Full-width hero image */}
      <section className="relative w-full overflow-hidden pt-20">
        <div className="relative h-[420px] sm:h-[560px] md:h-[680px] w-full overflow-hidden">
          <Image
            src={hero || "/placeholder.svg"}
            alt={project.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Title + meta + description */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          {category && (
            <Link
              href={`/${category.slug}`}
              className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {category.title}
            </Link>
          )}

          <h1 className="font-serif text-4xl leading-[1.0] tracking-tight text-balance md:text-6xl">
            {project.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-xs uppercase tracking-[0.2em] text-foreground/50">
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>

          <p className="mt-10 max-w-[68ch] text-base leading-relaxed text-foreground/70 md:text-lg">
            {project.description}
          </p>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {gallery.map((src, index) => (
                <div key={src} className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={`${project.title} — ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  )
}
