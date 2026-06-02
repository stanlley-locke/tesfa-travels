import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Hotel, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Hotel Reservations | Tesfa Travels',
  description: 'Global and local hotel bookings at competitive corporate rates.',
};

export default function HotelReservationsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#6b7b65] selection:text-white flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
            alt="Hotel Reservations" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto max-w-5xl text-center relative z-10 text-white">
          <span className="text-neutral-300 font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Services</span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
            Hotel <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Reservations</span>
          </h1>
          <p className="text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            From boutique luxury resorts to convenient corporate business hotels, we secure your stay at competitive rates globally.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 bg-white text-[#1a1a1a]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-medium mb-8 tracking-tight">Stay in <br/><span className="font-light italic">comfort.</span></h2>
              <p className="text-neutral-500 leading-relaxed mb-8 font-light text-lg">
                Your accommodation makes or breaks a trip. We partner with the world's finest hospitality brands to guarantee comfort, luxury, and security wherever you land.
              </p>
              <ul className="space-y-4">
                {[
                  'Exclusive corporate discounts and perks',
                  'Curated boutique and luxury resort selections',
                  'Group booking management for events',
                  'Flexible cancellation and rebooking policies'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-700">
                    <CheckCircle2 size={18} className="text-[#6b7b65]" />
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-50 p-12 border border-neutral-100 flex flex-col items-center text-center">
              <Hotel size={48} strokeWidth={1} className="text-[#6b7b65] mb-6" />
              <h3 className="text-2xl font-medium mb-4">Find your stay</h3>
              <p className="text-neutral-500 font-light mb-8">
                Tell us your destination and preferences, and we will curate a list of premier accommodations just for you.
              </p>
              <Link href="/bookings" className="w-full bg-[#111111] hover:bg-[#6b7b65] text-white py-4 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all">
                Book a Hotel <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
