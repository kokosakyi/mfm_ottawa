import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings & Navigation',
  admin: {
    group: 'Site Configuration',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'MFM Ottawa',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoUrl',
      type: 'text',
      defaultValue: '/assets/brand/Logo_mfm.png',
      required: true,
    },
    {
      name: 'notificationBar',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Join Our Service Online!/Rejoignez notre service en ligne!',
          required: true,
        },
        {
          name: 'buttonUrl',
          type: 'text',
          defaultValue: 'https://www.youtube.com/@mfmottawalive4271/streams',
          required: true,
        },
        {
          name: 'backgroundColor',
          type: 'text',
          defaultValue: '#8f0f61',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'labelFr', type: 'text' },
        { name: 'href', type: 'text', required: true },
        { name: 'showInMobile', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Visit Us' },
        {
          name: 'churchFullName',
          type: 'text',
          defaultValue: 'Mountain of Fire and Miracles Ministries Ottawa',
        },
        { name: 'addressLine1', type: 'text', defaultValue: '2723 Lancaster Road - Suite 101' },
        { name: 'addressLine2', type: 'text', defaultValue: 'Ottawa ON K1B 0B1' },
        { name: 'phone', type: 'text', defaultValue: '(613) 747-1847' },
        { name: 'bookshopPhone', type: 'text', defaultValue: '(+1) (613) 747-1845' },
        { name: 'email', type: 'text', defaultValue: 'mfmottawam@gmail.com' },
        {
          name: 'copyright',
          type: 'text',
          defaultValue: '© 2021 - MFM Ottawa. All rights reserved.',
        },
        { name: 'designerName', type: 'text', defaultValue: 'Conrad Kyei' },
        { name: 'designerUrl', type: 'text', defaultValue: 'http://www.conradkyei.com/home' },
        {
          name: 'socialLinks',
          type: 'group',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              defaultValue:
                'https://www.facebook.com/Mountain-of-Fire-and-Miracles-Ministries-Ottawa-Canada-108159712619614/',
            },
            {
              name: 'youtube',
              type: 'text',
              defaultValue: 'https://www.youtube.com/channel/UC8o1BJSQm9Bk6xyUuDceADg',
            },
            { name: 'twitter', type: 'text', defaultValue: '#' },
            { name: 'instagram', type: 'text', defaultValue: '#' },
          ],
        },
      ],
    },
    {
      name: 'privacyBanner',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'prefixText', type: 'text', defaultValue: 'By using this site, you agree to our ' },
        { name: 'policyLinkText', type: 'text', defaultValue: 'Privacy Policy' },
        { name: 'policyUrl', type: 'text', defaultValue: '/privacy-policy' },
        { name: 'acceptButtonText', type: 'text', defaultValue: 'Accept' },
      ],
    },
    {
      name: 'membershipFormUrl',
      type: 'text',
      label: 'Online Membership Form URL',
      defaultValue:
        'https://docs.google.com/forms/d/1a_y05cJzePeBp6t8NAtR9WlpwjsbWYjHyes0q5AWKc0/viewform',
    },
    {
      name: 'donatePage',
      type: 'group',
      fields: [
        { name: 'canadaHelpsPageId', type: 'text', defaultValue: '65255' },
        {
          name: 'canadaHelpsUrl',
          type: 'text',
          defaultValue:
            'https://www.canadahelps.org/en/charities/mountain-of-fire-and-miracles-ministries-ottawa/',
        },
        { name: 'eTransferEmail', type: 'text', defaultValue: 'mfmottawam@gmail.com' },
      ],
    },
  ],
}
