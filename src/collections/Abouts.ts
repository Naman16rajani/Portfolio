import type { CollectionConfig } from 'payload'

export const Abouts: CollectionConfig = {
  slug: 'abouts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'imgUrl',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
