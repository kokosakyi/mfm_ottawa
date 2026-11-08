'use client'

import React, { useState } from 'react'
import { CanadaHelpsEmbed } from './CanadaHelpsEmbed'

interface GivingHelperProps {
  eTransferEmail: string
  canadaHelpsUrl: string
  canadaHelpsPageId?: string
  isFr?: boolean
}

export function GivingHelper({
  eTransferEmail,
  canadaHelpsUrl,
  canadaHelpsPageId = '65255',
  isFr = false,
}: GivingHelperProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(eTransferEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="donate-wrapper" style={{ maxWidth: '112rem', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
      {/* Interac e-Transfer Card */}
      <div
        className="donate-etransfer-card"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fffbf7 100%)',
          borderRadius: '1.2rem',
          padding: '2.5rem',
          border: '1px solid rgba(143, 15, 97, 0.15)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}
      >
        <div>
          <h3
            style={{
              color: '#8f0f61',
              fontSize: '2.2rem',
              fontWeight: 800,
              margin: 0,
            }}
          >
            {isFr ? 'Virement Interac e-Transfer' : 'Interac e-Transfer'}
          </h3>
        </div>

        <p style={{ fontSize: '1.5rem', color: '#444', margin: 0, lineHeight: 1.6 }}>
          {isFr
            ? 'Pour envoyer vos dîmes, offrandes ou dons par virement automatique Interac, utilisez simplement notre adresse courriel dédiée :'
            : 'To send your tithes, offerings, or contributions via Interac e-Transfer from your Canadian banking app, simply send to:'}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            flexWrap: 'wrap',
            background: '#faf5f0',
            padding: '1.2rem 1.6rem',
            borderRadius: '0.8rem',
            border: '1px solid #eed8ca',
            width: 'fit-content',
            maxWidth: '100%',
          }}
        >
          <span
            className="donation-email"
            style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#8d1601',
              letterSpacing: '0.02em',
              wordBreak: 'break-all',
            }}
          >
            {eTransferEmail}
          </span>
          <button
            type="button"
            onClick={handleCopyEmail}
            style={{
              backgroundColor: copied ? '#2e7d32' : '#8d1601',
              color: '#fff',
              border: 'none',
              padding: '0.7rem 1.4rem',
              borderRadius: '0.6rem',
              fontSize: '1.3rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease, transform 0.1s ease',
            }}
          >
            {copied
              ? isFr
                ? '✓ Courriel copié !'
                : '✓ Email Copied!'
              : isFr
                ? 'Copier le courriel'
                : 'Copy Email'}
          </button>
        </div>

        <p style={{ fontSize: '1.3rem', color: '#666', margin: 0, fontStyle: 'italic' }}>
          {isFr
            ? 'Note : Précisez votre nom complet et le motif (ex: Dîme, Offrande, Bâtiment) dans le message du virement pour vos reçus.'
            : 'Tip: Please include your full name and designation (e.g. Tithe, Offering, Building) in the transfer note for proper record keeping.'}
        </p>
      </div>

      {/* Embedded CanadaHelps Donation Section */}
      <div
        className="donate-online-card"
        style={{
          background: '#ffffff',
          borderRadius: '1.2rem',
          padding: '2.5rem',
          border: '1px solid rgba(143, 15, 97, 0.15)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h3
            style={{
              color: '#8f0f61',
              fontSize: '2.2rem',
              fontWeight: 800,
              marginBottom: '0.8rem',
            }}
          >
            {isFr
              ? 'Don en ligne par carte de crédit ou PayPal (CanadaHelps)'
              : 'Donate Online via Credit Card or PayPal (CanadaHelps)'}
          </h3>
          <p style={{ fontSize: '1.5rem', color: '#555', margin: 0, lineHeight: 1.6 }}>
            {isFr
              ? 'Remplissez le formulaire sécurisé ci-dessous. Un reçu fiscal officiel vous sera automatiquement émis par courriel par CanadaHelps.'
              : 'Complete the secure donation form below. An official charitable tax receipt will be issued to your email immediately by CanadaHelps.'}
          </p>
        </div>

        {/* Embedded Form Component */}
        <CanadaHelpsEmbed
          pageId={canadaHelpsPageId}
          language={isFr ? 'fr' : 'en'}
        />

        {/* Fallback direct link in case external scripts are blocked by user browser extensions */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #eee',
            fontSize: '1.3rem',
            color: '#777',
            textAlign: 'center',
          }}
        >
          {isFr ? 'Le formulaire ne se charge pas ? ' : 'Form not loading? '}
          <a
            href={canadaHelpsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#8f0f61', fontWeight: 700, textDecoration: 'underline' }}
          >
            {isFr
              ? 'Accédez directement à la page de don sur CanadaHelps →'
              : 'Open the donation page directly on CanadaHelps →'}
          </a>
        </div>
      </div>
    </div>
  )
}
