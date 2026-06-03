'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitInquiry(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  type?: string;
  packageId?: string;
}) {
  try {
    const inquiry = await prisma.inquiry.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        type: data.type || 'GENERAL',
        packageId: data.packageId,
      },
    });
    
    // Revalidate the CRM page so it shows the new inquiry
    revalidatePath('/admin/bookings');
    
    return { success: true, inquiry };
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    return { success: false, error: 'Failed to submit inquiry' };
  }
}

export async function markInquiryRead(id: string) {
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status: 'READ' },
    });
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteInquiry(id: string) {
  try {
    await prisma.inquiry.delete({
      where: { id },
    });
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
