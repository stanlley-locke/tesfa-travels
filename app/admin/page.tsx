import prisma from '@/lib/prisma';
import AdminOverviewClient from './ClientPage';

export const revalidate = 0; // Ensure fresh data on every load

export default async function AdminOverview() {
  // Fetch all necessary data for the admin overview dashboard
  const [inquiries, bookings, clients, tickets, visas, campaigns, packages, offers] = await Promise.all([
    prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.client.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.ticket.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.visaApplication.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.package.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.offer.findMany({ orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <AdminOverviewClient 
      initialData={{
        inquiries,
        bookings,
        clients,
        tickets,
        visas,
        campaigns,
        packages,
        offers
      }}
    />
  );
}