import {defineArrayMember, defineField, defineType} from 'sanity'
import { GrDocument } from "react-icons/gr";
export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: GrDocument,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'subtitle',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required()
    }),
    defineField({name: 'metaTitle', type: 'string'}),
    defineField({name: 'metaDescription', type: 'string'}),
    defineField({name: 'introImage', type: 'image'}),
    defineField({
      title: 'Full width',
      name: 'fullWidth',
      type: 'boolean',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      options: {
        layout: 'list',
        insertMenu: {
          filter: true,
          groups: [
            {
              name: 'landing',
              title: 'Landing Page',
              of: ['banner', 'promotion', 'form'],
            },
            {
              name: 'promotions',
              title: 'Promotions',
              of: ['gallery', 'video', 'promotion', 'dishesMenu'],
            }
          ],
          views: [
            {name: 'list'},
            {name: 'grid',
              previewImageUrl: (schemaTypeName) => `/static/preview-${schemaTypeName}.jpg`
            }
          ]
        }
      },
      of: [
        defineArrayMember({
          name: 'banner',
          type: 'banner',
        }),
        defineArrayMember({
          name: 'textWithIllustration',
          type: 'textWithIllustration',
        }),
        defineArrayMember({
          name: 'gallery',
          type: 'gallery',
        }),
        defineArrayMember({
          name: 'slider',
          type: 'slider',
        }),
        defineArrayMember({
          name: 'slideshow',
          type: 'slideshow',
        }),
        defineArrayMember({
          name: 'form',
          type: 'form',
        }),
        defineArrayMember({
          name: 'video',
          type: 'video',
        }),
        defineArrayMember({
          name: 'promotion',
          type: 'promotion',
        }),
        defineArrayMember({
          name: 'separator',
          type: 'separator',
        }),
        defineArrayMember({
          name: 'map',
          type: 'map',
        }),
        defineArrayMember({
          name: "dishesMenu",
          type: 'reference',
          to: [{ type: 'dishesMenu' }],
        }),
      ],
    }),
  ],
});
