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
              type: 'string',
              title: 'Slide Heading',
            },
            {
              name: 'subtitle',
              type: 'string',
              title: 'Slide subtitle',
            },
            {
              name: 'cta',
              type: 'navigationItem',
              title: 'Call to action link',
            },
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
})