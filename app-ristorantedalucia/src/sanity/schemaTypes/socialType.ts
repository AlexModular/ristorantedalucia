import {defineField, defineType} from 'sanity'
import { TiSocialAtCircular } from "react-icons/ti";

export const socialType = defineType({
  name: 'social',
  title: 'Social',
  type: 'object',
  icon: TiSocialAtCircular,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "link",
      type: "url",
      title: "Link",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "icon", 
      options: {
        collections: ['fa-brands']
      }
    }),
  ]
});