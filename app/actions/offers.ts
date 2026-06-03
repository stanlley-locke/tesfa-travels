'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getOffers() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, offers };
  } catch (error) {
    console.error('Failed to get offers:', error);
    return { success: false, error: 'Failed to retrieve offers' };
  }
}

export async function getActiveOffers() {
  try {
    const offers = await prisma.offer.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, offers };
  } catch (error) {
    console.error('Failed to get active offers:', error);
    return { success: false, error: 'Failed to retrieve offers' };
  }
}

export async function getOfferById(id: string) {
  try {
    const offer = await prisma.offer.findUnique({
      where: { id },
    });
    return { success: true, offer };
  } catch (error) {
    console.error('Failed to get offer:', error);
    return { success: false, error: 'Failed to retrieve offer' };
  }
}

export async function createOffer(data: {
  title: string;
  description: string;
  price: string;
  image: string;
  isActive?: boolean;
  validUntil?: Date | null;
  includedItems?: string[];
}) {
  try {
    const offer = await prisma.offer.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image,
        isActive: data.isActive ?? true,
        validUntil: data.validUntil,
        includedItems: data.includedItems ?? [],
      },
    });
    revalidatePath('/admin/offers');
    revalidatePath('/offers');
    revalidatePath('/');
    return { success: true, offer };
  } catch (error) {
    console.error('Failed to create offer:', error);
    return { success: false, error: 'Failed to create offer' };
  }
}

export async function updateOffer(id: string, data: {
  title?: string;
  description?: string;
  price?: string;
  image?: string;
  isActive?: boolean;
  validUntil?: Date | null;
  includedItems?: string[];
}) {
  try {
    const offer = await prisma.offer.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/offers');
    revalidatePath('/offers');
    revalidatePath('/');
    return { success: true, offer };
  } catch (error) {
    console.error('Failed to update offer:', error);
    return { success: false, error: 'Failed to update offer' };
  }
}

export async function toggleOfferStatus(id: string, isActive: boolean) {
  try {
    const offer = await prisma.offer.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/admin/offers');
    revalidatePath('/offers');
    revalidatePath('/');
    return { success: true, offer };
  } catch (error) {
    console.error('Failed to toggle offer:', error);
    return { success: false, error: 'Failed to toggle offer' };
  }
}

export async function deleteOffer(id: string) {
  try {
    await prisma.offer.delete({
      where: { id },
    });
    revalidatePath('/admin/offers');
    revalidatePath('/offers');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete offer:', error);
    return { success: false, error: 'Failed to delete offer' };
  }
}
