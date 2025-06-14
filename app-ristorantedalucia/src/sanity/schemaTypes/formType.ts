
import {defineField, defineType} from 'sanity'
import { SiGoogleforms } from "react-icons/si";

export const formType = defineType({
  name: 'form',
  type: 'object',
  icon: SiGoogleforms,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'form',
      type: 'string',
      description: 'Select form type',
      options: {
        list: ['newsletter', 'register', 'contact'],
      },
    }),
  ],
})