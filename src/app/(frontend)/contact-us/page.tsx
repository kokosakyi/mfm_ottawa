import type { Metadata } from 'next'
import React from 'react'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
}

interface ContactUsPageProps {
  searchParams: Promise<{
    subject?: string
    message?: string
    book?: string
  }>
}

export default async function ContactUsPage({
  searchParams,
}: ContactUsPageProps) {
  const params = await searchParams
  const defaultSubject =
    params.subject || (params.book ? `Book Request: ${params.book}` : '')
  const defaultMessage =
    params.message ||
    (params.book
      ? `Hello, I would like to request/order "${params.book}". Please let me know the availability and payment details.`
      : '')

  return (
    <div className="content">
      <article>
        <header className="entry-header">
          <h1 className="entry-title">Contact Us</h1>
        </header>

        <div className="entry-content">
          <ContactForm
            defaultSubject={defaultSubject}
            defaultMessage={defaultMessage}
          />
        </div>
      </article>
    </div>
  )
}
