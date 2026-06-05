import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { label: "Проекти", href: "/projects" },
  { label: "За Нас", href: "/about" },
  { label: "Контакт", href: "/contact" },
]

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="mx-auto flex h-24 max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Link href="/" aria-label="STUDIO 2000 — почетна">
          <Image
            src="/logo.png"
            alt="STUDIO 2000"
            width={265}
            height={93}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
