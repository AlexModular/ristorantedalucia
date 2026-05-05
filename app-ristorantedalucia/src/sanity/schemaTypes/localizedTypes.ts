import { defineField, defineType } from 'sanity'

export const localizedString = defineType({
  title: 'Localized String',
  name: 'localizedString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    defineField({
      title: 'Italian',
      name: 'it',
      type: 'string',
    }),
    defineField({
      title: 'English',
      name: 'en',
      type: 'string',
    }),
  ],
})

export const localizedBlockContent = defineType({
  title: 'Localized Block Content',
  name: 'localizedBlockContent',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    defineField({
      title: 'Italian',
      name: 'it',
      type: 'blockContent',
    }),
    defineField({
      title: 'English',
      name: 'en',
      type: 'blockContent',
    }),
  ],
})
