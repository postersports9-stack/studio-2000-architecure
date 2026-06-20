import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Категорија',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Наслов',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Редослед',
      description: 'Помал број = повисоко во листата на филтри.',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Редослед',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
