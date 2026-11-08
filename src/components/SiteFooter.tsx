import Link from 'next/link'
import React from 'react'

interface SiteFooterProps {
  heading: string
  churchFullName: string
  addressLine1: string
  addressLine2: string
  phone: string
  copyright: string
  designerName: string
  designerUrl: string
  privacyPolicyText?: string
  privacyPolicyUrl?: string
  socialLinks: {
    facebook?: string | null
    youtube?: string | null
    twitter?: string | null
    instagram?: string | null
  }
}

export function SiteFooter({
  heading,
  churchFullName,
  addressLine1,
  addressLine2,
  phone,
  copyright,
  designerName,
  designerUrl,
  privacyPolicyText = 'Privacy Policy',
  privacyPolicyUrl = '/privacy-policy',
  socialLinks,
}: SiteFooterProps) {
  const currentYear = new Date().getFullYear()
  const displayCopyright = copyright.replace(/\b20\d{2}\b/, String(currentYear))

  return (
    <footer>
      <div className="social-media">
        <div>
          <a
            className="btn-social btn-facebook"
            target="_blank"
            rel="noopener noreferrer"
            href={socialLinks.facebook || '#'}
            aria-label="MFM Ottawa on Facebook"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>

        <div>
          <a
            className="btn-social btn-youtube"
            target="_blank"
            rel="noopener noreferrer"
            href={socialLinks.youtube || '#'}
            aria-label="MFM Ottawa on YouTube"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </a>
        </div>

        <div>
          <a
            className="btn-social btn-twitter"
            href={socialLinks.twitter || '#'}
            aria-label="MFM Ottawa on Twitter"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
        </div>

        <div>
          <a
            className="btn-social btn-instagram"
            href={socialLinks.instagram || '#'}
            aria-label="MFM Ottawa on Instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>

      <div className="address">
        <p>{heading}</p>
        <div>
          <p>{churchFullName}</p>
          <p>{addressLine1}</p>
          <p>{addressLine2}</p>
          <p>{phone}</p>
        </div>

        <p className="copy-right">{displayCopyright}</p>

        <div className="footer-privacy-policy">
          <Link href={privacyPolicyUrl}>{privacyPolicyText}</Link>
        </div>

        <div className="footer-meta-links">
          <span>
            Designed by{' '}
            <a href={designerUrl} target="_blank" rel="noopener noreferrer">
              {designerName}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
