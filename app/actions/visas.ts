'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getVisaApplications() {
  try {
    const visas = await prisma.visaApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: visas };
  } catch (error) {
    console.error('Failed to get visas:', error);
    return { success: false, error: 'Failed to fetch visas' };
  }
}

export async function createVisaApplication(data: {
  applicantName: string;
  country: string;
  type: string;
  passportDetails: string;
  travelDate?: Date;
  fee?: number;
  status?: string;
}) {
  try {
    const visa = await prisma.visaApplication.create({
      data: {
        applicantName: data.applicantName,
        country: data.country,
        type: data.type,
        passportDetails: data.passportDetails,
        travelDate: data.travelDate,
        fee: data.fee || 0,
        status: data.status || 'Document Review',
      },
    });
    revalidatePath('/admin/visa');
    return { success: true, data: visa };
  } catch (error) {
    console.error('Failed to create visa:', error);
    return { success: false, error: 'Failed to create visa' };
  }
}

export async function updateVisaStatus(id: string, status: string) {
  try {
    const visa = await prisma.visaApplication.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/visa');
    return { success: true, data: visa };
  } catch (error) {
    console.error('Failed to update visa status:', error);
    return { success: false, error: 'Failed to update visa status' };
  }
}

export async function deleteVisaApplication(id: string) {
  try {
    await prisma.visaApplication.delete({
      where: { id },
    });
    revalidatePath('/admin/visa');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete visa:', error);
    return { success: false, error: 'Failed to delete visa' };
  }
}
