'use client'

import React, { useRef, useState } from 'react'

export interface GalleryPhoto {
  id: string | number
  title: string
  caption?: string | null
  imageSrc: string
}

interface GalleryGridProps {
  items: GalleryPhoto[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = (index: number) => {
    setSelectedIndex(index)
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal()
    }
  }

  const closeModal = () => {
    dialogRef.current?.close()
    setSelectedIndex(null)
  }

  const goPrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length)
  }

  const goNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % items.length)
  }

  const activePhoto = selectedIndex !== null ? items[selectedIndex] : null

  return (
    <>
      <div className="mfm-gallery-grid">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="mfm-gallery-item"
            onClick={() => openModal(index)}
            aria-label={`View photo: ${item.caption || item.title}`}
          >
            <img
              src={item.imageSrc}
              alt={item.caption || item.title}
              loading={index < 4 ? undefined : 'lazy'}
              width={400}
              height={300}
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="mfm-lightbox"
        aria-label="Gallery photo viewer"
        onClose={() => setSelectedIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeModal()
          }
        }}
      >
        {activePhoto && (
          <div className="mfm-lightbox-inner">
            <img
              src={activePhoto.imageSrc}
              alt={activePhoto.caption || activePhoto.title}
            />
            <div className="mfm-lightbox-bar">
              <span>{activePhoto.caption || activePhoto.title}</span>
              <div className="mfm-lightbox-controls">
                <button
                  type="button"
                  className="mfm-lightbox-btn"
                  onClick={goPrev}
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  className="mfm-lightbox-btn"
                  onClick={goNext}
                >
                  Next →
                </button>
                <button
                  type="button"
                  className="mfm-lightbox-btn"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
