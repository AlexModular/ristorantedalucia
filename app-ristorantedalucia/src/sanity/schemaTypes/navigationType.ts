import {defineField, defineType} from 'sanity'
import { GrNavigate } from "react-icons/gr";

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: GrNavigate,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title"
    }),
    defineField({
      name: 'navId',
      type: 'slug',
      title: "Navigation Id"
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Navigation items",
      of: [{ type: "navigationItem" }]
    })
  ]
});