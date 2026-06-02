import prisma from '@/lib/prisma';
import HomeClient from './HomeClient';

export default async function Home() {
  const packages = await prisma.package.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'asc' },
  });

  return <HomeClient destinations={packages} />;
}
