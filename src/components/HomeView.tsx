import Link from 'next/link'
import React from 'react'
import { HeroSlider, type HeroSlideItem } from './HeroSlider'

interface HomeViewProps {
  locale: 'en' | 'fr'
  slides: HeroSlideItem[]
  visitorStrip?: {
    serviceName?: string | null
    serviceNameFr?: string | null
    serviceTime?: string | null
    serviceTimeFr?: string | null
    sanctuaryLabel?: string | null
    sanctuaryLabelFr?: string | null
    sanctuaryAddress?: string | null
    watchLiveUrl?: string | null
    directionsUrl?: string | null
  }
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
  visitorStrip,
  donateSection,
  leadershipSection,
  verseOfTheDay,
  visitSection,
}: HomeViewProps) {
  const isFr = locale === 'fr'

  const lat = visitSection.latitude ?? 45.397784
  const lng = visitSection.longitude ?? -75.607384
  const mapEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=${locale}&z=15&output=embed`

  const activeAddress =
    (isFr ? visitSection.addressFr : visitSection.address) ||
    visitorStrip?.sanctuaryAddress ||
    '2723 Lancaster Road Suite 101 Ottawa ON K1B 0B1'

  const directionsUrl =
    visitorStrip?.directionsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      activeAddress,
    )}`

  const serviceName =
    (isFr ? visitorStrip?.serviceNameFr : visitorStrip?.serviceName) ||
    (isFr ? 'Culte du dimanche' : 'Sunday Service')

  const serviceTime =
    (isFr ? visitorStrip?.serviceTimeFr : visitorStrip?.serviceTime) ||
    (isFr
      ? '10h00 — En personne et en ligne'
      : '10:00 AM — In-Person & Online')

  const sanctuaryLabel =
    (isFr ? visitorStrip?.sanctuaryLabelFr : visitorStrip?.sanctuaryLabel) ||
    (isFr ? 'Notre sanctuaire' : 'Sanctuary Location')

  const sanctuaryAddress =
    visitorStrip?.sanctuaryAddress || activeAddress

  const liveUrl =
    visitorStrip?.watchLiveUrl ||
    'https://www.youtube.com/@mfmottawalive4271/streams'

  return (
    <>
      <HeroSlider slides={slides} locale={locale} />

      <section
        className="mfm-visitor-strip"
        aria-label={isFr ? 'Informations sur les cultes' : 'Service information'}
      >
        <div className="mfm-visitor-strip__inner">
          <div className="mfm-visitor-strip__item">
            <span className="mfm-visitor-strip__label">{serviceName}</span>
            <strong className="mfm-visitor-strip__value">{serviceTime}</strong>
          </div>

          <div className="mfm-visitor-strip__divider" aria-hidden="true" />

          <div className="mfm-visitor-strip__item">
            <span className="mfm-visitor-strip__label">{sanctuaryLabel}</span>
            <strong className="mfm-visitor-strip__value">{sanctuaryAddress}</strong>
          </div>

          <div className="mfm-visitor-strip__actions">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mfm-visitor-strip__btn mfm-visitor-strip__btn--primary"
            >
              {isFr ? 'Itinéraire' : 'Plan a Visit'}
            </a>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mfm-visitor-strip__btn mfm-visitor-strip__btn--outline"
            >
              {isFr ? 'En direct' : 'Watch Live'}
            </a>
          </div>
        </div>
      </section>

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
            <div>{activeAddress}</div>
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
            loading="lazy"
          />
        </div>
      </section>
    </>
  )
}
