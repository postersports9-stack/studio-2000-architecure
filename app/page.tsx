import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { AboutSnippet } from "@/components/about-snippet"
import { getAllProjects } from "@/lib/projects"

export default async function Page() {
  const projects = await getAllProjects()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <div className="relative z-20 bg-background mt-[100vh]">
        <FeaturedProjects projects={projects} />
        <AboutSnippet />
        <SiteFooter />
      </div>
    </main>
  )
}
