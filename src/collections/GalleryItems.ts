import type { CollectionConfig } from 'payload'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
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
      name: 'caption',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'sanctuary',
      options: [
        { label: 'Church & Sanctuary', value: 'sanctuary' },
        { label: 'Services & Choir', value: 'services' },
        { label: 'Community & BBQ', value: 'community' },
        { label: 'New Year & Youth', value: 'celebrations' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      required: true,
      label: 'Static Image Path',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
    },
  ],
}
