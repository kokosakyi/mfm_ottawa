'use client'

import React, { useEffect, useRef } from 'react'

interface CanadaHelpsEmbedProps {
  pageId?: string
  language?: string
}

export function CanadaHelpsEmbed({
  pageId = '65255',
  language = 'en',
}: CanadaHelpsEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clean up any existing instances/elements in case of Fast Refresh or re-renders
    container.innerHTML = ''
    const existingScript = document.getElementById('ch_cdn_embed')
    if (existingScript) {
      existingScript.remove()
    }

    // Create the CanadaHelps script element
    const script = document.createElement('script')
    script.id = 'ch_cdn_embed'
    script.type = 'text/javascript'
    script.src = 'https://www.canadahelps.org/secure/js/cdf_embed.js'
    script.charset = 'utf-8'
    script.setAttribute('data-language', language === 'fr' ? 'fr' : 'en')
    script.setAttribute('data-page-id', pageId)
    script.setAttribute('data-root-url', 'https://www.canadahelps.org')
    script.setAttribute('data-formtype', '0')
    script.setAttribute('data-cfasync', 'false')

    container.appendChild(script)

    return () => {
      if (container) {
        container.innerHTML = ''
      }
      const s = document.getElementById('ch_cdn_embed')
      if (s) {
        s.remove()
      }
    }
  }, [pageId, language])

  return (
    <div
      ref={containerRef}
      className="canadahelps-embed-container"
      style={{
        width: '100%',
        minHeight: '650px',
        position: 'relative',
      }}
    />
  )
}
