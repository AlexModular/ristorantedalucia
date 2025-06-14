import { defineType } from 'sanity';

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'link' }] }],
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'socialMedia' }] }],
    },
    {
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
    },
  ],
});