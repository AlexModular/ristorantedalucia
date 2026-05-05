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
      type: 'localizedString',
    }),
    defineField({
      name: 'subtitle',
      type: 'localizedString'
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
    defineField({name: 'metaTitle', type: 'localizedString'}),
    defineField({name: 'metaDescription', type: 'localizedString'}),
    defineField({name: 'introImage', type: 'image'}),
    defineField({
      title: 'Full width',
      name: 'fullWidth',
      type: 'boolean',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Global Page Background',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'backgroundFixed',
      title: 'Fixed Background (Parallax)',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "Cream", value: "cream" },
          { title: "Auto (System Preference)", value: "auto" },
        ],
        layout: "radio",
      },
      initialValue: "light",
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
        defineArrayMember({
          name: 'quickActions',
          type: 'quickActions',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.it',
      slug: 'slug.current',
      media: 'introImage'
    },
    prepare({ title, slug, media }) {
      return {
        title: title || 'Untitled',
        subtitle: slug ? `/${slug}` : '',
        media
      }
    }
  }
});
