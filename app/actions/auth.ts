'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Simple insecure auth for demo purposes
export async function authenticateAdmin(email: string, pass: string) {
  try {
    let admin = await prisma.adminUser.findUnique({ where: { email } });
    
    // Auto-create default admin for the demo if it doesn't exist
    if (!admin && email === 'tesfatravels@gmail.com' && pass === 'tesfa@2026') {
      admin = await prisma.adminUser.create({
        data: {
          email,
          password: pass,
          role: 'ADMIN'
        }
      });
    }

    if (admin && admin.password === pass) {
      return { success: true, admin };
    }
    return { success: false, error: 'Invalid credentials' };
  } catch (error) {
    console.error('Auth error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

export async function getAdminSettings(email: string) {
  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    return { success: true, admin };
  } catch (error) {
    return { success: false };
  }
}

export async function updateAdminSettings(email: string, data: { newEmail?: string; newPassword?: string }) {
  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) return { success: false, error: 'Admin not found' };

    const updated = await prisma.adminUser.update({
      where: { email },
      data: {
        email: data.newEmail || admin.email,
        password: data.newPassword || admin.password,
      }
    });
    
    return { success: true, admin: updated };
  } catch (error) {
    console.error('Failed to update admin:', error);
    return { success: false, error: 'Failed to update settings' };
  }
}
