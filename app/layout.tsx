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

export const metadata: Metadata = {
  title: 'Tesfa Travel & Tour - IATA Accredited Travel Agency in Nairobi',
  description: 'Tesfa Travel & Tour: Professional travel solutions connecting East Africa to the world. IATA-accredited, specializing in flights, visas, corporate travel, and tour packages.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Tesfa Travel & Tour',
    description: 'Your Journey, Our Priority - Professional Travel Management for East Africa',
    type: 'website',
  },
  keywords: ['travel', 'flights', 'visa', 'IATA', 'Nairobi', 'Kenya', 'East Africa', 'tour packages', 'corporate travel'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`bg-background ${_playfair.variable} ${_dmSans.variable} ${_lora.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
