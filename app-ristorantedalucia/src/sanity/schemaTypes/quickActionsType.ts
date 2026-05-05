import { defineArrayMember, defineField, defineType } from 'sanity'
import { Zap } from 'lucide-react'

export const quickActionsType = defineType({
  name: 'quickActions',
  title: 'Quick Actions',
  type: 'object',
  icon: Zap,
  fields: [
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      validation: (rule) => rule.required().min(1).max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Menu (Utensils)', value: 'Utensils' },
                  { title: 'Call (Phone)', value: 'Phone' },
                  { title: 'Book (Calendar)', value: 'Calendar' },
                  { title: 'Info', value: 'Info' },
                  { title: 'Map (MapPin)', value: 'MapPin' },
                  { title: 'Clock', value: 'Clock' },
                  { title: 'Mail', value: 'Mail' },
                  { title: 'Star', value: 'Star' },
                  { title: 'Camera', value: 'Camera' },
                  { title: 'Users', value: 'Users' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
              validation: (rule) => rule.required(),
            }),
            defineField({
                name: 'isPrimary',
                title: 'Primary Style (Dark Background)',
                type: 'boolean',
                initialValue: false
            })
          ],
          preview: {
            select: {
              title: 'label.it',
              subtitle: 'icon',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Unnamed action',
                subtitle: `Icon: ${subtitle}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      actions: 'actions',
    },
    prepare({ actions }) {
      const count = actions?.length || 0
      return {
        title: 'Quick Actions Bar',
        subtitle: `${count} action${count === 1 ? '' : 's'} configured`,
      }
    },
  },
})
