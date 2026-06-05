import Link from "next/link"
import Image from "next/image"

const categories = [
  { label: "Сите проекти", href: "/projects" },
  { label: "Административни", href: "/projects?category=administrativni" },
  { label: "Комерцијални", href: "/projects?category=komercijalni" },
  { label: "Хотели", href: "/projects?category=hoteli" },
  { label: "Станбени", href: "/projects?category=stanbeni" },
  { label: "Ентериери", href: "/projects?category=enterieri" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/logo.png" alt="STUDIO 2000" width={265} height={93} className="h-9 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60">
              Архитектонско студио посветено на висококвалитетен просторен дизајн од 2000 година.
            </p>
          </div>

          <nav className="md:col-span-3">
            <div className="mb-5 text-xs uppercase tracking-[0.2em] text-foreground/50">Проекти</div>
            <ul className="space-y-3">
              {categories.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-foreground/80 transition-colors hover:text-foreground">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <div className="mb-5 text-xs uppercase tracking-[0.2em] text-foreground/50">Контакт</div>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li>
                <a href="tel:070220772" className="transition-colors hover:text-foreground">
                  070 220 772
                </a>
              </li>
              <li>
                <a href="mailto:kontakt@studio2000.mk" className="transition-colors hover:text-foreground">
                  kontakt@studio2000.mk
                </a>
              </li>
              <li className="text-foreground/60">Бул. Партизански Одреди 15, Скопје</li>
              <li>
                <Link href="/about" className="transition-colors hover:text-foreground">
                  За Нас
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs uppercase tracking-[0.2em] text-foreground/50 md:flex-row md:items-center">
          <div>STUDIO 2000 — Архитектонско Студио</div>
          <div>© {new Date().getFullYear()} Сите права задржани.</div>
        </div>
      </div>
    </footer>
  )
}
