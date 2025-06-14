import {defineField, defineType} from 'sanity'
import { BsJournalRichtext } from "react-icons/bs";

const POSITION = [
  {title: 'Left', value: 'left'},
  {title: 'Right', value: 'right'},
  //{title: 'Before Text', value: 'before'},
  //{title: 'After Text', value: 'after'},
];
const GRID_SIZE = [
  {title: '2 columns for text 2 column for image', value: 'grid-cols-2'},
  {title: '3 columns for text 1 column for image', value: 'grid-cols-3'},
];

export const textWithIllustrationType = defineType({
  name: 'textWithIllustration',
  type: 'object',
  title: 'Text with Illustration',
  icon: BsJournalRichtext,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: {list: POSITION},
    }),
    defineField({
      name: 'gridSize',
      type: 'string',
      options: {list: GRID_SIZE},
    }),
  ],
})