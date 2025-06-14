import {defineType, defineField} from 'sanity'
import { TbSeparator } from "react-icons/tb";

export const separatorType = defineType({
  name: 'separator',
  title: 'Separator',
  type: 'object',
  icon: TbSeparator,
  fields: [
    defineField({
      name: 'separatorColor',
      title: 'Line Separator color',
      type: 'color',
      initialValue:{
        _type: 'color',
        alpha: 1,
        hex: '#881337',
        source: 'hex',
      }
      //description: 'Leave this field empty for using default separator color'
    })
  ]
});