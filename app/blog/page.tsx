import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Travel Blog | Tips, Guides & Stories - Tesfa Travels',
  description: 'Read Tesfa Travels\u2019 travel blog for expert tips, destination guides, and inspiring stories from East Africa and around the world.',
  alternates: { canonical: 'https://tesfatravels.com/blog' },
  openGraph: {
    title: 'Travel Blog | Tesfa Travels',
    description: 'Expert travel guides and stories from the Tesfa Travels team.',
    url: 'https://tesfatravels.com/blog',
    images: [{ url: 'https://tesfatravels.com/assets/og-image.png', width: 1200, height: 630 }],
  },
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  const activeCampaigns = await prisma.campaign.findMany({
    where: { 
      isActive: true,
      OR: [
        { validUntil: null },
        { validUntil: { gte: new Date() } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111111] flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-black pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/assets/pexels-zakh-36720392.jpg" alt="Blog Background" fill className="object-cover grayscale" />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#fafafa] via-black/80 to-transparent" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <span className="text-xs font-bold tracking-[0.3em] text-[#6b7b65] uppercase mb-4 block">Travel Journal</span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            Stories from the Road
          </h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Insider guides, expert tips, and inspiring stories curated by the Tesfa Travel team.
          </p>
        </div>
      </section>

      {/* Campaigns Banner Section */}
      {activeCampaigns.length > 0 && (
        <section className="bg-white border-b border-neutral-200">
          <div className="container mx-auto px-6 max-w-7xl py-12">
            <h2 className="text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase mb-8">Active Promotions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="relative overflow-hidden bg-[#111111] border border-neutral-800 text-white group min-h-[200px] flex flex-col justify-end p-8">
                  {campaign.image && (
                    <div className="absolute inset-0 z-0">
                      <Image 
                        src={campaign.image} 
                        alt={campaign.name} 
                        fill 
                        className="object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  )}
                  <div className="relative z-10">
                    <span className="inline-block bg-[#6b7b65] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4">
                      {campaign.discountCode}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>{campaign.name}</h3>
                    {campaign.description && (
                      <p className="text-white/70 text-sm font-light max-w-md">{campaign.description}</p>
                    )}
                    {campaign.validUntil && (
                      <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-4">
                        Ends {new Date(campaign.validUntil).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className={`flex-1 container mx-auto px-6 max-w-7xl py-24 min-h-[50vh] ${activeCampaigns.length === 0 ? '-mt-20 relative z-20' : ''}`}>
        {posts.length === 0 ? (
          <div className="bg-white border border-neutral-200 p-20 text-center shadow-xl">
            <BookOpen size={48} className="mx-auto text-neutral-200 mb-6" />
            <p className="text-[#111111] font-medium text-2xl mb-2">No stories published yet.</p>
            <p className="text-neutral-400 text-sm">Check back soon for travel guides and tips.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <div key={post.id} className="bg-white border border-neutral-200 hover:shadow-2xl transition-all duration-500 rounded-none relative overflow-hidden group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-20"><span className="sr-only">Read Post</span></Link>
                
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                   <Image 
                     src={post.image || '/assets/placeholder.jpg'} 
                     alt={post.title} 
                     fill 
                     className="object-cover group-hover:scale-105 transition-transform duration-700" 
                   />
                </div>
                
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-[#6b7b65] uppercase">
                      Travel Guide
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                      {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-medium text-[#111111] mb-4 tracking-tight leading-tight group-hover:text-[#6b7b65] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-500 text-sm font-light mb-8 flex-1 line-clamp-3">
                    {post.content.replace(/[#*`_]/g, '').slice(0, 150)}...
                  </p>

                  <div className="flex items-center justify-between border-t border-neutral-100 pt-6 mt-auto">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">By {post.authorName}</span>
                    <ArrowRight size={16} className="text-[#111111] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
