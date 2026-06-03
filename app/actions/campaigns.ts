'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCampaigns() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, campaigns };
  } catch (error) {
    console.error('Failed to get campaigns:', error);
    return { success: false, error: 'Failed to retrieve campaigns' };
  }
}

export async function getActiveCampaigns() {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { 
        isActive: true,
        OR: [
          { validUntil: null },
          { validUntil: { gte: new Date() } }
        ]
      },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, campaigns };
  } catch (error) {
    console.error('Failed to get active campaigns:', error);
    return { success: false, error: 'Failed to retrieve active campaigns' };
  }
}

export async function createCampaign(data: {
  name: string;
  description?: string;
  image?: string;
  discountCode: string;
  isActive?: boolean;
  validUntil?: Date | null;
}) {
  try {
    const campaign = await prisma.campaign.create({
      data: {
        name: data.name,
        description: data.description || '',
        image: data.image,
        discountCode: data.discountCode,
        isActive: data.isActive ?? true,
        validUntil: data.validUntil,
      },
    });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true, campaign };
  } catch (error) {
    console.error('Failed to create campaign:', error);
    return { success: false, error: 'Failed to create campaign' };
  }
}

export async function updateCampaign(id: string, data: {
  name?: string;
  description?: string;
  image?: string;
  discountCode?: string;
  isActive?: boolean;
  validUntil?: Date | null;
}) {
  try {
    const campaign = await prisma.campaign.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true, campaign };
  } catch (error) {
    console.error('Failed to update campaign:', error);
    return { success: false, error: 'Failed to update campaign' };
  }
}

export async function toggleCampaignStatus(id: string, isActive: boolean) {
  try {
    const campaign = await prisma.campaign.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true, campaign };
  } catch (error) {
    console.error('Failed to toggle campaign status:', error);
    return { success: false, error: 'Failed to toggle status' };
  }
}

export async function deleteCampaign(id: string) {
  try {
    await prisma.campaign.delete({
      where: { id },
    });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete campaign:', error);
    return { success: false, error: 'Failed to delete campaign' };
  }
}
