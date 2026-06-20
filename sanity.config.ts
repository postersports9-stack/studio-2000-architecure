'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { projectSchema } from './sanity/schemas/project'
import { categorySchema } from './sanity/schemas/category'
import { siteSettingsSchema } from './sanity/schemas/siteSettings'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: [projectSchema, categorySchema, siteSettingsSchema],
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Содржина')
          .items([
            S.listItem()
              .title('Поставки')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('project').title('Проекти'),
            S.documentTypeListItem('category').title('Категории'),
          ]),
    }),
    visionTool(),
  ],
})
