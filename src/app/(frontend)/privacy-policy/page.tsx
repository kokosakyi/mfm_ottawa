import type { Metadata } from 'next'
import React from 'react'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default async function PrivacyPolicyPage() {
  const payload = await getPayloadClient()
  const policy = await payload.findGlobal({ slug: 'privacy-policy-page' })

  const sections = policy.sections || []

  return (
    <div className="content">
      <section className="mfm-privacy-policy">
        <h2>{policy.heading || 'Privacy Policy'}</h2>

        {sections.map((section, idx) => (
          <div key={section.id || idx} className="info">
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
