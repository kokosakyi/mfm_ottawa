import Link from 'next/link'
import React from 'react'
import { HeroSlider, type HeroSlideItem } from './HeroSlider'

interface HomeViewProps {
  locale: 'en' | 'fr'
  slides: HeroSlideItem[]
  donateSection: {
    heading?: string | null
    headingFr?: string | null
    scriptureText?: string | null
    scriptureTextFr?: string | null
    scriptureVerse?: string | null
    scriptureVerseFr?: string | null
    buttonText?: string | null
    buttonTextFr?: string | null
    buttonHref?: string | null
    blessingText?: string | null
    blessingTextFr?: string | null
    seedlingIconUrl?: string | null
  }
  leadershipSection: {
    generalOverseer: {
      name: string
      title: string
      spouseName: string
      imageSrc: string
    }
    regionalOverseer: {
      name: string
      title: string
      spouseName: string
      imageSrc: string
    }
    quotes: Array<{
      id?: string | null
      quote: string
      attribution: string
      quoteFr?: string | null
      attributionFr?: string | null
    }>
  }
  verseOfTheDay: {
    heading?: string | null
    headingFr?: string | null
    verseText?: string | null
    verseTextFr?: string | null
    reference?: string | null
    referenceFr?: string | null
    referenceUrl?: string | null
  }
  visitSection: {
    heading?: string | null
    headingFr?: string | null
    address?: string | null
    addressFr?: string | null
    latitude?: number | null
    longitude?: number | null
  }
}

export function HomeView({
  locale,
  slides,
  donateSection,
  leadershipSection,
  verseOfTheDay,
  visitSection,
}: HomeViewProps) {
  const isFr = locale === 'fr'

  const lat = visitSection.latitude ?? 45.397784
  const lng = visitSection.longitude ?? -75.607384
  const mapEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=${locale}&z=15&output=embed`
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '2723 Lancaster Road Suite 101 Ottawa ON K1B 0B1',
  )}`

  return (
    <>
      <HeroSlider slides={slides} locale={locale} />

      <section className="mfm-donate">
        <img
          src={donateSection.seedlingIconUrl || '/assets/home/seedling.png'}
          alt="Seedling"
          loading="lazy"
          width={150}
          height={150}
        />
        <div className="donate-message">
          <div className="give">
            {isFr
              ? donateSection.headingFr || donateSection.heading
              : donateSection.heading}
          </div>
          <div className="text">
            {isFr
              ? donateSection.scriptureTextFr || donateSection.scriptureText
              : donateSection.scriptureText}
          </div>
          <div className="verse">
            {isFr
              ? donateSection.scriptureVerseFr || donateSection.scriptureVerse
              : donateSection.scriptureVerse}
          </div>
          <div className="tithe-info">
            <span>
              <Link href={donateSection.buttonHref || '/donate'}>
                {isFr
                  ? donateSection.buttonTextFr || donateSection.buttonText
                  : donateSection.buttonText}
              </Link>
            </span>
            <div className="blessings">
              {isFr
                ? donateSection.blessingTextFr || donateSection.blessingText
                : donateSection.blessingText}
            </div>
          </div>
        </div>
      </section>

      <section className="church_message">
        <div className="pastor">
          <img
            src={leadershipSection.generalOverseer.imageSrc}
            alt={leadershipSection.generalOverseer.name}
            loading="lazy"
            width={500}
            height={500}
          />
          <div className="pastor-info">
            <p>{leadershipSection.generalOverseer.name}</p>
            <p className="title">{leadershipSection.generalOverseer.title}</p>
            <p>&amp;</p>
            <p>{leadershipSection.generalOverseer.spouseName}</p>
          </div>
        </div>

        <div className="message_content">
          {leadershipSection.quotes.map((item, idx) => {
            const quoteText =
              isFr && item.quoteFr ? item.quoteFr : item.quote
            const attrText =
              isFr && item.attributionFr
                ? item.attributionFr
                : item.attribution
            return (
              <p key={item.id || idx}>
                {quoteText}
                <span>{attrText}</span>
              </p>
            )
          })}
        </div>

        <div className="pastor">
          <img
            src={leadershipSection.regionalOverseer.imageSrc}
            alt={leadershipSection.regionalOverseer.name}
            loading="lazy"
            width={500}
            height={500}
          />
          <div className="pastor-info">
            <p>{leadershipSection.regionalOverseer.name}</p>
            <p className="title">{leadershipSection.regionalOverseer.title}</p>
            <p>&amp;</p>
            <p>{leadershipSection.regionalOverseer.spouseName}</p>
          </div>
        </div>
      </section>

      <section className="bible-verse-front-page">
        <div className="verse-of-the-day">
          <div className="widget widget_dailyverseswidget">
            <h2 className="widgettitle">
              {isFr
                ? verseOfTheDay.headingFr || verseOfTheDay.heading
                : verseOfTheDay.heading}
            </h2>
            <div className="dailyVerses bibleText">
              {isFr
                ? verseOfTheDay.verseTextFr || verseOfTheDay.verseText
                : verseOfTheDay.verseText}
            </div>
            <div className="dailyVerses bibleVerse">
              <a
                href={verseOfTheDay.referenceUrl || 'https://dailyverses.net'}
                rel="noopener noreferrer"
                target="_blank"
              >
                {isFr
                  ? verseOfTheDay.referenceFr || verseOfTheDay.reference
                  : verseOfTheDay.reference}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="connect_with_us">
        <h1>
          {isFr
            ? visitSection.headingFr || visitSection.heading
            : visitSection.heading}
        </h1>
        <p>
          {isFr
            ? visitSection.addressFr || visitSection.address
            : visitSection.address}
        </p>
      </section>

      <section className="map-branches">
        <div id="map" className="mfm-map-container">
          <div className="mfm-map-card">
            <strong>MFM Ottawa</strong>
            <div>2723 Lancaster Road - Suite 101</div>
            <div>Ottawa, ON K1B 0B1</div>
            <div style={{ marginTop: '0.5rem' }}>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isFr ? 'Itinéraire →' : 'Get Directions →'}
              </a>
            </div>
          </div>
          <iframe
            className="mfm-map-frame"
            title="MFM Ottawa Sanctuary Location Map"
            src={mapEmbedUrl}
          />
        </div>
      </section>
    </>
  )
}
