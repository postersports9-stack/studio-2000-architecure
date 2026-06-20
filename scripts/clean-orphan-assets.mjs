// Delete image/file assets that are no longer referenced by any document.
//
// Sanity does NOT garbage-collect assets automatically: removing an image from
// a document (or replacing it) leaves the old asset in the dataset, counting
// toward storage + bandwidth. Run this to reclaim them.
//
//   node scripts/clean-orphan-assets.mjs            # delete orphaned assets
//   node scripts/clean-orphan-assets.mjs --dry-run  # list only, delete nothing
//
// Also unsets the now-removed `heroImage` field on category documents so those
// images become orphaned and get cleaned in the same pass.

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const DRY = process.argv.includes('--dry-run')

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

async function unsetCategoryHeroImages() {
  const cats = await client.fetch(`*[_type == "category" && defined(heroImage)]{ _id }`)
  for (const c of cats) {
    if (DRY) {
      console.log(`[dry] would unset heroImage on ${c._id}`)
      continue
    }
    await client.patch(c._id).unset(['heroImage']).commit()
    console.log(`~ unset heroImage on ${c._id}`)
  }
}

async function deleteOrphanAssets() {
  const orphans = await client.fetch(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && count(*[references(^._id)]) == 0]{ _id, originalFilename }`
  )
  if (orphans.length === 0) {
    console.log('No orphaned assets.')
    return
  }
  for (const a of orphans) {
    if (DRY) {
      console.log(`[dry] would delete ${a._id} (${a.originalFilename ?? 'unnamed'})`)
      continue
    }
    await client.delete(a._id)
    console.log(`- deleted ${a._id} (${a.originalFilename ?? 'unnamed'})`)
  }
  console.log(`${DRY ? 'Would delete' : 'Deleted'} ${orphans.length} asset(s).`)
}

await unsetCategoryHeroImages()
await deleteOrphanAssets()
console.log('Done.')
