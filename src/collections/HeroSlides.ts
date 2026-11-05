import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'locale', 'order', 'active'],
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
      name: 'locale',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        { label: 'English (EN)', value: 'en' },
        { label: 'Français (FR)', value: 'fr' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a custom banner image (1920x700 recommended), or use imageUrl below.',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Fallback / Static Image Path',
      required: true,
    },
    {
      name: 'altText',
      type: 'text',
      required: true,
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Optional Click Destination URL',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
