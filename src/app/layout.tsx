import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/lib/config'
import { CREAM, MASK_ICON_COLOR } from '@/lib/brand-mark'
import { DEFAULT_TITLE } from '@/lib/metadata'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Anat Baniel Method',
    'NeuroMovement',
    'Feldenkrais',
    'neuroplasticity',
    'movement lessons',
    'pain relief',
    'Carlsbad CA',
    'Carlsbad 92008',
    'gentle movement',
    'Thoracic Outlet Syndrome',
    'balance',
    'fall prevention',
  ],
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.owner,
  // Fallback for routes without their own metadata (e.g. 404). Pages use pageMetadata()
  // so their social tags and og:url match their own title and path.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: DEFAULT_TITLE,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary',
    title: DEFAULT_TITLE,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// Matches the cream header so Safari's tinted tab bar blends with the site.
export const viewport: Viewport = {
  themeColor: CREAM,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color={MASK_ICON_COLOR} />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Sans+3:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        {/* Plausible Analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="font-body antialiased">
        <Header />
        <main className="min-h-screen pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
