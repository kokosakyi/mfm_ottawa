import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { fetchDailyVersesNet } from '@/lib/dailyVerses'

export const metadata: Metadata = {
  title: 'Connect with Us',
}

interface ConnectPageProps {
  searchParams: Promise<{ branchQuery?: string }>
}

export default async function ConnectPage({ searchParams }: ConnectPageProps) {
  const params = await searchParams
  const branchQuery = (params.branchQuery || '').trim().toLowerCase()

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

  const liveVerse = await fetchDailyVersesNet()
  const customVerse = homePage.verseOfTheDay

  const isDefaultPlaceholder =
    !customVerse?.verseText ||
    customVerse.verseText.includes('Do I take any pleasure in the death')

  const verseHeading = customVerse?.heading || liveVerse.headingEn
  const verseText = isDefaultPlaceholder
    ? liveVerse.textEn
    : customVerse.verseText
  const verseRef = isDefaultPlaceholder
    ? liveVerse.referenceEn
    : customVerse.reference || liveVerse.referenceEn
  const verseUrl = isDefaultPlaceholder
    ? liveVerse.referenceUrl
    : customVerse.referenceUrl || liveVerse.referenceUrl

  const areas = connectPage.areasServed || []
  const sermons = (connectPage as any).audioSermons || []

  const canadaEmbedUrl =
    'https://maps.google.com/maps?q=Mountain+of+Fire+and+Miracles+Ministries+Canada&hl=en&z=4&output=embed'

  const filteredBranches = branchQuery
    ? branchesResult.docs.filter((b) => {
        const nameMatch = b.name.toLowerCase().includes(branchQuery)
        const addrMatch = (b.addressLines || []).some((a) =>
          a.line.toLowerCase().includes(branchQuery),
        )
        const pastorMatch = (b.pastors || '').toLowerCase().includes(branchQuery)
        return nameMatch || addrMatch || pastorMatch
      })
    : branchesResult.docs

  return (
    <section className="connect-wrapper">
      <h1 className="connect-heading">
        {connectPage.heading || 'Connect with Us'}
      </h1>

      <div className="verse-of-the-day">
        <div className="widget widget_dailyverseswidget">
          <h2 className="widgettitle">{verseHeading}</h2>
          <div className="dailyVerses bibleText">{verseText}</div>
          <div className="dailyVerses bibleVerse">
            <a href={verseUrl} rel="noopener noreferrer" target="_blank">
              {verseRef}
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
        <h3 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '1.5rem', color: '#141827' }}>
          {connectPage.audioSermonsHeading || 'Audio Sermons & Messages'}
        </h3>
        {sermons.length === 0 ? (
          <p style={{ fontSize: '1.5rem', color: '#555' }}>
            Listen to powerful recorded messages, deliverance teachings, and weekly sermons. Tune in directly via our{' '}
            <a
              href="https://www.youtube.com/@mfmottawalive4271/streams"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#8f0f61', fontWeight: 700, textDecoration: 'underline' }}
            >
              YouTube Live Stream
            </a>
            .
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '1.5rem',
            }}
          >
            {sermons.map((sermon: any, idx: number) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.8rem',
                  padding: '1.8rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ fontSize: '1.2rem', color: '#888', marginBottom: '0.4rem' }}>
                  {sermon.date || 'Sermon Archive'} • {sermon.speaker || 'MFM Ministry'}
                </div>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#141827', margin: '0 0 0.8rem 0' }}>
                  {sermon.title}
                </h4>
                {sermon.description && (
                  <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.4rem', lineHeight: '1.5' }}>
                    {sermon.description}
                  </p>
                )}
                {sermon.audioUrl && (
                  <div style={{ marginBottom: '1rem' }}>
                    <audio
                      controls
                      src={sermon.audioUrl}
                      style={{ width: '100%', height: '36px' }}
                    >
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                )}
                {sermon.videoUrl && (
                  <a
                    href={sermon.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#8f0f61',
                      color: '#fff',
                      padding: '0.6rem 1.4rem',
                      borderRadius: '0.6rem',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Watch Video Message &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '3rem', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>
            {connectPage.branchesHeading || 'MFM HQ & Branches in Canada'}
          </h2>

          <search>
            <form method="GET" action="/connect" style={{ display: 'flex', gap: '0.8rem' }}>
              <label htmlFor="branch-search" className="sr-only">
                Search branches by city or name
              </label>
              <input
                id="branch-search"
                type="search"
                name="branchQuery"
                defaultValue={branchQuery}
                placeholder="Search city, province, or branch..."
                style={{
                  padding: '0.6rem 1.2rem',
                  fontSize: '1.4rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.6rem',
                  minWidth: '220px',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.6rem 1.4rem',
                  backgroundColor: 'rgb(149, 45, 3)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.6rem',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Filter
              </button>
              {branchQuery && (
                <Link
                  href="/connect"
                  style={{
                    alignSelf: 'center',
                    fontSize: '1.3rem',
                    color: '#666',
                    textDecoration: 'none',
                    padding: '0.4rem 0.6rem',
                  }}
                >
                  Clear
                </Link>
              )}
            </form>
          </search>
        </div>

        {filteredBranches.length === 0 ? (
          <p style={{ fontSize: '1.6rem', color: '#666', padding: '2rem 0' }}>
            No branches matched &ldquo;{branchQuery}&rdquo;. Try another city or{' '}
            <Link href="/connect" style={{ color: 'rgb(149, 45, 3)', fontWeight: 700 }}>
              view all branches
            </Link>
            .
          </p>
        ) : (
          <div className="locations">
            {filteredBranches.map((branch) => (
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
                    {em.label || 'Email'}:{' '}
                    <a href={`mailto:${em.email}`} style={{ color: '#8f0f61' }}>
                      {em.email}
                    </a>
                  </div>
                ))}

                {branch.phones && <div>{branch.phones}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
