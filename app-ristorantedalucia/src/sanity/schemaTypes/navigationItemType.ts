import {defineArrayMember, defineField, defineType} from 'sanity'
import { GrNavigate } from "react-icons/gr";

export const navigationItemType = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  icon: GrNavigate,
  fields: [
    defineField({
      name: "text",
      type: "localizedString",
      title: "Navigation Text"
    }),
    defineField({
      name: "navigationItemUrl",
      type: "link",
      title: "Navigation Item URL"
    }),
    defineField({
      name: "children",
      title: "Sub-menu Items",
      description: "Se impostato, questo elemento diventa un parent con dropdown/megamenu. Lasciare vuoto per un semplice link.",
      type: "array",
      of: [
        defineArrayMember({
          name: "subItem",
          title: "Sub Item",
          type: "object",
          fields: [
            defineField({ name: "text", type: "localizedString", title: "Label" }),
            defineField({ name: "url", type: "link", title: "Link" }),
            defineField({
              name: "description",
              type: "localizedString",
              title: "Descrizione breve (opzionale)",
              description: "Mostrata sotto la label nel pannello megamenu"
            }),
          ],
          preview: {
            select: { title: 'text.it' },
            prepare: ({ title }: { title?: string }) => ({ title: title || 'Sub Item' })
          }
        })
      ]
    }),
    defineField({
      name: "megamenuImage",
      title: "Immagine Megamenu",
      description: "Immagine decorativa opzionale mostrata nel pannello megamenu accanto ai link",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "megamenuLabel",
      title: "Titolo Pannello Megamenu",
      description: "Heading opzionale mostrato sopra i sub-link nel pannello megamenu",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      title: 'text.it',
      children: 'children',
    },
    prepare({ title, children }: { title?: string; children?: unknown[] }) {
      return {
        title: title || 'Navigation Item',
        subtitle: children?.length ? `↳ ${children.length} sotto-voce/i` : undefined,
      }
    }
  }
});