'use client'

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex, close, prev, next])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {images.map((src, index) => (
          <button
            key={src}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden focus:outline-none"
            aria-label={`Зголеми слика ${index + 1}`}
          >
            <Image
              src={src}
              alt={`${title} — ${index + 1}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${title} — ${lightboxIndex + 1}`}
              width={1600}
              height={1066}
              unoptimized
              className="max-h-[90vh] w-auto max-w-[90vw] object-contain"
              priority
            />
          </div>

          {/* Close */}
          <button
            onClick={close}
            aria-label="Затвори"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Претходна"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white md:left-6"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Следна"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white md:right-6"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-white/50">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
