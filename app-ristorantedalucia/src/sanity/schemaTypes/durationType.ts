import {defineField, defineType} from 'sanity'
import { TbCalendarTime } from "react-icons/tb";

export const durationType = defineType({
  name: 'duration',
  title: 'Duration',
  type: 'object',
  icon: TbCalendarTime,
  fields: [
    defineField({
      name: 'morningStart',
      type: 'timeValue',
    }),
    defineField({
      name: 'morningEnd',
      type: 'timeValue',
    }),
    defineField({
      name: 'eveningStart',
      type: 'timeValue',
    }),
    defineField({
      name: 'eveningEnd',
      type: 'timeValue',
    }),
    defineField({
      name: 'closed',
      type: 'boolean',
    }),
  ],
  // make the fields render next to each other
  options: {columns: 5},
})