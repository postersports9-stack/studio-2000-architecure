// One-time seed + migration:
//   1. Create the 5 existing categories as Sanity documents (with hero images).
//   2. Convert any project whose `category` is still a plain string into a
//      reference to the matching category document.
//
// Run once:  node scripts/seed-categories.mjs
// Idempotent: re-running skips categories that already exist and projects
// that are already migrated.

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'

// Minimal .env.local loader (no dotenv dependency).
for (const line of readFileSync(path.join(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const CATEGORIES = [
  { slug: 'administrativni', title: 'Административни', order: 1 },
  { slug: 'komercijalni', title: 'Комерцијални', order: 2 },
  { slug: 'hoteli', title: 'Хотели', order: 3 },
  { slug: 'stanbeni', title: 'Станбени', order: 4 },
  { slug: 'enterieri', title: 'Ентериери', order: 5 },
]

const idFor = (slug) => `category-${slug}`

async function seedCategories() {
  for (const cat of CATEGORIES) {
    const _id = idFor(cat.slug)
    const existing = await client.getDocument(_id)
    if (existing) {
      console.log(`= category "${cat.title}" already exists, skipping`)
      continue
    }

    await client.create({
      _id,
      _type: 'category',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      order: cat.order,
    })
    console.log(`+ created category "${cat.title}"`)
  }
}

async function migrateProjects() {
  const knownSlugs = new Set(CATEGORIES.map((c) => c.slug))
  const projects = await client.fetch(`*[_type == "project"]{ _id, category }`)

  for (const p of projects) {
    if (typeof p.category !== 'string') {
      console.log(`= project ${p._id} already migrated (or no category), skipping`)
      continue
    }
    if (!knownSlugs.has(p.category)) {
      console.warn(`  ! project ${p._id} has unknown category "${p.category}", skipping`)
      continue
    }
    await client
      .patch(p._id)
      .set({ category: { _type: 'reference', _ref: idFor(p.category) } })
      .commit()
    console.log(`~ migrated project ${p._id} -> ${p.category}`)
  }
}

await seedCategories()
await migrateProjects()
console.log('Done.')
