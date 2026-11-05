import type { Metadata } from 'next'
import React from 'react'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Resources',
}

export default async function ResourcesPage() {
  const payload = await getPayloadClient()
  const resourcesResult = await payload.find({
    collection: 'resources',
    sort: 'order',
    limit: 100,
  })

  return (
    <div className="content">
      <section className="mfm-info-card">
        <div className="mfm-info-card-text">
          <p>
            Click below to complete fillable form to officially become a member
            of MFM Ottawa or to update details such as a change of address, new
            addition to your family, change of name, etc. Want to use a printed
            copy instead? See downloadable forms below. Send completed
            downloaded forms to mfmottawam@gmail.com.
          </p>
          <a
            className="membership"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/1a_y05cJzePeBp6t8NAtR9WlpwjsbWYjHyes0q5AWKc0/edit"
          >
            Membership Form
          </a>
        </div>
      </section>

      <article>
        <header className="entry-header">
          <h1 className="entry-title">Resources</h1>
        </header>

        <div className="entry-content">
          <p style={{ marginBottom: '2rem' }}>
            Downloadable forms, PMCH &amp; Prayer point leaflets, etc.
          </p>

          {resourcesResult.docs.map((res) => {
            const downloadHref = resolveMediaUrl(
              res.file,
              res.externalDownloadUrl || '/contact-us',
            )
            const isExternal = downloadHref.startsWith('http')

            return (
              <div key={res.id} className="w3eden">
                <div className="card">
                  <div className="media">
                    <div>
                      <img
                        className="wpdm_icon"
                        src="/assets/icons/pdf.svg"
                        alt="PDF document"
                        loading="lazy"
                        width={48}
                        height={48}
                      />
                    </div>

                    <div className="media-body">
                      <h3 className="package-title">
                        <a
                          href={downloadHref}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                        >
                          {res.title}
                        </a>
                      </h3>
                      <div className="text-muted">
                        <span>{res.fileCountLabel || '1 file(s)'}</span>
                        <span>•</span>
                        <span>{res.fileSizeLabel}</span>
                      </div>
                    </div>

                    <div>
                      <a
                        className="btn-primary"
                        href={downloadHref}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </article>
    </div>
  )
}
