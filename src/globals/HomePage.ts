import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page Content',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'covidScreening',
      type: 'group',
      label: 'Sanctuary Screening / Announcement Card',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'topMessage',
          type: 'textarea',
          defaultValue:
            'The purpose of this Screening Tool is to help you determine whether you should attend in-person services at MFM-Ottawa.',
        },
        {
          name: 'topMessageFr',
          type: 'textarea',
          defaultValue:
            'Le but de cet outil est de vous aider à déterminer, si oui ou non, vous devriez venir assister en présentiel aux cultes aux Ministères de la Montagne de Feu et des Miracles (MFM) à Ottawa.',
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Complete COVID Screening Form',
        },
        {
          name: 'buttonTextFr',
          type: 'text',
          defaultValue: 'REMPLIR LE FORMULAIRE DE DÉPISTAGE DE LA COVID',
        },
        {
          name: 'formUrl',
          type: 'text',
          defaultValue:
            'https://docs.google.com/forms/d/1s_QbVm7udYWRhQV9I0EltwO1yKJ58dEHfPTfBureUzY/edit?usp=sharing',
        },
        {
          name: 'bottomMessage',
          type: 'textarea',
          defaultValue:
            'This tool must be completed prior to entering the MFM-Ottawa Sanctuary. Anyone who does not pass screening must not enter the MFM-Ottawa Sanctuary and should self-isolate, then contact their healthcare provider or Telehealth Ontario at 1-866-797-0000 to find out if they need a COVID-19 test. This tool is subject to change as further guidance from Ottawa Public Health, the Ministry of Health and evidence related to COVID-19 risks becomes available. Please note that masks are mandatory when on the Church premises.',
        },
        {
          name: 'bottomMessageFr',
          type: 'textarea',
          defaultValue:
            "Ce formulaire doit être rempli avant d’entrer dans le sanctuaire au MFM -Ottawa. Toute personne qui présente des symptômes ou qui a échoué à ce dépistage préliminaire ne devrait pas entrer dans le sanctuaire et devrait s’isoler, et ensuite contacter son professionnel de soins de santé ou Télésanté Ontario au 1-866-797-0000 pour savoir si elle a besoin d'un test de dépistage du COVID-19. Cet outil est susceptible de changement au fur et à mesure que de nouvelles directives de la Santé publique Ottawa, du ministère de la Santé et des preuves relatives aux risques du COVID-19 deviennent disponibles. Veuillez noter que le port du masque est obligatoire dans les locaux de l'église.",
        },
        { name: 'maskIconUrl', type: 'text', defaultValue: '/assets/home/mask.png' },
        { name: 'covidIconUrl', type: 'text', defaultValue: '/assets/home/covid.png' },
      ],
    },
    {
      name: 'donateSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Give' },
        { name: 'headingFr', type: 'text', defaultValue: 'DONS' },
        {
          name: 'scriptureText',
          type: 'textarea',
          defaultValue:
            'He who supplies seed to the sower and bread for food will supply and multiply your seed for sowing and increase the harvest of your righteousness. You will be enriched in every way to be generous in every way, which through us will produce thanksgiving to God.',
        },
        {
          name: 'scriptureTextFr',
          type: 'textarea',
          defaultValue:
            'Celui qui Fournit de la semence au semeur, Et du pain pour sa nourriture, vous fournira et vous multipliera la semence, et il augmentera les fruits de votre justice. Vous serez de la sorte enrichis à tous égards pour toute espèce de libéralités qui, par notre moyen, feront offrir à Dieu des actions de grâces.',
        },
        { name: 'scriptureVerse', type: 'text', defaultValue: '2 Corinthians 9:10-11 ESV' },
        { name: 'scriptureVerseFr', type: 'text', defaultValue: '2 Corinthiens 9:10-11' },
        { name: 'buttonText', type: 'text', defaultValue: 'Donate' },
        { name: 'buttonTextFr', type: 'text', defaultValue: 'Faire un don' },
        { name: 'buttonHref', type: 'text', defaultValue: '/donate' },
        { name: 'blessingText', type: 'text', defaultValue: 'God bless you!' },
        { name: 'blessingTextFr', type: 'text', defaultValue: 'Que Dieu vous bénisse!' },
        { name: 'seedlingIconUrl', type: 'text', defaultValue: '/assets/home/seedling.png' },
      ],
    },
    {
      name: 'leadershipSection',
      type: 'group',
      fields: [
        {
          name: 'generalOverseer',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', defaultValue: 'Dr. D. K. Olukoya' },
            { name: 'title', type: 'text', defaultValue: '(General Overseer, MFM Worldwide)' },
            { name: 'spouseName', type: 'text', defaultValue: 'Pastor (Mrs.) Shade Olukoya' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'imageUrl', type: 'text', defaultValue: '/assets/home/gen_overseer.jpg' },
          ],
        },
        {
          name: 'regionalOverseer',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', defaultValue: 'Pastor Titus Babalola' },
            { name: 'title', type: 'text', defaultValue: '(Regional Overseer, Canada Region 4)' },
            { name: 'spouseName', type: 'text', defaultValue: 'Pastor (Mrs.) Bola Babalola' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'imageUrl',
              type: 'text',
              defaultValue: '/assets/home/head_pastor_and_wife.jpg',
            },
          ],
        },
        {
          name: 'quotes',
          type: 'array',
          fields: [
            { name: 'quote', type: 'textarea', required: true },
            { name: 'attribution', type: 'text', required: true },
            { name: 'quoteFr', type: 'textarea' },
            { name: 'attributionFr', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'verseOfTheDay',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Bible Verse of the Day' },
        { name: 'headingFr', type: 'text', defaultValue: 'Verset biblique du jour' },
        {
          name: 'verseText',
          type: 'textarea',
          defaultValue:
            'Do I take any pleasure in the death of the wicked? declares the Sovereign LORD. Rather, am I not pleased when they turn from their ways and live?',
        },
        {
          name: 'verseTextFr',
          type: 'textarea',
          defaultValue:
            "Est-ce que je prends plaisir à voir le méchant mourir? déclare le Seigneur, l'Eternel. N'est-ce pas plutôt à le voir changer de conduite et vivre?",
        },
        { name: 'reference', type: 'text', defaultValue: 'Ezekiel 18:23' },
        { name: 'referenceFr', type: 'text', defaultValue: 'Ézéchiel 18:23' },
        { name: 'referenceUrl', type: 'text', defaultValue: 'https://dailyverses.net' },
      ],
    },
    {
      name: 'visitSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Come Visit Us' },
        { name: 'headingFr', type: 'text', defaultValue: 'Soyez des nôtres' },
        { name: 'address', type: 'text', defaultValue: '2723 Lancaster Road - Suite 101' },
        { name: 'addressFr', type: 'text', defaultValue: '2723, Chemin Lancaster - Suite 101' },
        { name: 'latitude', type: 'number', defaultValue: 45.397784 },
        { name: 'longitude', type: 'number', defaultValue: -75.607384 },
      ],
    },
  ],
}
