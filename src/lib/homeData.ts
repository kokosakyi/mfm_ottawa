import type { HeroSlideItem } from '@/components/HeroSlider'
import { getPayloadClient, resolveMediaUrl } from './payload'

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

  return {
    locale,
    slides,
    donateSection: homePage.donateSection || {},
    leadershipSection: {
      generalOverseer: {
        name: go?.name || 'Dr. D. K. Olukoya',
        title: go?.title || '(General Overseer, MFM Worldwide)',
        spouseName: go?.spouseName || 'Pastor (Mrs.) Shade Olukoya',
        imageSrc: resolveMediaUrl(go?.image, go?.imageUrl || '/assets/home/gen_overseer.jpg'),
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
    verseOfTheDay: homePage.verseOfTheDay || {},
    visitSection: homePage.visitSection || {},
  }
}
