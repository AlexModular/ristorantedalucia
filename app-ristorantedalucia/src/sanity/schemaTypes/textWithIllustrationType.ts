import {defineField, defineType} from 'sanity'
import { BsJournalRichtext } from "react-icons/bs";

const POSITION = [
  {title: 'Left', value: 'left'},
  {title: 'Right', value: 'right'},
  {title: 'Top', value: 'top'},
  {title: 'Bottom', value: 'bottom'},
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
      type: 'localizedString',
    }),
    defineField({
      name: 'text',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'backgroundFixed',
      title: 'Fixed Background (Parallax)',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.backgroundImage,
    }),
    defineField({
      name: 'hasOverlay',
      title: 'Show Overlay',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'overlayColor',
      title: 'Overlay Color',
      type: 'string',
      options: {
        list: [
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
        ],
      },
      initialValue: 'dark',
      hidden: ({ parent }) => !parent?.hasOverlay,
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