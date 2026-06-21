import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1920px] px-6 py-10 md:px-12 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 items-start">
          {/* Logo & Description */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <Image src="/logo-transparent.png" alt="STUDIO 2000" width={265} height={93} className="h-8 w-auto self-start" />
            <p className="max-w-sm text-xs leading-relaxed text-foreground/60">
              Архитектонско студио посветено на висококвалитетен просторен дизајн од 2000 година.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="md:col-span-3">
            <div className="mb-4 font-serif text-xs uppercase tracking-[0.2em] text-foreground/50">Линк</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-foreground/80 transition-colors hover:text-foreground">
                  Проекти
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/80 transition-colors hover:text-foreground">
                  За Нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/80 transition-colors hover:text-foreground">
                  Контакт
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact details */}
          <div className="md:col-span-4">
            <div className="mb-4 font-serif text-xs uppercase tracking-[0.2em] text-foreground/50">Контакт</div>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>
                <a href="tel:070220772" className="transition-colors hover:text-foreground">
                  070 220 772
                </a>
              </li>
              <li>
                <a href="mailto:contact@studio2000.com.mk" className="transition-colors hover:text-foreground">
                  contact@studio2000.com.mk
                </a>
              </li>
              <li className="text-foreground/60">ул. Питу Гули 40, Скопје</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-serif text-xs uppercase tracking-[0.2em] text-foreground/50 md:flex-row md:items-center">
          <div>STUDIO 2000 — Архитектонско Студио</div>
          <div>© {new Date().getFullYear()} Сите права задржани.</div>
        </div>
      </div>
    </footer>
  )
}
