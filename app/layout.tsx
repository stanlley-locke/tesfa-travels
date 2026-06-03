import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, DM_Sans, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600", "700", "800", "900"] });
const _dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans-pro" });
const _lora = Lora({ subsets: ["latin"], variable: "--font-serif-alt" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tesfa Travel & Tour - IATA Accredited Travel Agency',
    template: '%s | Tesfa Travels',
  },
  description: 'Professional travel solutions connecting East Africa to the world. IATA-accredited, specializing in flights, visas, corporate travel, and tour packages.',
  generator: 'Next.js',
  keywords: ['travel', 'flights', 'visa', 'IATA', 'Nairobi', 'Kenya', 'East Africa', 'tour packages', 'corporate travel'],
  authors: [{ name: 'Tesfa Travels' }],
  creator: 'Tesfa Travels',
  publisher: 'Tesfa Travels',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: 'Tesfa Travel & Tour - IATA Accredited Travel Agency',
    description: 'Your Journey, Our Priority - Professional Travel Management for East Africa',
    url: siteUrl,
    siteName: 'Tesfa Travels',
    images: [
      {
        url: '/assets/logo.png',
        width: 800,
        height: 600,
        alt: 'Tesfa Travels Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesfa Travel & Tour',
    description: 'Professional travel solutions connecting East Africa to the world.',
    images: ['/assets/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Tesfa Travel & Tour',
  image: `${siteUrl}/assets/logo.png`,
  '@id': siteUrl,
  url: siteUrl,
  telephone: '+254123456789', // Placeholder
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kilimani',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi',
    addressCountry: 'KE'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -1.2921,
    longitude: 36.8219
  },
  sameAs: [
    'https://www.facebook.com/tesfatravels',
    'https://www.instagram.com/tesfatravels'
  ],
  slogan: 'Flying is Our Business, Service is Our Asset'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`bg-background ${_playfair.variable} ${_dmSans.variable} ${_lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
