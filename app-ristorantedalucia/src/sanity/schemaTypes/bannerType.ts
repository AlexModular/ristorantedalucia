import {defineField, defineType} from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  type: 'object',
  title: 'Banner',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'headingCSSClasses',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
    }),
  ],
})