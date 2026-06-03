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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tesfatravels.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tesfa Travel & Tour | IATA Accredited Travel Agency in Nairobi',
    template: '%s | Tesfa Travels',
  },
  description: 'Tesfa Travel & Tour is a leading IATA-accredited travel agency in Nairobi, Kenya. Book flights, arrange visas, hotel reservations, corporate travel and tour packages across East Africa and worldwide.',
  generator: 'Next.js',
  applicationName: 'Tesfa Travels',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Tesfa Travels', 'Tesfa Travel', 'travel agency Nairobi', 'IATA accredited Kenya',
    'flights Kenya', 'visa assistance Nairobi', 'corporate travel Kenya', 'tour packages East Africa',
    'hotel booking Kenya', 'air ticketing Nairobi', 'international flights Kenya',
    'East Africa tours', 'Dubai packages Kenya', 'travel agency Kenya'
  ],
  authors: [{ name: 'Tesfa Travel & Tour', url: siteUrl }],
  creator: 'Tesfa Travels',
  publisher: 'Tesfa Travels',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: 'Tesfa Travel & Tour | IATA Accredited Travel Agency in Nairobi',
    description: 'Book flights, visas, hotels & tour packages with Tesfa Travel & Tour. IATA-accredited, serving East Africa and beyond since inception.',
    url: siteUrl,
    siteName: 'Tesfa Travels',
    images: [
      {
        url: `${siteUrl}/assets/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Tesfa Travel & Tour - IATA Accredited Travel Agency',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesfa Travel & Tour | IATA Accredited Agency – Nairobi',
    description: 'Book flights, visas, hotels & tour packages across East Africa and worldwide.',
    site: '@tesfatravels',
    creator: '@tesfatravels',
    images: [`${siteUrl}/assets/og-image.png`],
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
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE', // Replace after verifying on Google Search Console
  },
  category: 'travel',
}

// Structured Data: WebSite with Sitelinks SearchBox
const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tesfa Travels',
  alternateName: 'Tesfa Travel & Tour',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/destinations?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// Structured Data: TravelAgency LocalBusiness (enables Knowledge Panel)
const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': ['TravelAgency', 'LocalBusiness'],
  name: 'Tesfa Travel & Tour',
  legalName: 'Tesfa Travel & Tour Ltd',
  image: `${siteUrl}/assets/logo.png`,
  '@id': `${siteUrl}/#organization`,
  url: siteUrl,
  telephone: '+254 20 000 0000',
  email: 'info@tesfatravels.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kilimani',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    postalCode: '00100',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -1.2921,
    longitude: 36.8219,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/tesfatravels',
    'https://www.instagram.com/tesfatravels',
    'https://twitter.com/tesfatravels',
    'https://www.linkedin.com/company/tesfatravels',
  ],
  hasMap: `https://maps.google.com/?q=Tesfa+Travel+Nairobi`,
  currenciesAccepted: 'KES, USD, EUR',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer, Mobile Money',
  slogan: 'Flying is Our Business, Service is Our Asset',
  knowsAbout: ['Air Ticketing', 'Visa Processing', 'Hotel Reservations', 'Corporate Travel', 'Tour Packages', 'IATA'],
  areaServed: [
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Country', name: 'Uganda' },
    { '@type': 'Country', name: 'Tanzania' },
    { '@type': 'Country', name: 'Ethiopia' },
  ],
};

// Structured Data: SiteNavigationElement – Powers Google Sitelinks
const siteNavSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Tesfa Travels Site Navigation',
  itemListElement: [
    { '@type': 'SiteLinksSearchBox', target: `${siteUrl}` },
    { '@type': 'ListItem', position: 1, name: 'Flights',      item: `${siteUrl}/flights` },
    { '@type': 'ListItem', position: 2, name: 'Visa Services', item: `${siteUrl}/visa` },
    { '@type': 'ListItem', position: 3, name: 'Hotels',       item: `${siteUrl}/hotel` },
    { '@type': 'ListItem', position: 4, name: 'Corporate',    item: `${siteUrl}/corporate` },
    { '@type': 'ListItem', position: 5, name: 'Destinations', item: `${siteUrl}/destinations` },
    { '@type': 'ListItem', position: 6, name: 'Special Offers', item: `${siteUrl}/offers` },
    { '@type': 'ListItem', position: 7, name: 'Branches',    item: `${siteUrl}/branches` },
    { '@type': 'ListItem', position: 8, name: 'Contact Us',  item: `${siteUrl}/contact` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`bg-background ${_playfair.variable} ${_dmSans.variable} ${_lora.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavSchema) }} />
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
