import prisma from '@/lib/prisma';
import PackagesClientPage from './ClientPage';

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <PackagesClientPage initialPackages={packages} />;
}
