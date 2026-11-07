import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Books — MFM Ottawa Bookshop',
}

interface BooksPageProps {
  searchParams: Promise<{ q?: string; page?: string; lang?: string }>
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams
  const query = (params.q || '').trim()
  const lang = params.lang === 'fr' ? 'fr' : params.lang === 'en' ? 'en' : 'all'
  const currentPage = Math.max(1, Number.parseInt(params.page || '1', 10) || 1)
  const perPage = 24

  const payload = await getPayloadClient()

  const andClauses: any[] = []

  if (query) {
    andClauses.push({
      or: [
        { title: { like: query } },
        { author: { like: query } },
      ],
    })
  }

  if (lang !== 'all') {
    andClauses.push({
      or: [
        { language: { equals: lang } },
        { language: { equals: 'bilingual' } },
      ],
    })
  }

  const booksResult = await payload.find({
    collection: 'books',
    where: andClauses.length > 0 ? { and: andClauses } : undefined,
    sort: 'order',
    page: currentPage,
    limit: perPage,
  })

  const buildFilterUrl = (targetLang: string) => {
    const p = new URLSearchParams()
    if (query) p.set('q', query)
    if (targetLang !== 'all') p.set('lang', targetLang)
    const str = p.toString()
    return str ? `/books?${str}` : '/books'
  }

  return (
    <>
      <div className="book-search-wrapper">
        <h1 className="books-header">
          MFM Ottawa Bookshop / Librairie d&apos;Ottawa-MFM
        </h1>
        <p className="info">
          Found the book you were looking for?{' '}
          <Link href="/contact-us">Contact Us</Link> with the title of the
          book(s) and quantity(ies) to arrange payment and delivery. Didn&apos;t
          find what you were looking for?{' '}
          <Link href="/contact-us">Ask Us</Link> when we&apos;ll be getting it
          in stock. In a hurry? Call Us at (+1) (613) 747-1845.
        </p>

        <search>
          <form method="GET" action="/books">
            <input type="hidden" name="lang" value={lang} />
            <label htmlFor="book-search-input" className="sr-only">
              Search book title
            </label>
            <input
              id="book-search-input"
              type="search"
              placeholder="Search book title or author"
              name="q"
              defaultValue={query}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <button type="submit">Search</button>
            <Link href="/books" className="btn-reset-books">
              Reset
            </Link>
          </form>
        </search>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
          }}
          aria-label="Filter books by language"
        >
          <Link
            href={buildFilterUrl('all')}
            style={{
              padding: '0.8rem 1.6rem',
              borderRadius: '2rem',
              fontSize: '1.4rem',
              fontWeight: 700,
              textDecoration: 'none',
              backgroundColor: lang === 'all' ? 'rgb(149, 45, 3)' : '#f0f0f0',
              color: lang === 'all' ? '#fff' : '#444',
            }}
          >
            All Books
          </Link>
          <Link
            href={buildFilterUrl('en')}
            style={{
              padding: '0.8rem 1.6rem',
              borderRadius: '2rem',
              fontSize: '1.4rem',
              fontWeight: 700,
              textDecoration: 'none',
              backgroundColor: lang === 'en' ? 'rgb(149, 45, 3)' : '#f0f0f0',
              color: lang === 'en' ? '#fff' : '#444',
            }}
          >
            English Books (EN)
          </Link>
          <Link
            href={buildFilterUrl('fr')}
            style={{
              padding: '0.8rem 1.6rem',
              borderRadius: '2rem',
              fontSize: '1.4rem',
              fontWeight: 700,
              textDecoration: 'none',
              backgroundColor: lang === 'fr' ? 'rgb(149, 45, 3)' : '#f0f0f0',
              color: lang === 'fr' ? '#fff' : '#444',
            }}
          >
            Livres en français (FR)
          </Link>
        </div>
      </div>

      {booksResult.docs.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            fontSize: '1.8rem',
          }}
        >
          No books found matching your criteria.{' '}
          <Link href="/books" style={{ color: 'rgb(149, 45, 3)', fontWeight: 700 }}>
            View all books
          </Link>
          .
        </div>
      ) : (
        <section className="books">
          {booksResult.docs.map((book: any, idx) => (
            <article key={book.id} className="book">
              <div className="book-image">
                <Link href={`/books/${book.slug}`}>
                  <img
                    src={resolveMediaUrl(book.coverImage, book.coverImageUrl)}
                    alt={book.title}
                    loading={idx < 4 ? undefined : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : undefined}
                    width={200}
                    height={290}
                  />
                </Link>
              </div>
              <div className="book-info">
                <Link href={`/books/${book.slug}`}>
                  <h3 className="book-title">{book.title}</h3>
                </Link>
                <div className="author">Author: {book.author}</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.8rem',
                    fontSize: '1.3rem',
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#8f0f61' }}>
                    {book.price || '$15.00 CAD'}
                  </span>
                  <span
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '0.4rem',
                      backgroundColor:
                        book.inStock !== false ? '#e8f5e9' : '#ffebee',
                      color:
                        book.inStock !== false ? '#2e7d32' : '#c62828',
                    }}
                  >
                    {book.inStock !== false ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {booksResult.totalPages > 1 && (
        <nav className="pagination" aria-label="Books pagination">
          {Array.from({ length: booksResult.totalPages }, (_, i) => i + 1).map(
            (pageNum) => {
              const p = new URLSearchParams()
              if (query) p.set('q', query)
              if (lang !== 'all') p.set('lang', lang)
              p.set('page', String(pageNum))
              const href = `/books?${p.toString()}`

              return pageNum === currentPage ? (
                <span
                  key={pageNum}
                  aria-current="page"
                  className="page-numbers current"
                >
                  {pageNum}
                </span>
              ) : (
                <Link key={pageNum} href={href} className="page-numbers">
                  {pageNum}
                </Link>
              )
            },
          )}
        </nav>
      )}
    </>
  )
}
