import { Phone, ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <>
      {/* Whitespace above image (header offset) */}
      <section className="w-full overflow-hidden pt-36 md:pt-44">
        <div className="relative h-[420px] sm:h-[520px] md:h-[640px] w-full overflow-hidden">
          <Image
            src="/hero-architecture.webp"
            alt="Архитектонски проект на STUDIO 2000"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Title + CTA below image */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <h1 className="max-w-5xl font-serif text-5xl leading-[1.05] text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Архитектонско студио
            <br />
            во Скопје од 2000.
          </h1>

          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <a
              href="tel:070220772"
              className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] text-background transition-all hover:bg-background hover:text-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>070 220 772</span>
            </a>
            <a
              href="/komercijalni"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/60 transition-colors hover:text-foreground"
            >
              Видете проекти
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
