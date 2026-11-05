import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'venueName', 'statusType'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'dateTimeDisplay',
      type: 'text',
      required: true,
      label: 'Formatted Date/Time Label',
    },
    {
      name: 'venueName',
      type: 'text',
      required: true,
      defaultValue: 'MFM Ottawa',
    },
    {
      name: 'venueAddress',
      type: 'text',
      required: true,
      defaultValue: '2723 Lancaster Road, Ottawa',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'statusType',
      type: 'select',
      defaultValue: 'past',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past Event', value: 'past' },
      ],
    },
  ],
}
