import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us | Tesfa Travel & Tour - Nairobi, Kenya',
  description: 'Contact Tesfa Travel & Tour for flights, visa assistance, hotel bookings, and corporate travel. Offices in Nairobi, Juba, Addis Ababa, and Asmara.',
  alternates: { canonical: 'https://tesfatravels.com/contact' },
  openGraph: {
    title: 'Contact Tesfa Travels | Get in Touch',
    description: 'Reach our expert travel agents for flights, visas, hotels, and corporate travel services.',
    url: 'https://tesfatravels.com/contact',
    images: [{ url: 'https://tesfatravels.com/assets/og-image.png', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
