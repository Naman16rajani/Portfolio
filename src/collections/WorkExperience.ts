import type { CollectionConfig } from 'payload'

export const WorkExperience: CollectionConfig = {
  slug: 'work-experience',
  admin: {
    useAsTitle: 'role',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'richText',
      required: true,
    },
    {
      name: 'JoiningDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'desc',
      type: 'richText',
      required: true,
    },
  ],
}
