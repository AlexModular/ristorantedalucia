import React from 'react'
import { defineType, defineArrayMember } from 'sanity'
import { ImageIcon } from '@sanity/icons'

// Assicurati di aver installato react-icons (npm i react-icons)
// oppure sostituisci queste icone con altre a tua scelta.
import {
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify
} from 'react-icons/md'
import style from 'styled-jsx/style'

/**
 * Componente personalizzato per mostrare l'allineamento 
 * direttamente nell'editor di Sanity Studio.
 * Usiamo uno span con display: block per evitare conflitti con l'editor.
 */
const TextAlignRender = ({ children, value }: any) => 
  React.createElement(
    'span', 
    { style: { display: 'block', textAlign: value, width: '100%' } }, 
    children
  );

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          // --- INIZIO ALLINEAMENTI CUSTOM ---
          {
            title: 'Align Left',
            value: 'left',
            icon: MdFormatAlignLeft,
            component: TextAlignRender,
          },
          {
            title: 'Align Center',
            value: 'center',
            icon: MdFormatAlignCenter,
            component: TextAlignRender,
          },
          {
            title: 'Align Right',
            value: 'right',
            icon: MdFormatAlignRight,
            component: TextAlignRender,
          },
          {
            title: 'Justify',
            value: 'justify',
            icon: MdFormatAlignJustify,
            component: TextAlignRender,
          },
          // --- FINE ALLINEAMENTI CUSTOM ---
        ],
        // Annotations can be any object structure
        annotations: [
          { name: 'color', title: 'Color', type: 'color' },
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // Image type
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
  ],
})