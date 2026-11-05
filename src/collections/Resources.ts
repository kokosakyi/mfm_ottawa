import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'language', 'fileSizeLabel', 'order'],
    group: 'Content',
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
      name: 'category',
      type: 'select',
      defaultValue: 'pmch',
      options: [
        { label: 'Membership Form', value: 'membership' },
        { label: 'PMCH & Prayer Points', value: 'pmch' },
        { label: 'General Leaflet', value: 'general' },
      ],
    },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a PDF or document file to serve directly from Payload.',
      },
    },
    {
      name: 'externalDownloadUrl',
      type: 'text',
      label: 'Download Link / Fallback URL',
    },
    {
      name: 'fileCountLabel',
      type: 'text',
      defaultValue: '1 file(s)',
    },
    {
      name: 'fileSizeLabel',
      type: 'text',
      required: true,
      defaultValue: '177 KB',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
    },
  ],
}
