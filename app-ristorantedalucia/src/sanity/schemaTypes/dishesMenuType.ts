import {defineField, defineType} from 'sanity'
import { CiPizza } from "react-icons/ci";

export const dishesMenuType = defineType({
  name: 'dishesMenu',
  title: 'Restaurant Menu',
  type: 'document',
  icon: CiPizza,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'introText',
      type: 'blockContent',
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Dish Categories",
      of: [{ type: "dishesCategory" }]
    })
  ]
});