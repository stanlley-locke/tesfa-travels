import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';

export default async function OffersPage() {
  const campaigns = await prisma.campaign.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111111] flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-black pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-xs font-bold tracking-[0.3em] text-[#6b7b65] uppercase mb-4 block">Promotions</span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            Exclusive Offers
          </h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Discover our latest corporate travel packages, heavily discounted expedition rates, and priority partner perks.
          </p>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="flex-1 container mx-auto px-6 max-w-5xl py-24 min-h-[50vh]">
        {campaigns.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 font-light text-xl">There are no active promotions at this time.</p>
            <p className="text-neutral-400 mt-2 text-sm">Check back later or subscribe to our newsletter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaigns.map((campaign: any) => (
              <div key={campaign.id} className="bg-white border border-neutral-200 p-8 hover:shadow-2xl transition-shadow duration-500 rounded-none relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Tag size={120} />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-widest text-[#6b7b65] uppercase mb-2 block">Active Campaign</span>
                  <h3 className="text-3xl font-medium text-[#111111] mb-6 tracking-tight leading-tight">
                    {campaign.name}
                  </h3>
                  
                  <div className="bg-neutral-50 p-4 border border-neutral-100 flex items-center justify-between mb-8">
                    <span className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Use Code</span>
                    <span className="text-lg font-mono font-bold tracking-widest text-[#111111] bg-white px-3 py-1 border border-neutral-200 shadow-sm">
                      {campaign.discountCode}
                    </span>
                  </div>

                  <Link href={`/bookings?promo=${campaign.discountCode}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white bg-[#111111] hover:bg-[#6b7b65] px-6 py-3 transition-colors group/btn">
                    Redeem Offer <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
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
