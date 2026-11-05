import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Books — MFM Ottawa Bookshop',
}

interface BooksPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams
  const query = (params.q || '').trim()
  const currentPage = Math.max(1, Number.parseInt(params.page || '1', 10) || 1)
  const perPage = 24

  const payload = await getPayloadClient()

  const booksResult = await payload.find({
    collection: 'books',
    where: query
      ? {
          or: [
            { title: { like: query } },
            { author: { like: query } },
          ],
        }
      : undefined,
    sort: 'order',
    page: currentPage,
    limit: perPage,
  })

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
            <label htmlFor="book-search-input" className="sr-only">
              Search book title
            </label>
            <input
              id="book-search-input"
              type="search"
              placeholder="Search book title"
              name="q"
              defaultValue={query}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <button type="submit">Search</button>
            <Link href="/books" className="btn-reset-books">
              All Books
            </Link>
          </form>
        </search>
      </div>

      {booksResult.docs.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            fontSize: '1.8rem',
          }}
        >
          No books matched &ldquo;{query}&rdquo;.{' '}
          <Link href="/books" style={{ color: 'rgb(149, 45, 3)', fontWeight: 700 }}>
            View all books
          </Link>
          .
        </div>
      ) : (
        <section className="books">
          {booksResult.docs.map((book, idx) => (
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
              </div>
            </article>
          ))}
        </section>
      )}

      {booksResult.totalPages > 1 && (
        <nav className="pagination" aria-label="Books pagination">
          {Array.from({ length: booksResult.totalPages }, (_, i) => i + 1).map(
            (pageNum) => {
              const href = query
                ? `/books?q=${encodeURIComponent(query)}&page=${pageNum}`
                : `/books?page=${pageNum}`
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
