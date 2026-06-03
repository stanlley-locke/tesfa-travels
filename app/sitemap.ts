import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma'; // Assuming prisma is available for dynamic routes

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/destinations',
    '/offers',
    '/blog',
    '/partners',
    '/branches',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic Routes (e.g. Destinations / Packages)
    const packages = await prisma.package.findMany({
      select: { id: true, updatedAt: true },
    });

    const packageRoutes = packages.map((pkg) => ({
      url: `${siteUrl}/destinations/${pkg.id}`,
      lastModified: pkg.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...routes, ...packageRoutes];
  } catch (error) {
    // Fallback if DB fails during build
    return routes;
  }
}
