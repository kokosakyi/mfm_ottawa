import type { Metadata } from 'next'
import React from 'react'
import { GivingHelper } from '@/components/GivingHelper'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Give / Donate — MFM Ottawa',
}

interface DonatePageProps {
  searchParams?: Promise<{ lang?: string }>
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const params = searchParams ? await searchParams : {}
  const isFr = params?.lang === 'fr'

  const payload = await getPayloadClient()
  const [settings, homePage] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'home-page' }),
  ])

  const donateInfo = settings.donatePage || {}
  const donateSection = homePage.donateSection || {}
  const canadaHelpsUrl =
    donateInfo.canadaHelpsUrl ||
    'https://www.canadahelps.org/en/charities/mountain-of-fire-and-miracles-ministries-ottawa/'
  const eTransferEmail = donateInfo.eTransferEmail || 'mfmottawam@gmail.com'

  const heading = isFr
    ? donateSection.headingFr || 'Dons & Offrandes'
    : donateSection.heading || 'Give'

  const scriptureText = isFr
    ? donateSection.scriptureTextFr ||
      'Celui qui fournit de la semence au semeur, et du pain pour sa nourriture, vous fournira et vous multipliera la semence...'
    : donateSection.scriptureText ||
      'He who supplies seed to the sower and bread for food will supply and multiply your seed for sowing and increase the harvest of your righteousness. You will be enriched in every way to be generous in every way, which through us will produce thanksgiving to God.'

  const scriptureVerse = isFr
    ? donateSection.scriptureVerseFr || '2 Corinthiens 9:10-11'
    : donateSection.scriptureVerse || '2 Corinthians 9:10-11 ESV'

  return (
    <div className="content">
      <section className="mfm-donate" style={{ padding: '2rem 0' }}>
        <img
          src={donateSection.seedlingIconUrl || '/assets/home/seedling.png'}
          alt="Seedling"
          width={150}
          height={150}
        />
        <div className="donate-message">
          <h1 className="give">{heading}</h1>
          <div className="text">{scriptureText}</div>
          <div className="verse">{scriptureVerse}</div>
        </div>
      </section>

      <GivingHelper
        eTransferEmail={eTransferEmail}
        canadaHelpsUrl={canadaHelpsUrl}
        canadaHelpsPageId={donateInfo.canadaHelpsPageId || '65255'}
        isFr={isFr}
      />
    </div>
  )
}
