import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { site } from '@/lib/content'
import { Atmosphere } from '@/components/ui/atmosphere'
import { MotionProvider } from '@/components/motion-provider'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Orca's own description, from the live site.
const description = site.intro

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Orca Trial',
    template: '%s · Orca Trial',
  },
  description,
  keywords: [
    'clinical trials',
    'site network',
    'study startup',
    'CRO',
    'sponsor',
    'principal investigators',
    'clinical research',
  ],
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: 'Orca Trial',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orca Trial',
    description,
  },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.png' },
}

export const viewport: Viewport = {
  themeColor: '#03080f',
  colorScheme: 'dark',
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1931 Cordova Rd, Unit #2122',
    addressLocality: 'Fort Lauderdale',
    addressRegion: 'FL',
    postalCode: '33316',
    addressCountry: 'US',
  },
  openingHours: 'Mo-Fr 06:00-22:00',
  areaServed: 'United States',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sora.variable + ' ' + inter.variable}>
      <head>
        {/* Scroll-reveal animations render their initial (hidden) state during
            SSR. Without JS those styles would never resolve, so force every
            animated element visible for no-JS visitors and text-mode crawlers. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-blue-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-abyss"
        >
          Skip to content
        </a>
        <Atmosphere />
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  )
}
