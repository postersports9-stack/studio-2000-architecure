"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type CategoryPageProps = {
  title: string
  heroImage: string
  projects: { name: string; location: string; year: string; image: string }[]
}

export function CategoryPage({ title, heroImage, projects }: CategoryPageProps) {
  const [heroOpacity, setHeroOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      setHeroOpacity(Math.max(0, 1 - window.scrollY / 500))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Sticky block: title + hero together, sticks from page load */}
      <div className="sticky top-20 z-10" style={{ opacity: heroOpacity }}>
        <section className="bg-background pt-12 md:pt-16">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="flex items-end justify-end pb-6 md:pb-10">
              <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl lg:text-8xl">
                {title}
              </h1>
            </div>
          </div>
        </section>

        <div className="relative h-[420px] sm:h-[520px] md:h-[640px] w-full overflow-hidden">
          <Image
            src={heroImage || "/placeholder.svg"}
            alt={title}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Scrollable content scrolls over sticky block */}
      <div className="relative z-20 bg-background">
        {/* Project grid */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <article key={project.name} className="group">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 text-xs uppercase tracking-[0.2em] text-foreground/40">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h2 className="font-serif text-xl leading-tight md:text-2xl">{project.name}</h2>
                      <div className="mt-1 text-sm text-foreground/60">{project.location}</div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-foreground/50">{project.year}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
