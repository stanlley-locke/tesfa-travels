import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

const siteUrl = 'https://tesfatravels.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes with priorities matching their importance
  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl,                          lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${siteUrl}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/destinations`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/flights`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/flights/domestic`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/flights/international`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/visa`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/visa/regional`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/visa/international`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/visa/express`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${siteUrl}/visa-tracking`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${siteUrl}/hotel`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/corporate`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/corporate/events`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/corporate/retreats`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/corporate/management`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/offers`,              lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${siteUrl}/packages/dubai`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${siteUrl}/blog`,                lastModified: now, changeFrequency: 'daily',   priority: 0.7 },
    { url: `${siteUrl}/branches`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/partners`,            lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/air`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${siteUrl}/bookings`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${siteUrl}/bookings/hotels`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${siteUrl}/privacy`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${siteUrl}/terms`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  try {
    const packages = await prisma.package.findMany({ select: { id: true, updatedAt: true } });
    const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
      url: `${siteUrl}/destinations/${pkg.id}`,
      lastModified: pkg.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const offers = await prisma.offer.findMany({ select: { id: true, updatedAt: true } }).catch(() => []);
    const offerRoutes: MetadataRoute.Sitemap = (offers as any[]).map((o) => ({
      url: `${siteUrl}/offers/${o.id}`,
      lastModified: o.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...routes, ...packageRoutes, ...offerRoutes];
  } catch {
    return routes;
  }
}
