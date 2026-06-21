import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { About } from "@/components/about"
import { ReferenceList } from "@/components/reference-list"

export const metadata = {
  title: "За Нас — STUDIO 2000",
  description: "За архитектонското студио STUDIO 2000.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <div className="pt-20 flex-1">
        <About />
        <ReferenceList />
      </div>
      <SiteFooter />
    </main>
  )
}
