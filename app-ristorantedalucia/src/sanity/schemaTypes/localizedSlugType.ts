import { defineField, defineType } from 'sanity'
import { LocalizedSlugInput } from '@/sanity/components/LocalizedSlugInput'

/**
 * localizedSlug — an object holding one Sanity `slug` per supported locale.
 *
 * Stored shape:
 * {
 *   _type: 'localizedSlug',
 *   it: { _type: 'slug', current: 'bologna-centro' },
 *   en: { _type: 'slug', current: 'bologna-downtown' },
 * }
 */
export const localizedSlug = defineType({
  name: 'localizedSlug',
  title: 'Localized Slug',
  type: 'object',
  components: {
    input: LocalizedSlugInput,
  },
  fields: [
    defineField({
      name: 'it',
      title: 'Italian',
      type: 'slug',
      options: { maxLength: 96 },
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'slug',
      options: { maxLength: 96 },
    }),
  ],
})
