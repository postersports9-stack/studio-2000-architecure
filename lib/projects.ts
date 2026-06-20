import { client, urlFor } from './sanity'
import type { SanityProject, SanityCategory, SanityHeroImage } from './sanity'

export type CategorySlug = string

export type Project = {
  slug: string
  title: string
  category: CategorySlug
  categoryTitle: string
  location: string
  year: string
  description: string
  images: string[]
}

export type Category = {
  slug: CategorySlug
  title: string
}

// Resolve the referenced category to its slug + title alongside all project fields.
const PROJECT_PROJECTION = `{
  ...,
  "category": category->slug.current,
  "categoryTitle": category->title
}`

function toProject(doc: SanityProject): Project {
  return {
    slug: doc.slug?.current ?? doc._id,
    title: doc.title,
    category: doc.category ?? '',
    categoryTitle: doc.categoryTitle ?? '',
    location: doc.location,
    year: doc.year,
    description: doc.description ?? '',
    images: (doc.images ?? []).map((img) =>
      urlFor(img).width(2400).quality(95).auto('format').url()
    ),
  }
}

export async function getCategories(): Promise<Category[]> {
  const docs: SanityCategory[] = await client.fetch(
    `*[_type == "category"] | order(coalesce(order, 999) asc, title asc)`
  )
  return docs.map((doc) => ({
    slug: doc.slug?.current ?? doc._id,
    title: doc.title,
  }))
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const doc = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] ${PROJECT_PROJECTION}`,
    { slug }
  )
  return doc ? toProject(doc) : undefined
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const docs = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`)
  return docs.map((d: any) => d.slug).filter(Boolean)
}

export async function getAllProjects(): Promise<Project[]> {
  const docs = await client.fetch(
    `*[_type == "project"] | order(_createdAt desc) ${PROJECT_PROJECTION}`
  )
  return docs.map(toProject)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const settings = await client.fetch(
    `*[_type == "siteSettings"][0]{ "featuredProjects": featuredProjects[]-> ${PROJECT_PROJECTION} }`
  )
  const docs: SanityProject[] = (settings?.featuredProjects ?? []).filter(Boolean)
  if (docs.length === 0) {
    return (await getAllProjects()).slice(0, 4)
  }
  return docs.map(toProject)
}

export async function getHeroSlides(): Promise<{ src: string; alt: string }[]> {
  const settings = await client.fetch(
    `*[_type == "siteSettings"][0]{ heroImages }`
  )
  const images: SanityHeroImage[] = settings?.heroImages ?? []
  return images
    // Skip empty/unfinished image slots (no uploaded asset) — urlFor() throws on those.
    .filter((img) => Boolean((img as { asset?: unknown })?.asset))
    .map((img) => ({
      src: urlFor(img).width(2400).quality(90).auto('format').url(),
      alt: img.alt ?? '',
    }))
}
