import prisma from '@/lib/prisma';
import DestinationsClientPage from './ClientPage';

// Revalidate this page every 60 seconds or on demand
export const revalidate = 60;

export default async function DestinationsPage() {
  const destinations = await prisma.package.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
  });

  return <DestinationsClientPage destinations={destinations} />;
}
