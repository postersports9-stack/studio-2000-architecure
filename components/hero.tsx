import { Phone, ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <Image
        src="/hero-architecture.jpg"
        alt="Архитектонски проект на STUDIO 2000"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-foreground/40" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 pt-32 md:px-12 md:pb-24">
        <div className="mb-6 flex items-center gap-3 text-background/80">
          <span className="h-px w-12 bg-background/60" aria-hidden="true" />
          <span className="text-xs uppercase tracking-[0.3em]">Архитектонско Студио — Скопје</span>
        </div>

        <h1 className="max-w-5xl font-serif text-5xl leading-[1.05] text-balance text-background sm:text-6xl md:text-7xl lg:text-8xl">
          Просторот како
          <br />
          форма на тишина.
        </h1>

        <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-background/80 md:text-lg">
          Дизајнираме резиденции и комерцијални простори со прецизност, сензибилитет и трајност. Секој проект е автентичен израз на местото и нарачателот.
        </p>

        <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <a
            href="tel:+38923000000"
            className="group inline-flex items-center gap-3 border border-background bg-background px-8 py-4 text-xs uppercase tracking-[0.25em] text-foreground transition-all hover:bg-transparent hover:text-background"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>+389 2 3000 000</span>
          </a>
          <a
            href="/administrativni"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-background/80 transition-colors hover:text-background"
          >
            Видете проекти
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
