import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Tesfa Travel & Tour - IATA Accredited Agency',
  description: 'Learn about Tesfa Travel & Tour — a leading IATA-accredited travel agency in Nairobi, Kenya, with over a decade of excellence in flights, visas, and corporate travel.',
  alternates: { canonical: 'https://tesfatravels.com/about' },
  openGraph: {
    title: 'About Tesfa Travels | IATA Accredited Travel Agency',
    description: 'Over a decade of exceptional travel management across East Africa and worldwide.',
    url: 'https://tesfatravels.com/about',
    images: [{ url: 'https://tesfatravels.com/assets/og-image.png', width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
