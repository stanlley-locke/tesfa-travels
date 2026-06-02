'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe, CheckCircle2, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InternationalFlightsPage() {
  const partners = [
    { name: 'Ethiopian Airlines', type: 'Strategic Partner', routes: 'Global & Regional' },
    { name: 'Qatar Airways', type: 'Premium Partner', routes: 'Middle East & Europe' },
    { name: 'Emirates', type: 'Premium Partner', routes: 'Global Network' },
    { name: 'Kenya Airways', type: 'Hub Partner', routes: 'Africa & Beyond' },
    { name: 'Tarco Air', type: 'Specialty Carrier', routes: 'Sudan & East Africa' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="International Flights"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Global Reach</span>
          <h1 
            className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            International <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Flights</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            Connect to the world with our premium IATA-accredited ticketing service. We specialize in seamless global travel logistics.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 bg-[#fbfbfb]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h2 className="text-3xl font-medium text-[#111111] tracking-tight mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                  IATA Certified Excellence
                </h2>
                <p className="text-lg text-neutral-600 font-light leading-relaxed mb-6">
                  As an authorized IATA agency, Tesfa Travels holds direct ticketing authority with the world's leading airlines. This ensures we provide you with the most competitive fares, flexible routing options, and guaranteed seat allocations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {[
                    'Complex Itinerary Planning',
                    'Multi-City Booking',
                    'Group Flight Logistics',
                    'Baggage & Seat Selection'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-[#6b7b65]" />
                      <span className="text-sm font-medium text-neutral-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partners Table */}
              <div className="bg-white border border-neutral-200 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe size={18} className="text-[#6b7b65]" />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111]">Airline Partners</h3>
                </div>
                <div className="divide-y divide-neutral-100">
                  {partners.map((partner, idx) => (
                    <div key={idx} className="py-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <Plane size={16} className="text-neutral-300 group-hover:text-[#111111] transition-colors" />
                        <div>
                          <p className="text-sm font-bold text-[#111111]">{partner.name}</p>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{partner.routes}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#6b7b65] bg-[#6b7b65]/10 px-3 py-1 uppercase">{partner.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-neutral-200 p-10 sticky top-32 shadow-xl">
                <span className="text-[10px] font-bold tracking-widest text-[#6b7b65] uppercase mb-4 block">Special Offer</span>
                <h3 className="text-2xl font-medium mb-4 text-[#111111]">Nairobi to Addis Ababa</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold tracking-tighter text-[#111111]">$300</span>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">Return</span>
                </div>
                <p className="text-neutral-600 font-light text-sm leading-relaxed mb-8">
                  Take advantage of our high-volume strategic partnership with Ethiopian Airlines. Limited time market-beating rate for direct flights.
                </p>
                <Link
                  href="/contact"
                  className="w-full bg-[#111111] hover:bg-[#333333] text-white py-4 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all"
                >
                  Claim Offer <ArrowRight size={16} />
                </Link>
                <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Custom Itinerary?</p>
                  <Link href="/contact" className="text-sm font-bold mt-2 tracking-tight text-[#6b7b65] hover:text-[#111111] transition-colors inline-block">
                    Speak to an Agent
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
