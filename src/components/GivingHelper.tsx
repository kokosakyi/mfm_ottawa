'use client'

import React, { useState } from 'react'

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
  const [designation, setDesignation] = useState('Tithe')
  const [donorName, setDonorName] = useState('')
  const [donorAddress, setDonorAddress] = useState('')

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(eTransferEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const generatedMemo = [
    `Fund: ${designation}`,
    donorName ? `Donor: ${donorName}` : '',
    donorAddress ? `Address: ${donorAddress}` : '',
  ]
    .filter(Boolean)
    .join(' | ')

  const [memoCopied, setMemoCopied] = useState(false)
  const handleCopyMemo = () => {
    navigator.clipboard.writeText(generatedMemo)
    setMemoCopied(true)
    setTimeout(() => setMemoCopied(false), 2500)
  }

  return (
    <div className="donate-methods-grid">
      {/* Interac e-Transfer Card */}
      <div className="donate-method-card">
        <div>
          <h3>{isFr ? 'Virement Interac e-Transfer' : 'Interac e-Transfer'}</h3>
          <p>
            {isFr
              ? 'Envoyez vos dîmes, offrandes, prémices ou dons pour le bâtiment directement par virement Interac à:'
              : 'Send your tithes, offerings, first fruits, or building fund contributions directly by Interac e-Transfer to:'}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '1.2rem',
              marginBottom: '1.5rem',
            }}
          >
            <span className="donation-email">{eTransferEmail}</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              style={{
                backgroundColor: copied ? '#2e7d32' : 'rgb(149, 45, 3)',
                color: '#fff',
                border: 'none',
                padding: '0.8rem 1.4rem',
                borderRadius: '0.6rem',
                fontSize: '1.3rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copied
                ? isFr
                  ? '✓ Courriel copié!'
                  : '✓ Email Copied!'
                : isFr
                  ? 'Copier le courriel'
                  : 'Copy Email'}
            </button>
          </div>

          <div
            style={{
              background: '#fdf8f4',
              border: '1px solid #f3d4be',
              borderRadius: '0.8rem',
              padding: '1.5rem',
              marginTop: '1.5rem',
            }}
          >
            <h4
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'rgb(149, 45, 3)',
                margin: '0 0 1rem 0',
              }}
            >
              {isFr
                ? 'Générateur de message pour le virement :'
                : 'Interactive e-Transfer Memo Helper:'}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label
                  htmlFor="giving-designation"
                  style={{
                    display: 'block',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  {isFr ? 'Affectation du don :' : 'Designation / Purpose:'}
                </label>
                <select
                  id="giving-designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #ccc',
                    fontSize: '1.3rem',
                  }}
                >
                  <option value="Tithe">
                    {isFr ? 'Dîme (Tithe)' : 'Tithe'}
                  </option>
                  <option value="Sunday Offering">
                    {isFr ? 'Offrande du dimanche' : 'Sunday Offering'}
                  </option>
                  <option value="Building Fund">
                    {isFr ? 'Fonds de bâtiment' : 'Building Fund'}
                  </option>
                  <option value="First Fruits">
                    {isFr ? 'Prémices (First Fruits)' : 'First Fruits'}
                  </option>
                  <option value="Thanksgiving Offering">
                    {isFr ? 'Action de grâce' : 'Thanksgiving Offering'}
                  </option>
                  <option value="Welfare / Charity">
                    {isFr ? 'Entraide / Social' : 'Welfare / Charity'}
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="donor-name"
                  style={{
                    display: 'block',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  {isFr ? 'Votre nom complet (pour reçu fiscal) :' : 'Full Name (for tax receipt):'}
                </label>
                <input
                  id="donor-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #ccc',
                    fontSize: '1.3rem',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="donor-address"
                  style={{
                    display: 'block',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  {isFr ? 'Adresse postale (facultative) :' : 'Mailing Address (optional):'}
                </label>
                <input
                  id="donor-address"
                  type="text"
                  placeholder="e.g. 123 Main St, Ottawa, ON"
                  value={donorAddress}
                  onChange={(e) => setDonorAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #ccc',
                    fontSize: '1.3rem',
                  }}
                />
              </div>

              <div
                style={{
                  background: '#fff',
                  padding: '1rem',
                  borderRadius: '0.6rem',
                  border: '1px dashed #ccc',
                  marginTop: '0.5rem',
                }}
              >
                <div style={{ fontSize: '1.1rem', color: '#666', marginBottom: '0.4rem' }}>
                  {isFr
                    ? 'Copiez ce texte dans le champ message de votre virement :'
                    : 'Copy this memo into your bank e-Transfer note box:'}
                </div>
                <code
                  style={{
                    display: 'block',
                    fontSize: '1.3rem',
                    color: '#141827',
                    fontWeight: 600,
                    wordBreak: 'break-all',
                    marginBottom: '0.8rem',
                  }}
                >
                  {generatedMemo}
                </code>
                <button
                  type="button"
                  onClick={handleCopyMemo}
                  style={{
                    backgroundColor: memoCopied ? '#2e7d32' : '#8f0f61',
                    color: '#fff',
                    border: 'none',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '0.4rem',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {memoCopied
                    ? isFr
                      ? '✓ Message copié!'
                      : '✓ Memo Copied!'
                    : isFr
                      ? 'Copier le message'
                      : 'Copy Memo to Clipboard'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CanadaHelps Card */}
      <div className="donate-method-card">
        <div>
          <h3>
            {isFr
              ? 'Don en ligne via CanadaHelps'
              : 'Give Online via CanadaHelps'}
          </h3>
          <p>
            {isFr
              ? `Faites un don sécurisé par carte de crédit, PayPal ou valeurs mobilières par l'entremise de notre organisme de bienfaisance enregistré sur CanadaHelps (ID de l'organisme #${canadaHelpsPageId}). Les reçus fiscaux officiels sont émis instantanément.`
              : `Donate securely by credit card, PayPal, or securities through our registered charity page on CanadaHelps (Charity Page ID #${canadaHelpsPageId}). Official charitable tax receipts are issued automatically.`}
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a
            href={canadaHelpsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="canadahelps-cta"
          >
            {isFr ? 'Faire un don via CanadaHelps →' : 'Donate via CanadaHelps →'}
          </a>
        </div>
      </div>
    </div>
  )
}
