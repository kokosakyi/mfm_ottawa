import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Resources',
}

interface ResourcesPageProps {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const params = await searchParams
  const query = (params.q || '').trim()
  const category = params.category || 'all'

  const payload = await getPayloadClient()

  const andClauses: any[] = []

  if (query) {
    andClauses.push({
      or: [
        { title: { like: query } },
        { fileSizeLabel: { like: query } },
      ],
    })
  }

  if (category !== 'all') {
    andClauses.push({
      category: { equals: category },
    })
  }

  const [settings, resourcesResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'resources',
      where: andClauses.length > 0 ? { and: andClauses } : undefined,
      sort: 'order',
      limit: 100,
    }),
  ])

  const membershipUrl =
    (settings as any).membershipFormUrl ||
    'https://docs.google.com/forms/d/1a_y05cJzePeBp6t8NAtR9WlpwjsbWYjHyes0q5AWKc0/viewform'

  const buildCategoryUrl = (cat: string) => {
    const p = new URLSearchParams()
    if (query) p.set('q', query)
    if (cat !== 'all') p.set('category', cat)
    const str = p.toString()
    return str ? `/resources?${str}` : '/resources'
  }

  return (
    <div className="content">
      <section className="mfm-info-card">
        <div className="mfm-info-card-text">
          <p>
            Click below to complete fillable form to officially become a member
            of MFM Ottawa or to update details such as a change of address, new
            addition to your family, change of name, etc. Want to use a printed
            copy instead? See downloadable forms below. Send completed
            downloaded forms to{' '}
            <a href="mailto:mfmottawam@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>
              mfmottawam@gmail.com
            </a>
            .
          </p>
          <a
            className="membership"
            target="_blank"
            rel="noopener noreferrer"
            href={membershipUrl}
          >
            Online Membership Form &rarr;
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

          <search style={{ marginBottom: '2.5rem' }}>
            <form
              method="GET"
              action="/resources"
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                maxWidth: '600px',
              }}
            >
              <input type="hidden" name="category" value={category} />
              <input
                id="resource-search-input"
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search resources & leaflets..."
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  minWidth: '220px',
                  padding: '1rem 1.4rem',
                  fontSize: '1.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.8rem',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'rgb(149, 45, 3)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.8rem',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Search
              </button>
              {(query || category !== 'all') && (
                <Link
                  href="/resources"
                  style={{
                    alignSelf: 'center',
                    fontSize: '1.4rem',
                    color: '#666',
                    textDecoration: 'none',
                    padding: '0.8rem 1rem',
                  }}
                >
                  Clear Filters
                </Link>
              )}
            </form>
          </search>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
            aria-label="Filter resources by category"
          >
            <Link
              href={buildCategoryUrl('all')}
              style={{
                padding: '0.8rem 1.6rem',
                borderRadius: '2rem',
                fontSize: '1.3rem',
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor:
                  category === 'all' ? 'rgb(149, 45, 3)' : '#f0f0f0',
                color: category === 'all' ? '#fff' : '#444',
              }}
            >
              All Resources
            </Link>
            <Link
              href={buildCategoryUrl('pmch')}
              style={{
                padding: '0.8rem 1.6rem',
                borderRadius: '2rem',
                fontSize: '1.3rem',
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor:
                  category === 'pmch' ? 'rgb(149, 45, 3)' : '#f0f0f0',
                color: category === 'pmch' ? '#fff' : '#444',
              }}
            >
              PMCH &amp; Prayer Points
            </Link>
            <Link
              href={buildCategoryUrl('membership')}
              style={{
                padding: '0.8rem 1.6rem',
                borderRadius: '2rem',
                fontSize: '1.3rem',
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor:
                  category === 'membership' ? 'rgb(149, 45, 3)' : '#f0f0f0',
                color: category === 'membership' ? '#fff' : '#444',
              }}
            >
              Membership Forms
            </Link>
            <Link
              href={buildCategoryUrl('general')}
              style={{
                padding: '0.8rem 1.6rem',
                borderRadius: '2rem',
                fontSize: '1.3rem',
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor:
                  category === 'general' ? 'rgb(149, 45, 3)' : '#f0f0f0',
                color: category === 'general' ? '#fff' : '#444',
              }}
            >
              General Leaflets
            </Link>
          </div>

          {resourcesResult.docs.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                fontSize: '1.6rem',
                color: '#666',
              }}
            >
              No downloadable resources matched your search.{' '}
              <Link
                href="/resources"
                style={{ color: 'rgb(149, 45, 3)', fontWeight: 700 }}
              >
                Reset filters
              </Link>
            </div>
          ) : (
            resourcesResult.docs.map((res) => {
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
                          {res.category && (
                            <>
                              <span>•</span>
                              <span style={{ textTransform: 'capitalize' }}>
                                {res.category === 'pmch'
                                  ? 'PMCH'
                                  : res.category}
                              </span>
                            </>
                          )}
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
            })
          )}
        </div>
      </article>
    </div>
  )
}
