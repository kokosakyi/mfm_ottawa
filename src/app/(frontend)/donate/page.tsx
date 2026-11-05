import type { Metadata } from 'next'
import React from 'react'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Give / Donate',
}

export default async function DonatePage() {
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
          <h1 className="give">{donateSection.heading || 'Give'}</h1>
          <div className="text">
            {donateSection.scriptureText ||
              'He who supplies seed to the sower and bread for food will supply and multiply your seed for sowing and increase the harvest of your righteousness. You will be enriched in every way to be generous in every way, which through us will produce thanksgiving to God.'}
          </div>
          <div className="verse">
            {donateSection.scriptureVerse || '2 Corinthians 9:10-11 ESV'}
          </div>
        </div>
      </section>

      <div className="donate-methods-grid">
        <div className="donate-method-card">
          <div>
            <h3>Interac e-Transfer</h3>
            <p>
              Send your tithes, offerings, first fruits, or building fund
              contributions directly by Interac e-Transfer to:
            </p>
            <p style={{ marginTop: '1rem', fontSize: '2rem' }}>
              <span className="donation-email">{eTransferEmail}</span>
            </p>
            <p style={{ marginTop: '1rem', fontSize: '1.5rem', color: '#555' }}>
              Please include your full name, mailing address (for tax receipts),
              and the offering designation in the e-Transfer message box.
            </p>
          </div>
        </div>

        <div className="donate-method-card">
          <div>
            <h3>Give Online via CanadaHelps</h3>
            <p>
              Donate securely by credit card, PayPal, or securities through our
              registered charity page on CanadaHelps (Charity Page ID #
              {donateInfo.canadaHelpsPageId || '65255'}). Official charitable
              tax receipts are issued automatically.
            </p>
          </div>
          <a
            href={canadaHelpsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="canadahelps-cta"
          >
            Donate via CanadaHelps
          </a>
        </div>
      </div>
    </div>
  )
}
