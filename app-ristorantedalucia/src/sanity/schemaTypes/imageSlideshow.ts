import {defineField, defineType} from 'sanity'
import { PiSlideshowFill } from "react-icons/pi";

export const imageSlideshowType = defineType({
  name: 'slideshow',
  type: 'object',
  title: 'Slideshow',
  icon: PiSlideshowFill,
  fields: [
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
              name: 'heading',
              type: 'localizedString',
              title: 'Slide Heading',
            },
            {
              name: 'subtitle',
              type: 'localizedString',
              title: 'Slide subtitle',
            },
            {
              name: 'cta',
              type: 'navigationItem',
              title: 'Call to action link',
            },
            {
              name: 'alt',
              type: 'localizedString',
              title: 'Alternative text',
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Logo Instad of Heading',
              description: 'Optional logo to display instead of the heading text',
            }
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'effect',
      title: 'Transition Effect',
      type: 'string',
      options: {
        list: [
          { title: 'Elegant Fade', value: 'fade' },
          { title: 'Standard Slide', value: 'slide' },
          { title: 'Creative Push', value: 'creative' },
          { title: 'Coverflow', value: 'coverflow' },
        ],
      },
      initialValue: 'fade',
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      const count = images?.length || 0;
      return {
        title: 'Slideshow',
        subtitle: `${count} slide${count === 1 ? '' : 's'}`,
        media: images?.[0],
      }
    }
  }
})