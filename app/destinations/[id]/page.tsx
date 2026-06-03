import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Tag, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import { BookingCard } from './BookingCard';

export default async function DestinationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const pkg = await prisma.package.findUnique({
    where: { id: resolvedParams.id },
    include: {
      blogPosts: {
        where: { published: true }
      },
      campaigns: {
        where: { isActive: true }
      }
    }
  });

  if (!pkg) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111111] flex flex-col selection:bg-[#6b7b65] selection:text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-black flex items-end pb-20 pt-32">
        <div className="absolute inset-0 z-0 opacity-60">
          <Image 
            src={pkg.image || '/assets/placeholder.jpg'} 
            alt={pkg.name} 
            fill 
            className="object-cover" 
            priority
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#fafafa] via-black/50 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Destinations
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-[#6b7b65] text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <MapPin size={12} /> Destination
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
            {pkg.name}
          </h1>
        </div>
      </section>

      <main className="flex-1 pb-24 -mt-10 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Details */}
            <div className="lg:col-span-7 space-y-12">
              <div className="prose prose-lg prose-neutral max-w-none bg-white p-10 border border-neutral-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-neutral-100 rotate-12 -translate-y-8 translate-x-8 pointer-events-none">
                  <MapPin size={120} strokeWidth={0.5} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-6">About this Destination</h2>
                <p className="text-xl font-light text-neutral-600 leading-relaxed whitespace-pre-line relative z-10">
                  {pkg.description}
                </p>
              </div>

              {/* Active Campaigns */}
              {pkg.campaigns && pkg.campaigns.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-6 flex items-center gap-2">
                    <Tag size={16} className="text-[#6b7b65]" /> Exclusive Promotions
                  </h3>
                  <div className="space-y-4">
                    {pkg.campaigns.map((camp) => (
                      <div key={camp.id} className="bg-[#111111] text-white p-6 border-l-4 border-[#6b7b65] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
                        <div>
                          <div className="text-[10px] font-mono text-[#6b7b65] uppercase tracking-widest mb-1">Active Offer</div>
                          <h4 className="text-lg font-medium">{camp.name}</h4>
                          {camp.description && <p className="text-sm text-neutral-400 mt-1">{camp.description}</p>}
                        </div>
                        <div className="bg-white/10 px-4 py-3 font-mono text-center shrink-0 min-w-[120px]">
                          <div className="text-[8px] uppercase tracking-widest text-neutral-400 mb-1">Use Code</div>
                          <div className="font-bold text-lg text-[#6b7b65] tracking-widest">{camp.discountCode}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Blog Posts */}
              {pkg.blogPosts && pkg.blogPosts.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-6 flex items-center gap-2">
                    <BookOpen size={16} className="text-[#6b7b65]" /> Travel Journal
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {pkg.blogPosts.map((post) => (
                      <Link href={`/blog/${post.slug}`} key={post.id} className="group block bg-white border border-neutral-200 overflow-hidden hover:border-[#6b7b65] transition-colors shadow-lg">
                        {post.image && (
                          <div className="h-48 w-full relative bg-neutral-100 overflow-hidden">
                            <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{new Date(post.createdAt).toLocaleDateString()}</div>
                          <h4 className="text-lg font-medium leading-tight mb-4 group-hover:text-[#6b7b65] transition-colors">{post.title}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] flex items-center gap-1">Read Article <span className="text-[#6b7b65] text-lg leading-none">&#x21aa;</span></span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Booking Card */}
            <div className="lg:col-span-5 relative z-30">
              <div className="bg-white border border-neutral-200 sticky top-32 shadow-2xl overflow-hidden flex flex-col">
                <div className="relative h-56 w-full bg-neutral-100">
                  <Image 
                    src={pkg.image || '/assets/placeholder.jpg'} 
                    alt={pkg.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <BookingCard pkg={pkg} />
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
