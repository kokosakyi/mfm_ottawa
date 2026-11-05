'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

export interface HeroSlideItem {
  id: string | number
  title: string
  imageSrc: string
  altText: string
  linkUrl?: string | null
}

interface HeroSliderProps {
  slides: HeroSlideItem[]
  locale?: 'en' | 'fr'
}

export function HeroSlider({ slides, locale = 'en' }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const count = slides.length

  const goNext = useCallback(() => {
    if (count <= 1) return
    setActiveIndex((prev) => (prev + 1) % count)
  }, [count])

  const goPrev = useCallback(() => {
    if (count <= 1) return
    setActiveIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  useEffect(() => {
    if (count <= 1 || isPaused) return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const timer = window.setInterval(goNext, 6000)
    return () => window.clearInterval(timer)
  }, [count, isPaused, goNext])

  if (count === 0) return null

  return (
    <section
      className="mfm-hero-slider"
      aria-roledescription="carousel"
      aria-label={
        locale === 'fr'
          ? 'Bannières principales MFM Ottawa'
          : 'MFM Ottawa featured announcements'
      }
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="mfm-hero-slides">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex
          const isFirst = index === 0
          const imgElement = (
            <img
              src={slide.imageSrc}
              alt={slide.altText}
              width={1920}
              height={700}
              fetchPriority={isFirst ? 'high' : 'low'}
              loading={isFirst ? undefined : 'lazy'}
              decoding={isFirst ? 'sync' : 'async'}
            />
          )

          return (
            <div
              key={slide.id}
              className={`mfm-hero-slide${isActive ? ' is-active' : ''}`}
              aria-hidden={!isActive}
            >
              {slide.linkUrl ? (
                slide.linkUrl.startsWith('http') ? (
                  <a
                    href={slide.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isActive ? 0 : -1}
                  >
                    {imgElement}
                  </a>
                ) : (
                  <Link href={slide.linkUrl} tabIndex={isActive ? 0 : -1}>
                    {imgElement}
                  </Link>
                )
              ) : (
                imgElement
              )}
            </div>
          )
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="mfm-hero-arrow mfm-hero-arrow--prev"
            aria-label={locale === 'fr' ? 'Diapositive précédente' : 'Previous slide'}
            onClick={goPrev}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M11.433 15.992L22.69 5.712c.393-.39.393-1.03 0-1.42-.393-.39-1.03-.39-1.423 0l-11.98 10.94c-.21.21-.3.49-.285.76-.015.28.075.56.284.77l11.98 10.94c.393.39 1.03.39 1.424 0 .393-.4.393-1.03 0-1.42l-11.257-10.29"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </button>

          <button
            type="button"
            className="mfm-hero-arrow mfm-hero-arrow--next"
            aria-label={locale === 'fr' ? 'Diapositive suivante' : 'Next slide'}
            onClick={goNext}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M10.722 4.293c-.394-.39-1.032-.39-1.427 0-.393.39-.393 1.03 0 1.42l11.283 10.28-11.283 10.29c-.393.39-.393 1.02 0 1.42.395.39 1.033.39 1.427 0l12.007-10.94c.21-.21.3-.49.284-.77.014-.27-.076-.55-.286-.76L10.72 4.293z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </button>

          <div
            className="mfm-hero-bullets"
            role="group"
            aria-label={
              locale === 'fr'
                ? 'Choisir une diapositive'
                : 'Choose slide to display'
            }
          >
            {slides.map((slide, index) => (
              <button
                key={`bullet-${slide.id}`}
                type="button"
                className={`mfm-hero-bullet${index === activeIndex ? ' is-active' : ''}`}
                aria-label={`${locale === 'fr' ? 'Diapositive' : 'Slide'} ${index + 1}: ${slide.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
