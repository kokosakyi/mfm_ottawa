'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface PrivacyPopupProps {
  enabled?: boolean | null
  prefixText: string
  policyLinkText: string
  policyUrl: string
  acceptButtonText: string
}

const CONSENT_STORAGE_KEY = 'mfm_consent'

export function PrivacyPopup({
  enabled = true,
  prefixText,
  policyLinkText,
  policyUrl,
  acceptButtonText,
}: PrivacyPopupProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    try {
      const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY)
      if (!stored) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [enabled])

  if (!enabled || !visible) return null

  const handleAccept = () => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted')
    } catch {
      // Ignore storage errors in private browsing
    }
    setVisible(false)
  }

  return (
    <div id="privacy-popup" role="region" aria-label="Privacy policy notice">
      <p>
        <span>
          {prefixText}
          <Link href={policyUrl}>{policyLinkText}</Link>.
        </span>
        <button type="button" className="btn-privacy" onClick={handleAccept}>
          {acceptButtonText}
        </button>
      </p>
    </div>
  )
}
