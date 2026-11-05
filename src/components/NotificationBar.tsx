import React from 'react'

interface NotificationBarProps {
  enabled?: boolean | null
  buttonText: string
  buttonUrl: string
  backgroundColor?: string | null
}

export function NotificationBar({
  enabled = true,
  buttonText,
  buttonUrl,
  backgroundColor = '#8f0f61',
}: NotificationBarProps) {
  if (!enabled) return null

  return (
    <div
      className="easy-notification-bar easy-notification-bar--align_center"
      style={{ '--enb-bg': backgroundColor || '#8f0f61' } as React.CSSProperties}
    >
      <div className="easy-notification-bar-container">
        <div className="easy-notification-bar-button">
          <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  )
}
