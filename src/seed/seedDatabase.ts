import type { Payload } from 'payload'
import {
  SEED_ABOUT_DATA,
  SEED_BOOKS,
  SEED_BRANCHES,
  SEED_EVENTS,
  SEED_GALLERY,
  SEED_HERO_SLIDES,
  SEED_HOME_QUOTES,
  SEED_MINISTRIES,
  SEED_NAVIGATION,
  SEED_PRIVACY_SECTIONS,
  SEED_RESOURCES,
} from './seedData'

let seedingPromise: Promise<void> | null = null

export async function ensureSeeded(payload: Payload): Promise<void> {
  if (seedingPromise) {
    return seedingPromise
  }

  seedingPromise = (async () => {
    try {
      const existingSlides = await payload.count({ collection: 'hero-slides' })
      if (existingSlides.totalDocs > 0) {
        // Ensure any new seed events exist
        try {
          const eventsRes = await payload.find({ collection: 'events', limit: 100 })
          const existingSlugs = new Set(eventsRes.docs.map((e) => e.slug))
          for (const ev of SEED_EVENTS) {
            if (!existingSlugs.has(ev.slug)) {
              await payload.create({ collection: 'events', data: ev })
            }
          }
        } catch {
          // ignore
        }
        return
      }

      payload.logger.info('Seeding MFM Ottawa placeholder content into Payload CMS...')

      // 1. Hero Slides
      for (const slide of SEED_HERO_SLIDES) {
        await payload.create({
          collection: 'hero-slides',
          data: slide,
        })
      }

      // 2. Ministries
      for (const ministry of SEED_MINISTRIES) {
        await payload.create({
          collection: 'ministries',
          data: ministry,
        })
      }

      // 3. Books
      for (const book of SEED_BOOKS) {
        await payload.create({
          collection: 'books',
          data: book,
        })
      }

      // 4. Events
      for (const event of SEED_EVENTS) {
        await payload.create({
          collection: 'events',
          data: event,
        })
      }

      // 5. Gallery Items
      for (const item of SEED_GALLERY) {
        await payload.create({
          collection: 'gallery-items',
          data: item,
        })
      }

      // 6. Resources
      for (const resource of SEED_RESOURCES) {
        await payload.create({
          collection: 'resources',
          data: resource,
        })
      }

      // 7. Branches
      for (const branch of SEED_BRANCHES) {
        await payload.create({
          collection: 'branches',
          data: branch,
        })
      }

      // 8. Site Settings Global
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          siteName: 'MFM Ottawa',
          logoUrl: '/assets/brand/Logo_mfm.png',
          notificationBar: {
            enabled: true,
            buttonText: 'Join Our Service Online!/Rejoignez notre service en ligne!',
            buttonUrl: 'https://www.youtube.com/@mfmottawalive4271/streams',
            backgroundColor: '#8f0f61',
          },
          navigation: SEED_NAVIGATION,
          footer: {
            heading: 'Visit Us',
            churchFullName: 'Mountain of Fire and Miracles Ministries Ottawa',
            addressLine1: '2723 Lancaster Road - Suite 101',
            addressLine2: 'Ottawa ON K1B 0B1',
            phone: '(613) 747-1847',
            bookshopPhone: '(+1) (613) 747-1845',
            email: 'mfmottawam@gmail.com',
            copyright: '© 2021 - MFM Ottawa. All rights reserved.',
            designerName: 'Conrad Kyei',
            designerUrl: 'http://www.conradkyei.com/home',
            socialLinks: {
              facebook:
                'https://www.facebook.com/Mountain-of-Fire-and-Miracles-Ministries-Ottawa-Canada-108159712619614/',
              youtube: 'https://www.youtube.com/channel/UC8o1BJSQm9Bk6xyUuDceADg',
              twitter: '#',
              instagram: '#',
            },
          },
          privacyBanner: {
            enabled: false,
            prefixText: 'By using this site, you agree to our ',
            policyLinkText: 'Privacy Policy',
            policyUrl: '/privacy-policy',
            acceptButtonText: 'Accept',
          },
          donatePage: {
            canadaHelpsPageId: '65255',
            canadaHelpsUrl:
              'https://www.canadahelps.org/en/charities/mountain-of-fire-and-miracles-ministries-ottawa/',
            eTransferEmail: 'mfmottawam@gmail.com',
          },
        },
      })

      // 9. Home Page Global
      await payload.updateGlobal({
        slug: 'home-page',
        data: {
          visitorStrip: {
            serviceName: 'Sunday Service',
            serviceNameFr: 'Culte du dimanche',
            serviceTime: '10:00 AM — In-Person & Online',
            serviceTimeFr: '10h00 — En personne et en ligne',
            sanctuaryLabel: 'Sanctuary Location',
            sanctuaryLabelFr: 'Notre sanctuaire',
            sanctuaryAddress: '2723 Lancaster Rd, Suite 101, Ottawa',
            watchLiveUrl: 'https://www.youtube.com/@mfmottawalive4271/streams',
            directionsUrl:
              'https://www.google.com/maps/search/?api=1&query=2723+Lancaster+Road+Suite+101+Ottawa+ON+K1B+0B1',
          },
          donateSection: {
            heading: 'Give',
            headingFr: 'DONS',
            scriptureText:
              'He who supplies seed to the sower and bread for food will supply and multiply your seed for sowing and increase the harvest of your righteousness. You will be enriched in every way to be generous in every way, which through us will produce thanksgiving to God.',
            scriptureTextFr:
              'Celui qui Fournit de la semence au semeur, Et du pain pour sa nourriture, vous fournira et vous multipliera la semence, et il augmentera les fruits de votre justice. Vous serez de la sorte enrichis à tous égards pour toute espèce de libéralités qui, par notre moyen, feront offrir à Dieu des actions de grâces.',
            scriptureVerse: '2 Corinthians 9:10-11 ESV',
            scriptureVerseFr: '2 Corinthiens 9:10-11',
            buttonText: 'Donate',
            buttonTextFr: 'Faire un don',
            buttonHref: '/donate',
            blessingText: 'God bless you!',
            blessingTextFr: 'Que Dieu vous bénisse!',
            seedlingIconUrl: '/assets/home/seedling.png',
          },
          leadershipSection: {
            generalOverseer: {
              name: 'Dr. D. K. Olukoya',
              title: '(General Overseer, MFM Worldwide)',
              spouseName: 'Pastor (Mrs.) Shade Olukoya',
              imageUrl: '/assets/home/dr_olukoya_and_wife.jpeg',
            },
            regionalOverseer: {
              name: 'Pastor Titus Babalola',
              title: '(Regional Overseer, Canada Region 4)',
              spouseName: 'Pastor (Mrs.) Bola Babalola',
              imageUrl: '/assets/home/head_pastor_and_wife.jpg',
            },
            quotes: SEED_HOME_QUOTES,
          },
          verseOfTheDay: {
            heading: 'Bible Verse of the Day',
            headingFr: 'Verset biblique du jour',
            verseText:
              'Do I take any pleasure in the death of the wicked? declares the Sovereign LORD. Rather, am I not pleased when they turn from their ways and live?',
            verseTextFr:
              "Est-ce que je prends plaisir à voir le méchant mourir? déclare le Seigneur, l'Eternel. N'est-ce pas plutôt à le voir changer de conduite et vivre?",
            reference: 'Ezekiel 18:23',
            referenceFr: 'Ézéchiel 18:23',
            referenceUrl: 'https://dailyverses.net',
          },
          visitSection: {
            heading: 'Come Visit Us',
            headingFr: 'Soyez des nôtres',
            address: '2723 Lancaster Road - Suite 101',
            addressFr: '2723, Chemin Lancaster - Suite 101',
            latitude: 45.397784,
            longitude: -75.607384,
          },
        },
      })

      // 10. About Page Global
      await payload.updateGlobal({
        slug: 'about-page',
        data: SEED_ABOUT_DATA,
      })

      // 11. Connect Page Global
      await payload.updateGlobal({
        slug: 'connect-page',
        data: {
          heading: 'Connect with Us',
          devotionalHeading: 'MFM Daily Devotionals',
          devotionalImageUrl: '/assets/connect/Daniel-Olukoya.jpg',
          devotionalButtonText: 'Continue to Daily Devotional',
          devotionalUrl: 'https://flatimes.com/mfm/',
          audioSermonsHeading: 'Audio Sermons',
          audioSermons: [
            {
              title: 'Connecting to the God of Breakthroughs',
              speaker: 'Dr. D. K. Olukoya',
              date: 'PMCH Service',
              videoUrl: 'https://www.youtube.com/@mfmottawalive4271/streams',
              description:
                'Powerful apostolic teaching and prophetic prayers to break stubborn yokes and release divine blessings.',
            },
            {
              title: 'Walking in Holiness and Supernatural Victory',
              speaker: 'Pastor Titus Babalola',
              date: 'Sunday Service',
              videoUrl: 'https://www.youtube.com/@mfmottawalive4271/streams',
              description:
                'Biblical foundation on holiness, warfare prayer eagles, and spiritual authority in Christ.',
            },
          ],
          areasServedHeading: 'Areas we serve:',
          areasServed: [
            { area: 'Ottawa East' },
            { area: 'Ottawa West' },
            { area: 'Ottawa South' },
            { area: 'Vanier' },
            { area: 'Gatineau' },
          ],
          branchesIntro: 'Not in Ottawa? Find an MFM branch near you.',
          branchesHeading: 'MFM HQ & Branches in Canada',
        },
      })

      // 12. Privacy Policy Global
      await payload.updateGlobal({
        slug: 'privacy-policy-page',
        data: {
          heading: 'Privacy Policy',
          sections: SEED_PRIVACY_SECTIONS,
        },
      })

      payload.logger.info('Successfully seeded MFM Ottawa content into Payload CMS!')
    } catch (error) {
      payload.logger.error({ err: error }, 'Error seeding MFM Ottawa database')
    }
  })()

  return seedingPromise
}
