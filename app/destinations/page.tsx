import prisma from '@/lib/prisma';
import DestinationsClientPage from './ClientPage';

// Revalidate this page every 60 seconds or on demand
export const revalidate = 60;

import { Suspense } from 'react';

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
