import {defineField, defineType} from 'sanity'
import { GrGallery } from "react-icons/gr";

export const imageGalleryType = defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  icon: GrGallery,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    {
      name: 'images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
})