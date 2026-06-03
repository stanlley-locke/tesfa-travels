import prisma from '@/lib/prisma';
import AnalyticsClientPage from './ClientPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AnalyticsPage() {
  try {
    // Parallel fetching for performance
    const [tickets, visas, bookings, clients, inquiries] = await Promise.all([
      prisma.ticket.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.visaApplication.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.client.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    return (
      <AnalyticsClientPage 
        initialData={{
          tickets,
          visas,
          bookings,
          clients,
          inquiries
        }}
      />
    );
  } catch (error) {
    console.error('Failed to load analytics data:', error);
    return (
      <div className="p-12 text-red-500 font-mono">
        Failed to load Analytics Engine. Please check database connection.
      </div>
    );
  }
}
