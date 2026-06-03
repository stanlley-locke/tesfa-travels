import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import DestinationsClientPage from './ClientPage';
import { Suspense } from 'react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Destinations | Explore Tour Packages - Tesfa Travels',
  description: 'Explore Tesfa Travels\u2019 curated tour packages and travel destinations across East Africa and worldwide. Book flights and hotels for your dream vacation.',
  alternates: { canonical: 'https://tesfatravels.com/destinations' },
  openGraph: {
    title: 'Travel Destinations & Packages | Tesfa Travels',
    description: 'Discover our handpicked tour packages — from East Africa safaris to international getaways.',
    url: 'https://tesfatravels.com/destinations',
    images: [{ url: 'https://tesfatravels.com/assets/og-image.png', width: 1200, height: 630 }],
  },
};

export default async function DestinationsPage() {
  const destinations = await prisma.package.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DestinationsClientPage destinations={destinations} />
    </Suspense>
  );
}
