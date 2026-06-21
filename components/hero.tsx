'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Slide = { src: string; alt: string }

const DEFAULT_SLIDES: Slide[] = [
  { src: "/hero-architecture.webp", alt: "Архитектонски проект на STUDIO 2000" },
  { src: "/category-commercial.webp", alt: "Комерцијален проект" },
  { src: "/category-administrative.jpg", alt: "Административен проект" },
  { src: "/category-hotels.jpg", alt: "Хотелски проект" },
  { src: "/category-residential.jpg", alt: "Станбен проект" },
  { src: "/projects-hero.jpg", alt: "Проекти на STUDIO 2000" },
]

export function Hero({ slides: slidesProp }: { slides?: Slide[] }) {
  const slides = slidesProp && slidesProp.length > 0 ? slidesProp : DEFAULT_SLIDES
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

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

  useEffect(() => {
    // Drive opacity directly on the node via rAF — avoids a React re-render on
    // every scroll event (which caused noticeable jank).
    let raf = 0
    const handleScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = sectionRef.current
        if (el) {
          el.style.opacity = String(Math.max(0, 1 - window.scrollY / window.innerHeight))
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
    resetTimer()
  }, [resetTimer])

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
    resetTimer()
  }, [resetTimer])

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden h-screen fixed top-0 left-0 z-10"
      style={{ opacity: 1 }}
    >
      {/* Top vignette overlay for header readability */}
      <div className="absolute top-0 left-0 right-0 z-20 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="relative h-full w-full overflow-hidden">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            unoptimized
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
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] transition-all hover:text-white md:left-6 md:h-12 md:w-12"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Next arrow */}
        <button
          onClick={goNext}
          aria-label="Следна слика"
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] transition-all hover:text-white md:right-6 md:h-12 md:w-12"
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
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* CTA overlay — aligned to header gutter (max-w + px match site-header) */}
        <div className="absolute inset-x-0 bottom-8 z-10 mx-auto max-w-[1920px] px-6 md:px-12">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 bg-white px-6 py-3 font-serif text-xs uppercase tracking-[0.25em] text-foreground transition-all hover:bg-foreground hover:text-white md:px-8 md:py-4"
          >
            Види проекти
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
