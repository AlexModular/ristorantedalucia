import {defineField, defineType} from 'sanity'
import { BsInputCursorText } from "react-icons/bs";

const POSITION = [
  {title: 'Left', value: 'left'},
  {title: 'Right', value: 'right'},
];

export const promotionType = defineType({
  name: 'promotion',
  type: 'object',
  title: 'Promotion Label',
  icon: BsInputCursorText,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'url',
    }),
    defineField({
      name: 'direction',
      title: 'Animation Direction',
      type: 'string',
      initialValue: 'left',
      options: {list: POSITION},
    }),
    defineField({
      name: 'speed',
      title: 'Animation Speed',
      type: 'number',
      initialValue: 10,
      validation: Rule => Rule.min(1).max(30),
      description: 'Speed in seconds',
    }),
  ],
})