import prisma from '@/lib/prisma';
import HomeClient from './HomeClient';

export default async function Home() {
  const packages = await prisma.package.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'asc' },
  });

  const offers = await prisma.offer.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  return <HomeClient destinations={packages} offers={offers} />;
}
