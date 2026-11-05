import type { Metadata } from 'next'
import React from 'react'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Connect with Us',
}

export default async function ConnectPage() {
  const payload = await getPayloadClient()

  const [connectPage, homePage, branchesResult] = await Promise.all([
    payload.findGlobal({ slug: 'connect-page' }),
    payload.findGlobal({ slug: 'home-page' }),
    payload.find({
      collection: 'branches',
      sort: 'order',
      limit: 50,
    }),
  ])

  const verse = homePage.verseOfTheDay || {}
  const areas = connectPage.areasServed || []

  const canadaEmbedUrl =
    'https://maps.google.com/maps?q=Mountain+of+Fire+and+Miracles+Ministries+Canada&hl=en&z=4&output=embed'

  return (
    <section className="connect-wrapper">
      <h1 className="connect-heading">
        {connectPage.heading || 'Connect with Us'}
      </h1>

      <div className="verse-of-the-day">
        <div className="widget widget_dailyverseswidget">
          <h2 className="widgettitle">
            {verse.heading || 'Bible Verse of the Day'}
          </h2>
          <div className="dailyVerses bibleText">
            {verse.verseText ||
              'Do I take any pleasure in the death of the wicked? declares the Sovereign LORD. Rather, am I not pleased when they turn from their ways and live?'}
          </div>
          <div className="dailyVerses bibleVerse">
            <a
              href={verse.referenceUrl || 'https://dailyverses.net'}
              rel="noopener noreferrer"
              target="_blank"
            >
              {verse.reference || 'Ezekiel 18:23'}
            </a>
          </div>
        </div>
      </div>

      <div className="daily-devotion">
        <h3>{connectPage.devotionalHeading || 'MFM Daily Devotionals'}</h3>
        <div className="devotion-content">
          <img
            src={
              connectPage.devotionalImageUrl ||
              '/assets/connect/Daniel-Olukoya.jpg'
            }
            alt="Dr. Daniel Olukoya"
            loading="lazy"
            width={180}
            height={220}
          />
          <a
            href={connectPage.devotionalUrl || 'https://flatimes.com/mfm/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            {connectPage.devotionalButtonText || 'Continue to Daily Devotional'}
          </a>
        </div>
      </div>

      <div className="audio-messages">
        {connectPage.audioSermonsHeading || 'Audio Sermons'}
      </div>

      <div className="locations-info">
        <h3>{connectPage.areasServedHeading || 'Areas we serve:'}</h3>
        <ul>
          {areas.map((item, idx) => (
            <li key={item.id || idx}>{item.area}</li>
          ))}
        </ul>

        <p>
          {connectPage.branchesIntro ||
            'Not in Ottawa? Find an MFM branch near you.'}
        </p>

        <section className="map-branches">
          <div id="map-all-locations" className="mfm-map-container">
            <iframe
              className="mfm-map-frame"
              title="MFM Canada Branches Map"
              src={canadaEmbedUrl}
            />
          </div>
        </section>

        <h2>{connectPage.branchesHeading || 'MFM HQ & Branches in Canada'}</h2>

        <div className="locations">
          {branchesResult.docs.map((branch) => (
            <div key={branch.id} className="location-info">
              {branch.websiteUrl ? (
                <a
                  href={branch.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{branch.name}</h3>
                </a>
              ) : (
                <h3>{branch.name}</h3>
              )}

              {(branch.addressLines || []).map((addr, idx) => (
                <div key={addr.id || idx}>{addr.line}</div>
              ))}

              {branch.pastors && <div>{branch.pastors}</div>}

              {(branch.emails || []).map((em, idx) => (
                <div key={em.id || idx}>
                  {em.label || 'Email'}: {em.email}
                </div>
              ))}

              {branch.phones && <div>{branch.phones}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
