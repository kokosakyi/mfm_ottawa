import type { GlobalConfig } from 'payload'

export const PrivacyPolicyPage: GlobalConfig = {
  slug: 'privacy-policy-page',
  label: 'Privacy Policy Page',
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
      defaultValue: 'Privacy Policy',
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea', required: true },
      ],
    },
  ],
}
