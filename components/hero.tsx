'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { Phone, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const slides = [
  { src: "/hero-architecture.webp", alt: "Архитектонски проект на STUDIO 2000" },
  { src: "/category-commercial.webp", alt: "Комерцијален проект" },
  { src: "/category-administrative.jpg", alt: "Административен проект" },
  { src: "/category-hotels.jpg", alt: "Хотелски проект" },
  { src: "/category-residential.jpg", alt: "Станбен проект" },
  { src: "/projects-hero.jpg", alt: "Проекти на STUDIO 2000" },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
    resetTimer()
  }, [resetTimer])

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
    resetTimer()
  }, [resetTimer])

  return (
    <>
      {/* Slider */}
      <section className="w-full overflow-hidden pt-28 md:pt-36">
        <div className="relative h-[420px] sm:h-[520px] md:h-[640px] w-full overflow-hidden">
          {slides.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className={`object-cover object-center transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
              sizes="100vw"
            />
          ))}

          {/* Prev arrow */}
          <button
            onClick={goPrev}
            aria-label="Претходна слика"
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 md:left-6 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Next arrow */}
          <button
            onClick={goNext}
            aria-label="Следна слика"
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 md:right-6 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Dot navigation */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); resetTimer() }}
                aria-label={`Слајд ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* CTA overlay */}
          <Link
            href="/projects"
            className="group absolute bottom-8 left-6 z-10 inline-flex items-center gap-3 bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-foreground transition-all hover:bg-foreground hover:text-white md:left-10 md:px-8 md:py-4"
          >
            Види проекти
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Title + CTA */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <h1 className="max-w-5xl font-serif text-5xl leading-[1.05] text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Архитектонско студио
            <br />
            во Скопје од 2000.
          </h1>

          <div className="mt-10">
            <a
              href="tel:070220772"
              className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] text-background transition-all hover:bg-background hover:text-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>070 220 772</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
