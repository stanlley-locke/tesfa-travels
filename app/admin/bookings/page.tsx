import prisma from '@/lib/prisma';
import ClientsCRMClientPage from './ClientPage';

export const dynamic = 'force-dynamic';

export default async function ClientsCRMPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <ClientsCRMClientPage initialInquiries={inquiries} />;
}
