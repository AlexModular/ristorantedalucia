import {defineField, defineType} from 'sanity'

export const dishType = defineType({
  name: 'dish',
  title: 'Dish',
  type: 'object',
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description"
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price"
    }),
    defineField({
      name: "subcategory",
      type: "string",
      title: "Subcategory",
      description: "Optional subcategory for the dish, e.g. 'White Wine', 'Red Wine', etc. (in order to group dishes in the category menu)",
    }),
  ]
});