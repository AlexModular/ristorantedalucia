import {defineField, defineType} from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  type: 'object',
  title: 'Banner',
  fields: [
    defineField({
      name: 'heading',
      type: 'localizedString',
    }),
    defineField({
      name: 'headingCSSClasses',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'localizedString',
    }),
    defineField({
      name: 'text',
      type: 'localizedBlockContent',
    }),
  ],
})