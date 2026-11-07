import type { Metadata } from 'next'
import React from 'react'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'About Us',
}

interface AboutUsPageProps {
  searchParams?: Promise<{ lang?: string }>
}

export default async function AboutUsPage({ searchParams }: AboutUsPageProps) {
  const params = searchParams ? await searchParams : {}
  const isFr = params?.lang === 'fr'

  const payload = await getPayloadClient()

  const [aboutPage, ministriesResult] = await Promise.all([
    payload.findGlobal({ slug: 'about-page' }),
    payload.find({
      collection: 'ministries',
      sort: 'order',
      limit: 50,
    }),
  ])

  const circles = aboutPage.heroCircles || []
  const paragraphs = aboutPage.paragraphs || []
  const beliefs = aboutPage.beliefs || []
  const missions = aboutPage.missions || []

  const heading =
    (isFr ? (aboutPage as any).headingFr : aboutPage.heading) || 'About Us'

  const ministriesHeading =
    (isFr
      ? (aboutPage as any).ministriesHeadingFr
      : aboutPage.ministriesHeading) || 'Ministries & Departments'

  const beliefsHeading =
    (isFr ? (aboutPage as any).beliefsHeadingFr : aboutPage.beliefsHeading) ||
    'What We Believe'

  const missionHeading =
    (isFr ? (aboutPage as any).missionHeadingFr : aboutPage.missionHeading) ||
    'Our Mission + Vision'

  return (
    <div className="content">
      {circles.length > 0 && (
        <section className="about-us-images">
          <div>
            {circles.map((circle, idx) => (
              <img
                key={circle.id || idx}
                className={`image-${idx + 1}`}
                src={resolveMediaUrl(circle.image, circle.imageUrl)}
                alt={circle.alt}
                fetchPriority={idx === 2 ? 'high' : undefined}
              />
            ))}
          </div>
        </section>
      )}

      <section className="about-us">
        <h2>{heading}</h2>
        {paragraphs.map((p: any, idx: number) => {
          const text = (isFr && p.textFr) ? p.textFr : p.text
          return <div key={p.id || idx}>{text}</div>
        })}
      </section>

      <section className="ministries">
        <h3>{ministriesHeading}</h3>
        <div className="ministries-list">
          {ministriesResult.docs.map((ministry) => (
            <div key={ministry.id} className="ministry-info">
              <img
                src={resolveMediaUrl(ministry.icon, ministry.iconUrl)}
                alt={ministry.name}
                loading="lazy"
                width={100}
                height={100}
              />
              <p>{ministry.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="believes">
        <h3>{beliefsHeading}</h3>
        <div>
          <ul className="custom-ul">
            {beliefs.map((b: any, idx: number) => {
              const item = (isFr && b.itemFr) ? b.itemFr : b.item
              return <li key={b.id || idx}>{item}</li>
            })}
          </ul>
        </div>
      </section>

      <section className="mission-vision">
        <h3>{missionHeading}</h3>
        <div>
          <ul className="custom-ul">
            {missions.map((m: any, idx: number) => {
              const item = (isFr && m.itemFr) ? m.itemFr : m.item
              return <li key={m.id || idx}>{item}</li>
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}
