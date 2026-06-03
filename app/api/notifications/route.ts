import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch latest items across models
    const [inquiries, bookings, visas] = await Promise.all([
      prisma.inquiry.findMany({
        where: { status: 'UNREAD' },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { client: true },
      }),
      prisma.visaApplication.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      })
    ]);

    const notifications: any[] = [];

    inquiries.forEach((inq) => {
      notifications.push({
        id: `inq-${inq.id}`,
        title: `New Inquiry: ${inq.service}`,
        description: `From: ${inq.firstName} ${inq.lastName}`,
        timestamp: inq.createdAt,
        type: 'INQUIRY'
      });
    });

    bookings.forEach((booking) => {
      notifications.push({
        id: `book-${booking.id}`,
        title: `Booking Update: ${booking.type}`,
        description: `Client: ${booking.client.name} - ${booking.status}`,
        timestamp: booking.createdAt,
        type: 'BOOKING'
      });
    });

    visas.forEach((visa) => {
      notifications.push({
        id: `visa-${visa.id}`,
        title: `Visa Application: ${visa.country}`,
        description: `Applicant: ${visa.applicantName} - ${visa.status}`,
        timestamp: visa.createdAt,
        type: 'VISA'
      });
    });

    // Sort by timestamp descending
    notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(notifications.slice(0, 10)); // return top 10 recent
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}
