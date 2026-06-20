import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getProject, getAllProjectSlugs } from "@/lib/projects"
import { ProjectGallery } from "@/components/project-gallery"

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — STUDIO 2000`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

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
            unoptimized
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Title + meta + description */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          {project.category && (
            <Link
              href={`/projects?category=${project.category}`}
              className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {project.categoryTitle}
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
            <ProjectGallery images={gallery} title={project.title} />
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  )
}
