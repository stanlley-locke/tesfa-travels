import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Flights | Domestic & International Air Tickets - Tesfa Travels',
  description: 'Book cheap flights from Nairobi and across East Africa with Tesfa Travels. IATA-accredited air ticketing for domestic and international routes.',
  alternates: { canonical: 'https://tesfatravels.com/flights' },
  openGraph: {
    title: 'Book Flights | Tesfa Travels Nairobi',
    description: 'IATA-accredited air ticketing for domestic and international flights from Kenya.',
    url: 'https://tesfatravels.com/flights',
    images: [{ url: 'https://tesfatravels.com/assets/og-image.png', width: 1200, height: 630 }],
  },
};

export default function FlightsPage() {
  redirect('/destinations?tab=flights');
}
