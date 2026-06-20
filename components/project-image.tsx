'use client'

import Image, { type ImageProps } from 'next/image'
import { useEffect, useRef, useState } from 'react'

/**
 * next/image wrapper that shows a pulsing skeleton until the image finishes
 * loading. The skeleton sits ON TOP of the image so the image's own className
 * (grayscale/scale/hover) is left untouched.
 *
 * `unoptimized` so the high-quality Sanity CDN asset is served as-is (no
 * re-encoding) — must live inside a `relative` + `overflow-hidden` parent.
 */
export function ProjectImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // A cached image can finish before React attaches onLoad, leaving the
    // skeleton stuck (and pulsing). Detect that case on mount.
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <>
      <Image
        {...props}
        ref={imgRef}
        unoptimized
        className={className}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
      />
      {!loaded && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-pulse bg-muted"
        />
      )}
    </>
  )
}
