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
    {
      name: 'recurrence',
      type: 'group',
      label: 'Recurrence / Repeating Schedule',
      fields: [
        {
          name: 'isRecurring',
          type: 'checkbox',
          label: 'Is this a recurring event?',
          defaultValue: false,
        },
        {
          name: 'pattern',
          type: 'select',
          label: 'Recurrence Pattern',
          defaultValue: 'weekly',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.isRecurring),
          },
          options: [
            { label: 'Weekly (Every X week on selected day)', value: 'weekly' },
            { label: 'Bi-Weekly (Every 2 weeks)', value: 'biweekly' },
            { label: 'Monthly on a Specific Weekday (e.g. 1st Saturday of every month)', value: 'monthly_nth_day' },
            { label: 'Monthly on a Specific Day of Month (e.g. 1st of every month)', value: 'monthly_day_of_month' },
          ],
        },
        {
          name: 'dayOfWeek',
          type: 'select',
          label: 'Day of Week',
          defaultValue: '0',
          admin: {
            condition: (_data, siblingData) =>
              Boolean(siblingData?.isRecurring) &&
              (siblingData?.pattern === 'weekly' ||
                siblingData?.pattern === 'biweekly' ||
                siblingData?.pattern === 'monthly_nth_day'),
          },
          options: [
            { label: 'Sunday', value: '0' },
            { label: 'Monday', value: '1' },
            { label: 'Tuesday', value: '2' },
            { label: 'Wednesday', value: '3' },
            { label: 'Thursday', value: '4' },
            { label: 'Friday', value: '5' },
            { label: 'Saturday', value: '6' },
          ],
        },
        {
          name: 'nthWeek',
          type: 'select',
          label: 'Which Occurrence in Month',
          defaultValue: '1',
          admin: {
            condition: (_data, siblingData) =>
              Boolean(siblingData?.isRecurring) && siblingData?.pattern === 'monthly_nth_day',
          },
          options: [
            { label: '1st', value: '1' },
            { label: '2nd', value: '2' },
            { label: '3rd', value: '3' },
            { label: '4th', value: '4' },
            { label: 'Last', value: 'last' },
          ],
        },
        {
          name: 'recurrenceEndDate',
          type: 'date',
          label: 'Repeat Until (Leave empty for indefinite)',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.isRecurring),
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
      ],
    },
  ],
}
