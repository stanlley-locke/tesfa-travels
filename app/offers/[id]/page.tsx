import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Calendar, MapPin, Tag, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function OfferDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const offer = await prisma.offer.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!offer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111111] flex flex-col selection:bg-[#6b7b65] selection:text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-black flex items-end pb-20 pt-32">
        <div className="absolute inset-0 z-0 opacity-60">
          <Image 
            src={offer.image || '/assets/placeholder.jpg'} 
            alt={offer.title} 
            fill 
            className="object-cover" 
            priority
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#fafafa] via-black/50 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <Link href="/offers" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Offers
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-[#6b7b65] text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Tag size={12} /> Exclusive Deal
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
            {offer.title}
          </h1>
        </div>
      </section>

      <main className="flex-1 pb-24 -mt-10 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Details */}
            <div className="lg:col-span-7 space-y-12">
              <div className="prose prose-lg prose-neutral max-w-none bg-white p-10 border border-neutral-200 shadow-xl">
                <p className="text-xl font-light text-neutral-600 leading-relaxed whitespace-pre-line mb-8">
                  {offer.description}
                </p>

                <div className="border-t border-neutral-100 pt-8 mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-6">What's Included</h3>
                  <ul className="space-y-4">
                    {offer.includedItems && offer.includedItems.length > 0 ? (
                      offer.includedItems.map((item, index) => (
                        <li key={index} className="flex items-center gap-4 text-neutral-600">
                          <CheckCircle2 size={18} className="text-[#6b7b65]" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-4 text-neutral-600">
                          <CheckCircle2 size={18} className="text-[#6b7b65]" />
                          <span>Premium Accommodation</span>
                        </li>
                        <li className="flex items-center gap-4 text-neutral-600">
                          <CheckCircle2 size={18} className="text-[#6b7b65]" />
                          <span>Round-trip Airport Transfers</span>
                        </li>
                        <li className="flex items-center gap-4 text-neutral-600">
                          <CheckCircle2 size={18} className="text-[#6b7b65]" />
                          <span>Dedicated Travel Concierge</span>
                        </li>
                        <li className="flex items-center gap-4 text-neutral-600">
                          <CheckCircle2 size={18} className="text-[#6b7b65]" />
                          <span>Flexible Date Adjustments</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Booking Card */}
            <div className="lg:col-span-5 relative z-30">
              <div className="bg-white border border-neutral-200 sticky top-32 shadow-2xl overflow-hidden flex flex-col">
                <div className="relative h-56 w-full bg-neutral-100">
                  <Image 
                    src={offer.image || '/assets/placeholder.jpg'} 
                    alt={offer.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-10">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-2">Starting From</div>
                  <div className="text-4xl font-medium text-[#111111] mb-8">{offer.price}</div>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4 pb-6 border-b border-neutral-100">
                      <Calendar size={24} strokeWidth={1} className="text-[#6b7b65] shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-[#111111] mb-1">Valid Until</div>
                        <div className="text-sm text-neutral-500 font-light">{offer.validUntil ? new Date(offer.validUntil).toLocaleDateString() : 'Limited Time Only'}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-6 border-b border-neutral-100">
                      <ShieldCheck size={24} strokeWidth={1} className="text-[#6b7b65] shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-[#111111] mb-1">Secure Booking</div>
                        <div className="text-sm text-neutral-500 font-light">100% money-back guarantee within 24 hours.</div>
                      </div>
                    </div>
                  </div>

                  <Link href={`/contact?subject=Inquiry about: ${offer.title}`} className="flex items-center justify-center w-full bg-[#111111] hover:bg-[#6b7b65] text-white py-5 text-xs font-bold uppercase tracking-widest transition-colors shadow-lg">
                    Inquire Now
                  </Link>
                  <p className="text-center text-[10px] text-neutral-400 font-mono mt-6 uppercase tracking-widest">
                    T&C Apply. Subject to availability.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
