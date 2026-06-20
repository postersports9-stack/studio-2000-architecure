import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  // Fresh data on each ISR regeneration so Studio edits actually propagate.
  useCdn: false,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Categories are now Sanity documents; slug is a free-form string.
export type CategorySlug = string

export type SanityCategory = {
  _id: string
  title: string
  slug: { current: string }
  order?: number
}

export type SanityProject = {
  _id: string
  title: string
  slug: { current: string }
  // After GROQ projection these resolve from the referenced category document.
  category: string
  categoryTitle?: string
  location: string
  year: string
  description: string
  images: SanityImageSource[]
}

export type SanityHeroImage = SanityImageSource & { alt?: string }

export type SanitySettings = {
  featuredProjects?: SanityProject[]
  heroImages?: SanityHeroImage[]
}
