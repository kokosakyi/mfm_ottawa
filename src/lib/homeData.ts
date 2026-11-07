import type { HeroSlideItem } from '@/components/HeroSlider'
import { getPayloadClient, resolveMediaUrl } from './payload'
import { fetchDailyVersesNet } from './dailyVerses'

export async function fetchHomeViewProps(locale: 'en' | 'fr') {
  const payload = await getPayloadClient()

  const [slidesResult, homePage] = await Promise.all([
    payload.find({
      collection: 'hero-slides',
      where: {
        and: [
          { locale: { equals: locale } },
          { active: { equals: true } },
        ],
      },
      sort: 'order',
      limit: 20,
    }),
    payload.findGlobal({
      slug: 'home-page',
    }),
  ])

  const slides: HeroSlideItem[] = slidesResult.docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    imageSrc: resolveMediaUrl(doc.image, doc.imageUrl),
    altText: doc.altText,
    linkUrl: doc.linkUrl,
  }))

  const go = homePage.leadershipSection?.generalOverseer
  const ro = homePage.leadershipSection?.regionalOverseer
  const liveVerse = await fetchDailyVersesNet()
  const customVerse = homePage.verseOfTheDay

  // Check if CMS has a custom overridden verse or if it's the default seeded placeholder
  const isDefaultPlaceholder =
    !customVerse?.verseText ||
    customVerse.verseText.includes('Do I take any pleasure in the death')

  const verseText = isDefaultPlaceholder
    ? liveVerse.textEn
    : customVerse.verseText
  const verseTextFr = isDefaultPlaceholder
    ? liveVerse.textFr
    : customVerse.verseTextFr || liveVerse.textFr
  const reference = isDefaultPlaceholder
    ? liveVerse.referenceEn
    : customVerse.reference || liveVerse.referenceEn
  const referenceFr = isDefaultPlaceholder
    ? liveVerse.referenceFr
    : customVerse.referenceFr || liveVerse.referenceFr
  const referenceUrl = isDefaultPlaceholder
    ? liveVerse.referenceUrl
    : customVerse.referenceUrl || liveVerse.referenceUrl

  return {
    locale,
    slides,
    visitorStrip: {
      serviceName: homePage.visitorStrip?.serviceName || 'Sunday Service',
      serviceNameFr:
        homePage.visitorStrip?.serviceNameFr || 'Culte du dimanche',
      serviceTime:
        homePage.visitorStrip?.serviceTime || '10:00 AM — In-Person & Online',
      serviceTimeFr:
        homePage.visitorStrip?.serviceTimeFr ||
        '10h00 — En personne et en ligne',
      sanctuaryLabel:
        homePage.visitorStrip?.sanctuaryLabel || 'Sanctuary Location',
      sanctuaryLabelFr:
        homePage.visitorStrip?.sanctuaryLabelFr || 'Notre sanctuaire',
      sanctuaryAddress:
        homePage.visitorStrip?.sanctuaryAddress ||
        '2723 Lancaster Rd, Suite 101, Ottawa',
      watchLiveUrl:
        homePage.visitorStrip?.watchLiveUrl ||
        'https://www.youtube.com/@mfmottawalive4271/streams',
      directionsUrl:
        homePage.visitorStrip?.directionsUrl ||
        'https://www.google.com/maps/search/?api=1&query=2723+Lancaster+Road+Suite+101+Ottawa+ON+K1B+0B1',
    },
    donateSection: homePage.donateSection || {},
    leadershipSection: {
      generalOverseer: {
        name: go?.name || 'Dr. D. K. Olukoya',
        title: go?.title || '(General Overseer, MFM Worldwide)',
        spouseName: go?.spouseName || 'Pastor (Mrs.) Shade Olukoya',
        imageSrc: resolveMediaUrl(
          go?.image,
          go?.imageUrl && go.imageUrl !== '/assets/home/gen_overseer.jpg'
            ? go.imageUrl
            : '/assets/home/dr_olukoya_and_wife.jpeg',
        ),
      },
      regionalOverseer: {
        name: ro?.name || 'Pastor Titus Babalola',
        title: ro?.title || '(Regional Overseer, Canada Region 4)',
        spouseName: ro?.spouseName || 'Pastor (Mrs.) Bola Babalola',
        imageSrc: resolveMediaUrl(
          ro?.image,
          ro?.imageUrl || '/assets/home/head_pastor_and_wife.jpg',
        ),
      },
      quotes: (homePage.leadershipSection?.quotes || []).map((q) => ({
        id: q.id,
        quote: q.quote,
        attribution: q.attribution,
        quoteFr: q.quoteFr,
        attributionFr: q.attributionFr,
      })),
    },
    verseOfTheDay: {
      heading: customVerse?.heading || liveVerse.headingEn,
      headingFr: customVerse?.headingFr || liveVerse.headingFr,
      verseText,
      verseTextFr,
      reference,
      referenceFr,
      referenceUrl,
    },
    visitSection: homePage.visitSection || {},
  }
}
