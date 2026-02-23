import type { CollectionConfig } from 'payload'

export const Resume: CollectionConfig = {
  slug: 'resume',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
