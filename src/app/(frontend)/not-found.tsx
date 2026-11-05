import Link from 'next/link'
import React from 'react'

export default function FrontendNotFound() {
  return (
    <div
      className="content"
      style={{ textAlign: 'center', padding: '8rem 2rem' }}
    >
      <h1 className="entry-title">Page Not Found</h1>
      <p style={{ marginBottom: '3rem' }}>
        The page you were looking for could not be found.
      </p>
      <div>
        <Link
          href="/"
          style={{
            backgroundColor: '#8f0f61',
            color: '#fff',
            padding: '1.2rem 2.8rem',
            borderRadius: '1rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
