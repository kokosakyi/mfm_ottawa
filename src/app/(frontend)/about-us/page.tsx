import type { Metadata } from 'next'
import React from 'react'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'About Us',
}

export default async function AboutUsPage() {
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
        <h2>{aboutPage.heading || 'About Us'}</h2>
        {paragraphs.map((p, idx) => (
          <div key={p.id || idx}>{p.text}</div>
        ))}
      </section>

      <section className="ministries">
        <h3>{aboutPage.ministriesHeading || 'Ministries & Departments'}</h3>
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
        <h3>{aboutPage.beliefsHeading || 'What We Believe'}</h3>
        <div>
          <ul className="custom-ul">
            {beliefs.map((b, idx) => (
              <li key={b.id || idx}>{b.item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mission-vision">
        <h3>{aboutPage.missionHeading || 'Our Mission + Vision'}</h3>
        <div>
          <ul className="custom-ul">
            {missions.map((m, idx) => (
              <li key={m.id || idx}>{m.item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
