'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

export interface NavItem {
  id?: string | null
  label: string
  labelFr?: string | null
  href: string
  showInMobile?: boolean | null
}

interface SiteHeaderProps {
  siteName: string
  logoUrl: string
  navigation: NavItem[]
}

export function SiteHeader({ siteName, logoUrl, navigation }: SiteHeaderProps) {
  const pathname = usePathname() || '/'
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const isFrench =
    pathname === '/accueil' ||
    pathname.startsWith('/accueil/') ||
    pathname === '/donnez'
  const isHomeHeader = pathname === '/' || pathname === '/home' || isFrench

  let enHref = '/'
  let frHref = '/accueil'

  if (pathname === '/donate' || pathname === '/donnez') {
    enHref = '/donate'
    frHref = '/donnez'
  } else if (pathname === '/about-us') {
    enHref = '/about-us'
    frHref = '/about-us?lang=fr'
  } else if (pathname === '/books') {
    enHref = '/books?lang=en'
    frHref = '/books?lang=fr'
  }

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const mainEl = document.getElementById('main-content')
    if (mobileOpen) {
      mainEl?.setAttribute('inert', '')
      closeBtnRef.current?.focus()
    } else {
      mainEl?.removeAttribute('inert')
    }
    return () => {
      mainEl?.removeAttribute('inert')
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        toggleBtnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const mobileItems = navigation.filter((item) => item.showInMobile !== false)

  return (
    <header className={isHomeHeader ? 'home-header' : 'pages-header'}>
      <div className="language-select" aria-label="Language switcher">
        <Link href={enHref} aria-current={!isFrench ? 'page' : undefined}>
          EN
        </Link>
        <Link href={frHref} aria-current={isFrench ? 'page' : undefined}>
          FR
        </Link>
      </div>

      <nav className="main-menu" aria-label="Primary">
        <Link href={isFrench ? '/accueil' : '/'} className="logo-link">
          <img
            className="nav-logo"
            src={logoUrl}
            alt={`${siteName} logo`}
            width={100}
            height={100}
          />
        </Link>

        <ul className="horizontal-menu">
          {navigation.map((item) => {
            const targetHref =
              isFrench && item.href === '/' ? '/accueil' : item.href
            const isCurrent =
              pathname === targetHref ||
              (item.href === '/' && pathname === '/home')
            const displayLabel =
              isFrench && item.labelFr ? item.labelFr : item.label

            return (
              <li key={`${item.href}-${item.label}`} className="menu-item">
                <Link
                  href={targetHref}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {displayLabel}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          ref={toggleBtnRef}
          type="button"
          className="menu-toggler"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      <nav
        id="mobile-navigation-drawer"
        className={`mobile-menu${mobileOpen ? ' is-open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!mobileOpen}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="close-button"
          aria-label="Close navigation menu"
          onClick={() => {
            setMobileOpen(false)
            toggleBtnRef.current?.focus()
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <ul className="vertical-menu">
          {mobileItems.map((item) => {
            const targetHref =
              isFrench && item.href === '/' ? '/accueil' : item.href
            const displayLabel =
              isFrench && item.labelFr ? item.labelFr : item.label

            return (
              <li key={`mobile-${item.href}-${item.label}`} className="menu-item">
                <Link
                  href={targetHref}
                  onClick={() => setMobileOpen(false)}
                >
                  {displayLabel}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
