import {defineField, defineType} from 'sanity'
import { FiLink } from "react-icons/fi";

export const linkType = defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  icon: FiLink,
  fields: [
    defineField({
      title: 'Internal Link',
      name: 'internalLink',
      description: 'Select pages or locations for navigation',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'locations' }],
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description:"Use fully qualified URLS for external link",
      type: 'url',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      description: 'Enter phone number (e.g. +39061234567). It will be prefixed with tel:',
      type: 'string',
    }),
    defineField({
      name: 'isBookingWidget',
      title: 'Open Booking Widget (Overrides Link)',
      description: 'Check this box to trigger the Booking Widget (e.g. Quandoo/TheFork) instead of navigating to the link.',
      type: 'boolean',
      initialValue: false,
    }),
  ]
});