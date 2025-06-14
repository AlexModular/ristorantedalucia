import {defineField, defineType} from 'sanity'
import { BiDish } from "react-icons/bi";

export const dishesCategoryType = defineType({
  name: 'dishesCategory',
  title: 'Dish Category',
  type: 'object',
  icon: BiDish,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: "Icon",
      name: "icon",
      type: "icon"
    }),
    defineField({
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{ type: "dish" }]
    })
  ]
});