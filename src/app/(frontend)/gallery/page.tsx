import type { Metadata } from 'next'
import React from 'react'
import { GalleryGrid, type GalleryPhoto } from '@/components/GalleryGrid'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Gallery',
}

export default async function GalleryPage() {
  const payload = await getPayloadClient()
  const galleryResult = await payload.find({
    collection: 'gallery-items',
    sort: 'order',
    limit: 100,
  })

  const items: GalleryPhoto[] = galleryResult.docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    caption: doc.caption,
    imageSrc: resolveMediaUrl(doc.image, doc.imageUrl),
  }))

  return (
    <div className="content">
      <article>
        <header className="entry-header">
          <h1 className="entry-title">Gallery</h1>
        </header>

        <div className="entry-content">
          <GalleryGrid items={items} />
        </div>
      </article>
    </div>
  )
}
