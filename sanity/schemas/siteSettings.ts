import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Поставки',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredProjects',
      title: 'Истакнати проекти',
      description: 'Изберете точно 4 проекти за почетната страница. Редоследот е важен.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
      validation: (Rule) => Rule.min(4).max(4),
    }),
    defineField({
      name: 'heroImages',
      title: 'Слики на почетна (hero)',
      description: 'Слики за слајдшоуто на почетната страница.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Алт текст',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Поставки' }
    },
  },
})
