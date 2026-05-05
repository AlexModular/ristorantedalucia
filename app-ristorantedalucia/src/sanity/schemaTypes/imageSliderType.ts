import {defineField, defineType} from 'sanity'
import { PiSlidersFill } from "react-icons/pi";

export const imageSliderType = defineType({
  name: 'slider',
  type: 'object',
  title: 'Slider',
  icon: PiSlidersFill,
  fields: [
    defineField({
      name: 'heading',
      type: 'localizedString',
    }),
    defineField({
      name: 'subtitle',
      type: 'localizedString',
    }),
    defineField({
      name: 'backgroundImage',
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
    defineField({
      name: 'backgroundFixed',
      title: 'Fixed Background (Parallax)',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.backgroundImage,
    }),
    defineField({
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
    }),
  ],
  preview: {
    select: {
      title: 'heading.it',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Slider (No Title)',
        subtitle: 'Image slider',
        media,
      }
    }
  }
})