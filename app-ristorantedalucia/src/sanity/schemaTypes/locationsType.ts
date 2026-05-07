import {defineArrayMember, defineField, defineType} from 'sanity'
import { GiShop } from "react-icons/gi";

export const locationsType = defineType({
  name: 'locations',
  title: 'Locations',
  type: 'document',
  icon: GiShop,
  groups: [
    { name: 'info', title: 'Informazioni', default: true },
    { name: 'page', title: 'Pagina Dedicata' },
    { name: 'openingHours', title: 'Orari di Apertura' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── Core info ──────────────────────────────────────────────────────────
    defineField({
      name: 'location',
      type: 'geopoint',
      title: 'Posizione Geografica',
      group: 'info',
    }),
    defineField({
      name: "title",
      type: "localizedString",
      title: "Nome Location",
      group: 'info',
    }),
    defineField({
      name: "city",
      type: "string",
      title: "Città",
      group: 'info',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Indirizzo",
      group: 'info',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "postalCode",
      type: "string",
      title: "CAP",
      group: 'info',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      group: 'info',
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          { name: "email", invert: false }
        ),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Telefono",
      group: 'info',
    }),
    defineField({
      name: "menu",
      type: 'reference',
      title: "Menù associato",
      to: [{ type: 'dishesMenu' }],
      group: 'info',
    }),

    // ─── Pagina dedicata ─────────────────────────────────────────────────────
    defineField({
      name: 'slug',
      title: 'Slug (URL della pagina)',
      description: 'Genera automaticamente dallo slug. Es: bologna-centro → /it/location/bologna-centro',
      type: 'slug',
      group: 'page',
      options: {
        source: 'city',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Immagine Hero',
      description: 'Immagine principale mostrata in cima alla pagina della location',
      type: 'image',
      group: 'page',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      description: 'Testo di presentazione della location',
      type: 'localizedBlockContent',
      group: 'page',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Contenuti aggiuntivi della pagina',
      group: 'page',
      of: [
        defineArrayMember({ name: 'banner', type: 'banner' }),
        defineArrayMember({ name: 'gallery', type: 'gallery' }),
        defineArrayMember({ name: 'textWithIllustration', type: 'textWithIllustration' }),
        defineArrayMember({ name: 'separator', type: 'separator' }),
        defineArrayMember({ name: 'video', type: 'video' }),
        defineArrayMember({ name: 'promotion', type: 'promotion' }),
        defineArrayMember({ name: 'quickActions', type: 'quickActions' }),
      ],
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localizedString',
      group: 'seo',
      description: 'Lasciare vuoto per usare il nome della location',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localizedString',
      group: 'seo',
    }),

    // ─── Orari di apertura ───────────────────────────────────────────────────
    defineField({ name: "monday",    type: 'duration', title: 'Lunedì',    group: 'openingHours' }),
    defineField({ name: "tuesday",   type: 'duration', title: 'Martedì',   group: 'openingHours' }),
    defineField({ name: "wednesday", type: 'duration', title: 'Mercoledì', group: 'openingHours' }),
    defineField({ name: "thursday",  type: 'duration', title: 'Giovedì',   group: 'openingHours' }),
    defineField({ name: "friday",    type: 'duration', title: 'Venerdì',   group: 'openingHours' }),
    defineField({ name: "saturday",  type: 'duration', title: 'Sabato',    group: 'openingHours' }),
    defineField({ name: "sunday",    type: 'duration', title: 'Domenica',  group: 'openingHours' }),
  ],
  preview: {
    select: {
      title: 'title.it',
      city: 'city',
      address: 'address',
    },
    prepare({ title, city, address }: { title?: string; city?: string; address?: string }) {
      return {
        title: title || city || 'Location',
        subtitle: address,
      }
    }
  }
});