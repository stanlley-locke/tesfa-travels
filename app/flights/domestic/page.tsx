'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DomesticFlightsPage() {
  const routes = [
    { from: 'Nairobi', to: 'Mombasa', duration: '45m', price: 'From KSh 5,500' },
    { from: 'Nairobi', to: 'Kisumu', duration: '50m', price: 'From KSh 6,200' },
    { from: 'Nairobi', to: 'Eldoret', duration: '45m', price: 'From KSh 5,800' },
    { from: 'Nairobi', to: 'Malindi', duration: '1h 10m', price: 'From KSh 7,500' },
    { from: 'Mombasa', to: 'Kisumu', duration: '1h 30m', price: 'From KSh 9,000' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop"
            alt="Domestic Flight Kenya"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Explore Kenya</span>
          <h1 
            className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Domestic <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Flights</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            Seamless travel across Kenya's major cities and coastal destinations with our trusted local airline partners.
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
                  Connecting the Nation
                </h2>
                <p className="text-lg text-neutral-600 font-light leading-relaxed mb-6">
                  Whether you are flying for a quick business meeting in Kisumu, a relaxing weekend in Mombasa, or a family visit to Eldoret, our domestic ticketing service ensures you get the best rates and schedules.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {[
                    'Instant Ticket Issuance',
                    'Zero Hidden Booking Fees',
                    'Flexible Rescheduling',
                    '24/7 Dedicated Support'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-[#6b7b65]" />
                      <span className="text-sm font-medium text-neutral-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Route Table */}
              <div className="bg-white border border-neutral-200 shadow-sm p-8">
                <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-6">Popular Local Routes</h3>
                <div className="divide-y divide-neutral-100">
                  {routes.map((route, idx) => (
                    <div key={idx} className="py-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <MapPin size={16} className="text-neutral-300 group-hover:text-[#6b7b65] transition-colors" />
                        <div>
                          <p className="text-sm font-bold text-[#111111]">{route.from} &rarr; {route.to}</p>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{route.duration} Flight</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#6b7b65]">{route.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#111111] text-white p-10 sticky top-32 shadow-2xl">
                <h3 className="text-2xl font-medium mb-6">Book Your Domestic Flight</h3>
                <p className="text-neutral-400 font-light text-sm leading-relaxed mb-8">
                  Get access to exclusive negotiated rates on all local carriers including Kenya Airways, Jambojet, Skyward Express, and Safarilink.
                </p>
                <Link
                  href="/contact"
                  className="w-full bg-[#6b7b65] hover:bg-[#5a6a54] text-white py-4 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all"
                >
                  Request a Quote <ArrowRight size={16} />
                </Link>
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Or Call Our Desk</p>
                  <p className="text-lg font-bold mt-2 tracking-tight">+254 713 303 030</p>
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
