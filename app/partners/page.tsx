'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Plane, Star, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const partners = [
  { name: 'African Express', logo: '/assets/partners/african-express.png', desc: 'Regional connections' },
  { name: 'Air Kenya', logo: '/assets/partners/air-kenya.png', desc: 'Safari and coastal flights' },
  { name: 'British Airways', logo: '/assets/partners/british-airways.png', desc: 'Global connectivity' },
  { name: 'EgyptAir', logo: '/assets/partners/egypt-air.png', desc: 'Gateway to the Middle East' },
  { name: 'Emirates', logo: '/assets/partners/emirates-airways.png', desc: 'Luxury travel worldwide' },
  { name: 'Ethiopian Airlines', logo: '/assets/partners/ethiopian-airlines.png', desc: 'African gateway' },
  { name: 'Jambojet', logo: '/assets/partners/jambo-jet.png', desc: 'Affordable domestic flights' },
  { name: 'Kenya Airways', logo: '/assets/partners/kenya-airways.png', desc: 'Regional expert' },
  { name: 'Qatar Airways', logo: '/assets/partners/qatar-airways.png', desc: 'Premium international carrier' },
  { name: 'SafariLink', logo: '/assets/partners/safari-link.png', desc: 'Premium safari connections' },
  { name: 'Skyward Express', logo: '/assets/partners/sky-ward.png', desc: 'Reliable domestic travel' },
  { name: 'Uganda Airlines', logo: '/assets/partners/ugandan-airlines.png', desc: 'Growing regional carrier' },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 bg-[#1a1a1a] text-white overflow-hidden">
        <Image 
          src="/assets/flight1.jpg" 
          alt="Partners Hero" 
          fill 
          className="object-cover opacity-30" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-black/50 to-[#1a1a1a]"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Global Network</span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 drop-shadow-lg" style={{ fontFamily: 'var(--font-sans)' }}>
            Our Trusted <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Partners</span>
          </h1>
          <p className="text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            We collaborate with the world's leading airlines to bring you seamless, comfortable, and premium travel experiences across the globe.
          </p>
        </div>
      </section>

      {/* Partners Grid Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
            {partners.map((partner, idx) => (
              <div key={idx} className="bg-white p-10 hover:bg-[#fbfbfb] transition-colors duration-500 flex flex-col items-center text-center group">
                <div className="relative w-32 h-20 mb-8 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    fill 
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium mb-2">{partner.name}</h3>
                <p className="text-neutral-500 font-light text-sm">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us Section */}
      <section className="py-24 px-6 bg-[#fbfbfb] border-t border-neutral-100">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#6b7b65]/10 flex items-center justify-center text-[#6b7b65] mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">IATA Accredited</h3>
              <p className="text-neutral-500 font-light leading-relaxed">Booking through us means your tickets are protected by global aviation standards.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#6b7b65]/10 flex items-center justify-center text-[#6b7b65] mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">Premium Support</h3>
              <p className="text-neutral-500 font-light leading-relaxed">Our dedicated team is available 24/7 to assist with changes, upgrades, and emergencies.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#6b7b65]/10 flex items-center justify-center text-[#6b7b65] mb-6">
                <Plane size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">Exclusive Deals</h3>
              <p className="text-neutral-500 font-light leading-relaxed">Enjoy access to special volume discounts and corporate rates through our partner network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white border-t border-neutral-200 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-medium mb-8">Ready to book your flight?</h2>
          <p className="text-neutral-500 font-light mb-10 text-lg">Contact our travel consultants today to find the best routes and rates for your next journey.</p>
          <Link
            href="/destinations?tab=flights"
            className="inline-flex items-center gap-4 bg-[#1a1a1a] hover:bg-[#6b7b65] text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors"
          >
            Explore Flights <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
