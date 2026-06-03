import prisma from '@/lib/prisma';
import PackagesClientPage from './ClientPage';

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      blogPosts: true,
      campaigns: true,
    },
  });

  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  const campaigns = await prisma.campaign.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PackagesClientPage 
      initialPackages={packages} 
      availableBlogPosts={blogPosts} 
      availableCampaigns={campaigns} 
    />
  );
}
