import type { CollectionConfig } from 'payload'

export const Branches: CollectionConfig = {
  slug: 'branches',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phones', 'order'],
    group: 'Church Directory',
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
      name: 'websiteUrl',
      type: 'text',
    },
    {
      name: 'addressLines',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'line',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'pastors',
      type: 'text',
    },
    {
      name: 'emails',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'phones',
      type: 'text',
    },
    {
      name: 'latitude',
      type: 'number',
    },
    {
      name: 'longitude',
      type: 'number',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
    },
  ],
}
