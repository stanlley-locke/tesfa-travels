'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTickets() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: tickets };
  } catch (error) {
    console.error('Failed to get tickets:', error);
    return { success: false, error: 'Failed to fetch tickets' };
  }
}

export async function createTicket(data: {
  pnr: string;
  airline: string;
  passengerName: string;
  route: string;
  commission: number;
  status?: string;
}) {
  try {
    const ticket = await prisma.ticket.create({
      data: {
        pnr: data.pnr,
        airline: data.airline,
        passengerName: data.passengerName,
        route: data.route,
        commission: data.commission,
        status: data.status || 'PENDING',
      },
    });
    revalidatePath('/admin/ticketing');
    return { success: true, data: ticket };
  } catch (error) {
    console.error('Failed to create ticket:', error);
    return { success: false, error: 'Failed to create ticket' };
  }
}

export async function updateTicketStatus(id: string, status: string) {
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/ticketing');
    return { success: true, data: ticket };
  } catch (error) {
    console.error('Failed to update ticket status:', error);
    return { success: false, error: 'Failed to update ticket status' };
  }
}

export async function deleteTicket(id: string) {
  try {
    await prisma.ticket.delete({
      where: { id },
    });
    revalidatePath('/admin/ticketing');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete ticket:', error);
    return { success: false, error: 'Failed to delete ticket' };
  }
}
