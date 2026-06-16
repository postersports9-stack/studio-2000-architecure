'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [heroOpacity, setHeroOpacity] = useState(1)

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
    const handleScroll = () => {
      setHeroOpacity(Math.max(0, 1 - window.scrollY / window.innerHeight))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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
      className="w-full overflow-hidden h-screen fixed top-0 left-0 z-10"
      style={{ opacity: heroOpacity }}
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
  )
}
