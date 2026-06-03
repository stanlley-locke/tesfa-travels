import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 60;

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111111] flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-black pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/assets/pexels-zakh-36720392.jpg" alt="Offers Background" fill className="object-cover grayscale" />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <span className="text-xs font-bold tracking-[0.3em] text-[#6b7b65] uppercase mb-4 block">Limited Time</span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            Special Offers
          </h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Discover our latest exclusive travel packages, heavily discounted rates, and premium partner perks.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="flex-1 container mx-auto px-6 max-w-7xl py-24 min-h-[50vh]">
        {offers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 font-light text-xl">There are no active offers at this time.</p>
            <p className="text-neutral-400 mt-2 text-sm">Check back later or contact us for custom packages.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer: any) => (
              <div key={offer.id} className="bg-white border border-neutral-200 hover:shadow-2xl transition-all duration-500 rounded-none relative overflow-hidden group flex flex-col">
                <div className="relative h-64 w-full overflow-hidden">
                   <Image 
                     src={offer.image || '/assets/placeholder.jpg'} 
                     alt={offer.title} 
                     fill 
                     className="object-cover group-hover:scale-105 transition-transform duration-700" 
                   />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#111111] px-4 py-2 text-xs font-bold uppercase tracking-widest">
                     {offer.price}
                   </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <span className="text-[10px] font-bold tracking-widest text-[#6b7b65] uppercase mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Tag size={12} /> Featured Deal</span>
                    {offer.validUntil && <span className="text-neutral-400">Valid till {new Date(offer.validUntil).toLocaleDateString()}</span>}
                  </span>
                  <h3 className="text-2xl font-medium text-[#111111] mb-4 tracking-tight leading-tight">
                    {offer.title}
                  </h3>
                  
                  <p className="text-neutral-500 text-sm font-light mb-8 flex-1">
                    {offer.description}
                  </p>

                  <Link href={`/offers/${offer.id}`} className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white bg-[#111111] hover:bg-[#6b7b65] px-6 py-4 transition-colors group/btn w-full">
                    View Details <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
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
