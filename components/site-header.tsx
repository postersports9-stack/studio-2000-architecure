import Link from "next/link"
import Image from "next/image"
import { Phone } from "lucide-react"

const navLinks = [
  { label: "Административни", href: "/administrativni" },
  { label: "Комерцијални", href: "/komercijalni" },
  { label: "Хотели", href: "/hoteli" },
  { label: "Станбени", href: "/stanbeni" },
  { label: "Ентериери", href: "/enterieri" },
  { label: "За Нас", href: "/about" },
  { label: "Контакт", href: "/contact" },
]

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Link href="/" aria-label="STUDIO 2000 — почетна">
          <Image
            src="/logo.png"
            alt="STUDIO 2000"
            width={265}
            height={93}
            priority
            className="h-7 w-auto md:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+38923000000"
          className="group inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-background transition-all hover:bg-background hover:text-foreground md:px-6 md:py-3"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">+389 2 3000 000</span>
          <span className="sm:hidden">Јави се</span>
        </a>
      </div>
    </header>
  )
}
