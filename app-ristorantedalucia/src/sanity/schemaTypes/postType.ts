import React from 'react'
import { defineField, defineType } from 'sanity'
import { MdOutlineArticle } from 'react-icons/md'

export const postType = defineType({
  name: 'post',
  title: 'News & Events',
  type: 'document',
  icon: MdOutlineArticle,
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'localizedString',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title.it',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data di pubblicazione',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Eventi', value: 'eventi' },
          { title: 'Premi & Riconoscimenti', value: 'premi' },
          { title: 'Stagionalità & Menu', value: 'stagioni' },
        ],
        layout: 'radio',
      },
      initialValue: 'news',
    }),
    defineField({
      name: 'coverImage',
      title: 'Immagine di copertina',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Estratto',
      description: 'Breve descrizione mostrata nelle card e nei meta tag. Max 200 caratteri.',
      type: 'localizedString',
      group: 'content',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Contenuto',
      type: 'localizedBlockContent',
      group: 'content',
    }),
    // ─── SEO ────────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localizedString',
      group: 'seo',
      description: 'Lasciare vuoto per usare il titolo dell\'articolo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localizedString',
      group: 'seo',
      description: 'Lasciare vuoto per usare l\'estratto',
    }),
  ],
  orderings: [
    {
      title: 'Data di pubblicazione (recente)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.it',
      date: 'publishedAt',
      category: 'category',
      media: 'coverImage',
    },
    prepare({ title, date, category, media }: {
      title?: string;
      date?: string;
      category?: string;
      media?: { asset?: { _ref: string } };
    }) {
      const formatted = date ? new Date(date).toLocaleDateString('it-IT') : '';
      return {
        title: title || 'Articolo senza titolo',
        subtitle: [category, formatted].filter(Boolean).join(' · '),
        media: media as unknown as React.ReactElement,
      }
    }
  },
});
