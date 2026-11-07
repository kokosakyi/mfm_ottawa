import type { GlobalConfig } from 'payload'

export const ConnectPage: GlobalConfig = {
  slug: 'connect-page',
  label: 'Connect Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Connect with Us',
    },
    {
      name: 'devotionalHeading',
      type: 'text',
      defaultValue: 'MFM Daily Devotionals',
    },
    {
      name: 'devotionalImageUrl',
      type: 'text',
      defaultValue: '/assets/connect/Daniel-Olukoya.jpg',
    },
    {
      name: 'devotionalButtonText',
      type: 'text',
      defaultValue: 'Continue to Daily Devotional',
    },
    {
      name: 'devotionalUrl',
      type: 'text',
      defaultValue: 'https://flatimes.com/mfm/',
    },
    {
      name: 'audioSermonsHeading',
      type: 'text',
      defaultValue: 'Audio Sermons',
    },
    {
      name: 'audioSermons',
      type: 'array',
      label: 'Sermons & Audio Messages',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'speaker',
          type: 'text',
          defaultValue: 'Dr. D. K. Olukoya',
        },
        { name: 'date', type: 'text' },
        { name: 'audioUrl', type: 'text', label: 'Audio MP3 URL or Stream' },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'YouTube Video or Stream URL',
        },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'areasServedHeading',
      type: 'text',
      defaultValue: 'Areas we serve:',
    },
    {
      name: 'areasServed',
      type: 'array',
      fields: [{ name: 'area', type: 'text', required: true }],
    },
    {
      name: 'branchesIntro',
      type: 'text',
      defaultValue: 'Not in Ottawa? Find an MFM branch near you.',
    },
    {
      name: 'branchesHeading',
      type: 'text',
      defaultValue: 'MFM HQ & Branches in Canada',
    },
  ],
}
