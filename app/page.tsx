import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { AboutSnippet } from "@/components/about-snippet"
import { getFeaturedProjects, getHeroSlides } from "@/lib/projects"

// Re-fetch from Sanity at most once per minute (ISR) so content edits show.
export const revalidate = 60

export default async function Page() {
  const [featuredProjects, heroSlides] = await Promise.all([
    getFeaturedProjects(),
    getHeroSlides(),
  ])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero slides={heroSlides} />
      <div className="relative z-20 bg-background mt-[100vh]">
        <FeaturedProjects projects={featuredProjects} />
        <AboutSnippet />
        <SiteFooter />
      </div>
    </main>
  )
}
