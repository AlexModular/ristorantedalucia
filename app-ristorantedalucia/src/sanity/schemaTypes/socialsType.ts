import {defineField, defineType} from 'sanity'
import { SlSocialInstagram  } from "react-icons/sl";

export const socialsType = defineType({
  name: 'socials',
  title: 'Socials',
  type: 'document',
  icon: SlSocialInstagram,
  fields: [
    defineField({
      type: "array",
      name: "socials",
      of: [{ type: "social" }],
    })
  ]
});