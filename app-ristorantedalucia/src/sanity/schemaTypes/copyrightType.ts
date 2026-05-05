import {defineField, defineType} from 'sanity'
import { FaCopyright  } from "react-icons/fa";

export const copyrightType = defineType({
  name: 'copyright',
  title: 'Footer Copyright',
  type: 'document',
  icon: FaCopyright,
  fields: [
    defineField({
      type: "localizedBlockContent",
      name: "content"
    })
  ]
});