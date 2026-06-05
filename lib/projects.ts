import { client, urlFor } from './sanity'

export type CategorySlug = "administrativni" | "komercijalni" | "hoteli" | "stanbeni" | "enterieri"

export type Project = {
  slug: string
  title: string
  category: CategorySlug
  location: string
  year: string
  description: string
  images: string[]
}

export const categories: { slug: CategorySlug; title: string; heroImage: string }[] = [
  { slug: "administrativni", title: "Административни", heroImage: "/category-administrative.jpg" },
  { slug: "komercijalni", title: "Комерцијални", heroImage: "/category-commercial.webp" },
  { slug: "hoteli", title: "Хотели", heroImage: "/category-hotels.jpg" },
  { slug: "stanbeni", title: "Станбени", heroImage: "/category-residential.jpg" },
  {
    slug: "enterieri",
    title: "Ентериери",
    heroImage: "/projects/enterier-caci/edit-6000_result.webp",
  },
]

export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)
}

function toProject(doc: any): Project {
  return {
    slug: doc.slug?.current ?? doc._id,
    title: doc.title,
    category: doc.category,
    location: doc.location,
    year: doc.year,
    description: doc.description ?? '',
    images: (doc.images ?? []).map((img: any) =>
      urlFor(img).width(1600).auto('format').url()
    ),
  }
}

export async function getProjectsByCategory(category: CategorySlug): Promise<Project[]> {
  const docs = await client.fetch(
    `*[_type == "project" && category == $category] | order(_createdAt desc)`,
    { category }
  )
  return docs.map(toProject)
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const doc = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
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
    `*[_type == "project"] | order(_createdAt desc)`
  )
  return docs.map(toProject)
}
