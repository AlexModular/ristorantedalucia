import {defineField, defineType} from 'sanity'
import { PiMapPinAreaFill } from "react-icons/pi";

export const mapType = defineType({
  name: 'map',
  type: 'object',
  title: 'Map',
  icon: PiMapPinAreaFill,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Map Center',
      name: 'mapCenter',
      type: 'geopoint',
  }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        defineField({
            title: 'Location',
            name: 'location',
            type: 'geopoint',
            validation: Rule => Rule.required(),
        }),
      ]
    }),
  ]
});