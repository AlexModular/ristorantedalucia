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
      type: "localizedString",
      title: "Title",
    }),
    defineField({
      name: 'introText',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Dish Categories",
      of: [{ type: "dishesCategory" }]
    })
  ]
});