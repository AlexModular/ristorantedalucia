import {defineField, defineType} from 'sanity'
import { AiOutlineVideoCamera } from "react-icons/ai";

export const videoType = defineType({
  name: 'video',
  type: 'object',
  icon: AiOutlineVideoCamera,
  fields: [
    defineField({
      name: 'videoLabel',
      type: 'string',
      title: 'Video Label'
    }),
    defineField({
      name: 'cssClasses',
      type: 'string'
    }),
    defineField({
      name: 'file',
      type: 'file',
      title: 'Video File',
    }),
  ],
})