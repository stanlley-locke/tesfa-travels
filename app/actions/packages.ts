'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPackage(data: {
  name: string;
  description: string;
  price: string;
  image: string;
  capacity?: number;
  status?: string;
}) {
  try {
    const pkg = await prisma.package.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        capacity: data.capacity,
        status: data.status || 'PUBLISHED',
      },
    });
    revalidatePath('/admin/packages');
    revalidatePath('/');
    return { success: true, package: pkg };
  } catch (error) {
    console.error('Failed to create package:', error);
    return { success: false, error: 'Failed to create package' };
  }
}

export async function updatePackage(id: string, data: {
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  capacity?: number | null;
  status?: string;
}) {
  try {
    const pkg = await prisma.package.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/packages');
    revalidatePath('/');
    return { success: true, package: pkg };
  } catch (error) {
    console.error('Failed to update package:', error);
    return { success: false, error: 'Failed to update package' };
  }
}

export async function updatePackageStatus(id: string, status: string) {
  try {
    await prisma.package.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/packages');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deletePackage(id: string) {
  try {
    await prisma.package.delete({
      where: { id },
    });
    revalidatePath('/admin/packages');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
