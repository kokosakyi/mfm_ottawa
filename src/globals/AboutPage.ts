import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Us Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroCircles',
      type: 'array',
      label: 'Top Circular Photos (5 items)',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text', required: true },
        { name: 'alt', type: 'text', required: true },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'About Us',
    },
    {
      name: 'paragraphs',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'ministriesHeading',
      type: 'text',
      defaultValue: 'Ministries & Departments',
    },
    {
      name: 'beliefsHeading',
      type: 'text',
      defaultValue: 'What We Believe',
    },
    {
      name: 'beliefs',
      type: 'array',
      fields: [{ name: 'item', type: 'textarea', required: true }],
    },
    {
      name: 'missionHeading',
      type: 'text',
      defaultValue: 'Our Mission + Vision',
    },
    {
      name: 'missions',
      type: 'array',
      fields: [{ name: 'item', type: 'textarea', required: true }],
    },
  ],
}
