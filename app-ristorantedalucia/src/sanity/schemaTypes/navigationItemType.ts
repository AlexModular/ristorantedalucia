import {defineField, defineType} from 'sanity'
import { GrNavigate } from "react-icons/gr";

export const navigationItemType = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  icon: GrNavigate,
  fields: [
    defineField({
      name: "text",
      type: "string",
      title: "Navigation Text"
    }),
    defineField({
      name: "navigationItemUrl",
      type: "link", 
      title: "Navigation Item URL"
    })
  ]
});