import type { Metadata } from 'next'
import React from 'react'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
}

export default function ContactUsPage() {
  return (
    <div className="content">
      <article>
        <header className="entry-header">
          <h1 className="entry-title">Contact Us</h1>
        </header>

        <div className="entry-content">
          <ContactForm />
        </div>
      </article>
    </div>
  )
}
