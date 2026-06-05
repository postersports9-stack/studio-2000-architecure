'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const navLinks = [
  { label: "Проекти", href: "/projects" },
  { label: "За Нас", href: "/about" },
  { label: "Контакт", href: "/contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function handleNavClick(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="mx-auto grid h-24 max-w-[1600px] grid-cols-3 items-center px-6 md:px-12">
          <Link href="/" aria-label="STUDIO 2000 — почетна" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt="STUDIO 2000"
              width={265}
              height={93}
              priority
              className="h-9 w-auto md:h-11"
            />
          </Link>

          <nav className="hidden items-center justify-center gap-8 lg:flex xl:gap-10">
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

          <div className="flex justify-end">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Затвори мени" : "Отвори мени"}
              className="flex lg:hidden flex-col items-end justify-center gap-1.5 p-2"
            >
              <span className={`block h-px bg-foreground transition-all duration-300 ${open ? "w-6 translate-y-2.5 rotate-45" : "w-6"}`} />
              <span className={`block h-px bg-foreground transition-all duration-300 ${open ? "w-0 opacity-0" : "w-4"}`} />
              <span className={`block h-px bg-foreground transition-all duration-300 ${open ? "w-6 -translate-y-2.5 -rotate-45" : "w-6"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-background transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`font-serif text-5xl text-foreground transition-all duration-500 hover:text-foreground/50 sm:text-6xl ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="px-6 pb-12 text-xs uppercase tracking-[0.2em] text-foreground/40">
          <a href="tel:070220772" className="hover:text-foreground transition-colors">070 220 772</a>
        </div>
      </div>
    </>
  )
}
