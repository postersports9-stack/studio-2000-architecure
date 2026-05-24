import { SiteHeader } from "@/components/site-header"
import { Contact } from "@/components/contact"

export const metadata = {
  title: "Контакт — STUDIO 2000",
  description: "Контактирајте го STUDIO 2000.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-20">
        <Contact />
      </div>
    </main>
  )
}
