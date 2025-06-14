import {defineField, defineType} from 'sanity'
import { GiShop } from "react-icons/gi";

export const locationsType = defineType({
  name: 'locations',
  title: 'Locations',
  type: 'document',
  icon: GiShop,
  groups: [
    {
      name: 'openingHours',
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "city",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "address",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "postalCode",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: "email",
            invert: false,
          }
        ),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone Number",
    }),
    defineField({
      name: "menu",
      type: 'reference',
      to: [{ type: 'dishesMenu' }],
    }),
    defineField({
      name: "monday",
      type: 'duration',
      group: 'openingHours',
    }),
    defineField({
      name: "tuesday",
      type: 'duration',
      group: 'openingHours',
    }),
    defineField({
      name: "wednesday",
      type: 'duration',
      group: 'openingHours',
    }),
    defineField({
      name: "thursday",
      type: 'duration',
      group: 'openingHours',
    }),
    defineField({
      name: "friday",
      type: 'duration',
      group: 'openingHours',
    }),
    defineField({
      name: "saturday",
      type: 'duration',
      group: 'openingHours',
    }),
    defineField({
      name: "sunday",
      type: 'duration',
      group: 'openingHours',
    }),
  ]
});