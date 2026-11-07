import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'

interface SingleBookPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: SingleBookPageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'books',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const book = res.docs[0]
  return {
    title: book ? `${book.title} — Bookshop` : 'Book Not Found',
  }
}

export default async function SingleBookPage({ params }: SingleBookPageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const res = await payload.find({
    collection: 'books',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const book = res.docs[0]
  if (!book) {
    notFound()
  }

  return (
    <article className="mfm-single-book">
      <div className="mfm-single-book-image">
        <img
          src={resolveMediaUrl(book.coverImage, book.coverImageUrl)}
          alt={book.title}
          fetchPriority="high"
          width={300}
          height={440}
        />
      </div>

      <h1 className="book-title">{book.title}</h1>
      <div className="author">Author: {book.author}</div>

      <div
        style={{
          display: 'flex',
          gap: '1.2rem',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <span
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#8f0f61',
          }}
        >
          {(book as any).price || '$15.00 CAD'}
        </span>
        <span
          style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            padding: '0.4rem 1rem',
            borderRadius: '0.6rem',
            backgroundColor:
              (book as any).inStock !== false ? '#e8f5e9' : '#ffebee',
            color:
              (book as any).inStock !== false ? '#2e7d32' : '#c62828',
          }}
        >
          {(book as any).inStock !== false ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="book-description">
        <h3>About This Book</h3>
        <div className="content">
          {book.description ||
            `Available through the MFM Ottawa Bookshop. Contact us with the title "${book.title}" and desired quantity to arrange payment and pickup/delivery, or call (+1) (613) 747-1845.`}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        <Link
          href={`/contact-us?subject=${encodeURIComponent(
            `Book Request: ${book.title}`,
          )}&message=${encodeURIComponent(
            `Hello, I would like to request/order "${book.title}" (Quantity: 1). Please let me know how to arrange payment and pickup/delivery.`,
          )}`}
          style={{
            backgroundColor: 'rgb(149, 45, 3)',
            color: '#fff',
            padding: '1.2rem 2.4rem',
            borderRadius: '1rem',
            fontSize: '1.6rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Request This Book
        </Link>
        <Link
          href="/books"
          style={{
            backgroundColor: '#fff',
            color: 'rgb(149, 45, 3)',
            border: '1px solid rgb(236, 131, 11)',
            padding: '1.2rem 2.4rem',
            borderRadius: '1rem',
            fontSize: '1.6rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          ← Back to Bookshop
        </Link>
      </div>
    </article>
  )
}
