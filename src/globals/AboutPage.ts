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
      name: 'headingFr',
      type: 'text',
      defaultValue: 'À propos de nous',
    },
    {
      name: 'paragraphs',
      type: 'array',
      fields: [
        { name: 'text', type: 'textarea', required: true },
        { name: 'textFr', type: 'textarea' },
      ],
    },
    {
      name: 'ministriesHeading',
      type: 'text',
      defaultValue: 'Ministries & Departments',
    },
    {
      name: 'ministriesHeadingFr',
      type: 'text',
      defaultValue: 'Ministères et départements',
    },
    {
      name: 'beliefsHeading',
      type: 'text',
      defaultValue: 'What We Believe',
    },
    {
      name: 'beliefsHeadingFr',
      type: 'text',
      defaultValue: 'Ce que nous croyons',
    },
    {
      name: 'beliefs',
      type: 'array',
      fields: [
        { name: 'item', type: 'textarea', required: true },
        { name: 'itemFr', type: 'textarea' },
      ],
    },
    {
      name: 'missionHeading',
      type: 'text',
      defaultValue: 'Our Mission + Vision',
    },
    {
      name: 'missionHeadingFr',
      type: 'text',
      defaultValue: 'Notre mission et vision',
    },
    {
      name: 'missions',
      type: 'array',
      fields: [
        { name: 'item', type: 'textarea', required: true },
        { name: 'itemFr', type: 'textarea' },
      ],
    },
  ],
}
