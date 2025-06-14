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
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
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
})