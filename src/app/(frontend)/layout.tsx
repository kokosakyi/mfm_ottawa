import type { Metadata } from 'next'
import { Lato, Oswald } from 'next/font/google'
import React from 'react'
import { NotificationBar } from '@/components/NotificationBar'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader, type NavItem } from '@/components/SiteHeader'
import { getPayloadClient, resolveMediaUrl } from '@/lib/payload'
import './mfm-theme.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-oswald',
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'MFM Ottawa — Mountain of Fire and Miracles Ministries Ottawa',
    template: '%s | MFM Ottawa',
  },
  description:
    'Mountain of Fire and Miracles Ministries Ottawa (Canada Region 4) — 2723 Lancaster Road - Suite 101, Ottawa ON K1B 0B1.',
  icons: {
    icon: '/assets/brand/favicon.png',
  },
}

const DEFAULT_NAV: NavItem[] = [
  { label: 'Home', labelFr: 'Accueil', href: '/', showInMobile: true },
  { label: 'About Us', labelFr: 'À propos', href: '/about-us', showInMobile: true },
  { label: 'Books', labelFr: 'Livres', href: '/books', showInMobile: true },
  { label: 'Connect', labelFr: 'Connexion', href: '/connect', showInMobile: true },
  { label: 'Contact Us', labelFr: 'Contactez-nous', href: '/contact-us', showInMobile: false },
  { label: 'Events', labelFr: 'Événements', href: '/events', showInMobile: true },
  { label: 'Gallery', labelFr: 'Galerie', href: '/gallery', showInMobile: true },
  { label: 'Resources', labelFr: 'Ressources', href: '/resources', showInMobile: true },
  { label: 'Give', labelFr: 'Donnez', href: '/donate', showInMobile: true },
]

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  const logoUrl = resolveMediaUrl(
    settings.logo,
    settings.logoUrl || '/assets/brand/Logo_mfm.png',
  )

  const navItems: NavItem[] =
    settings.navigation && settings.navigation.length > 0
      ? settings.navigation
      : DEFAULT_NAV

  return (
    <html
      lang="en"
      className={`mfm-html ${lato.variable} ${oswald.variable}`}
    >
      <body className="mfm-body">
        <a href="#main-content" className="mfm-skip-link">
          Skip to main content
        </a>

        <NotificationBar
          enabled={settings.notificationBar?.enabled ?? true}
          buttonText={
            settings.notificationBar?.buttonText ||
            'Join Our Service Online!/Rejoignez notre service en ligne!'
          }
          buttonUrl={
            settings.notificationBar?.buttonUrl ||
            'https://www.youtube.com/@mfmottawalive4271/streams'
          }
          backgroundColor={
            settings.notificationBar?.backgroundColor || '#8f0f61'
          }
        />

        <div className="wrapper">
          <SiteHeader
            siteName={settings.siteName || 'MFM Ottawa'}
            logoUrl={logoUrl}
            navigation={navItems}
          />

          <main id="main-content">{children}</main>

          <SiteFooter
            heading={settings.footer?.heading || 'Visit Us'}
            churchFullName={
              settings.footer?.churchFullName ||
              'Mountain of Fire and Miracles Ministries Ottawa'
            }
            addressLine1={
              settings.footer?.addressLine1 ||
              '2723 Lancaster Road - Suite 101'
            }
            addressLine2={
              settings.footer?.addressLine2 || 'Ottawa ON K1B 0B1'
            }
            phone={settings.footer?.phone || '(613) 747-1847'}
            copyright={
              settings.footer?.copyright ||
              '© 2021 - MFM Ottawa. All rights reserved.'
            }
            designerName={settings.footer?.designerName || 'Conrad Kyei'}
            designerUrl={
              settings.footer?.designerUrl || 'http://www.conradkyei.com/home'
            }
            privacyPolicyText={
              settings.privacyBanner?.policyLinkText || 'Privacy Policy'
            }
            privacyPolicyUrl={
              settings.privacyBanner?.policyUrl || '/privacy-policy'
            }
            socialLinks={{
              facebook:
                settings.footer?.socialLinks?.facebook ||
                'https://www.facebook.com/Mountain-of-Fire-and-Miracles-Ministries-Ottawa-Canada-108159712619614/',
              youtube:
                settings.footer?.socialLinks?.youtube ||
                'https://www.youtube.com/channel/UC8o1BJSQm9Bk6xyUuDceADg',
              twitter: settings.footer?.socialLinks?.twitter || '#',
              instagram: settings.footer?.socialLinks?.instagram || '#',
            }}
          />
        </div>
      </body>
    </html>
  )
}
