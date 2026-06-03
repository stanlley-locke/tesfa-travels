'use client';

import React from 'react';
import { Plane, TrendingDown, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function FlightDeals() {
  const regionalFlights = [
    {
      route: 'Nairobi to Mombasa',
      price: 'From $150',
      savings: 'No Visa Required',
      airline: 'Kenya Airways & Jambojet',
    },
    {
      route: 'Nairobi to Entebbe (UG)',
      price: 'From $250',
      savings: 'No Visa Required',
      airline: 'Uganda Airlines',
    },
    {
      route: 'Nairobi to Dar es Salaam (TZ)',
      price: 'From $280',
      savings: 'No Visa Required',
      airline: 'Precision Air',
    },
  ];

  const internationalFlights = [
    {
      route: 'Nairobi to Dubai',
      price: 'From $450',
      savings: 'Competitive rates',
      airline: 'Emirates & flydubai',
    },
    {
      route: 'Nairobi to London',
      price: 'From $650',
      savings: 'Volume discounts',
      airline: 'Qatar & Kenya Airways',
    },
    {
      route: 'Nairobi to New York',
      price: 'From $900',
      savings: 'Special Deals',
      airline: 'Ethiopian Airlines',
    },
  ];

  const airlines = [
    { name: 'Qatar Airways', desc: 'Premium international carrier', logo: '/assets/partners/qatar-airways.png' },
    { name: 'Emirates', desc: 'Luxury travel worldwide', logo: '/assets/partners/emirates-airways.png' },
    { name: 'Kenya Airways', desc: 'Regional expert', logo: '/assets/partners/kenya-airways.png' },
    { name: 'Ethiopian Airlines', desc: 'African gateway', logo: '/assets/partners/ethiopian-airlines.png' },
    { name: 'British Airways', desc: 'Global connectivity', logo: '/assets/partners/british-airways.png' },
    { name: 'Uganda Airlines', desc: 'Growing regional carrier', logo: '/assets/partners/ugandan-airlines.png' },
    { name: 'Jambojet', desc: 'Affordable domestic flights', logo: '/assets/partners/jambo-jet.png' },
    { name: 'SafariLink', desc: 'Premium safari connections', logo: '/assets/partners/safari-link.png' },
    { name: 'EgyptAir', desc: 'Gateway to the Middle East', logo: '/assets/partners/egypt-air.png' },
    { name: 'African Express', desc: 'Regional connections', logo: '/assets/partners/african-express.png' },
    { name: 'Air Kenya', desc: 'Safari and coastal flights', logo: '/assets/partners/air-kenya.png' },
    { name: 'Skyward Express', desc: 'Reliable domestic travel', logo: '/assets/partners/sky-ward.png' },
  ];

  const benefits = [
    { title: 'IATA Certified', desc: 'Licensed and regulated agency' },
    { title: 'Best Prices', desc: 'Exclusive deals and discounts' },
    { title: 'Expert Support', desc: 'Professional booking assistance' },
    { title: '24/7 Assistance', desc: 'Round-the-clock support' },
  ];

  return (
    <div className="bg-white text-[#1a1a1a]">
      {/* Local & Regional Flights */}
      <section className="py-24 px-6 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">East Africa & Domestic</span>
            <h2 className="text-4xl font-medium tracking-tight">Local & Regional <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Flights</span></h2>
            <p className="text-neutral-500 font-light mt-4">Explore destinations across Kenya, Uganda, and Tanzania with no visa required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regionalFlights.map((offer, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="border border-neutral-200 p-10 transition-colors duration-500 group-hover:bg-[#fbfbfb] relative h-full flex flex-col justify-between shadow-sm">
                  <div className="absolute top-8 right-8 text-[#6b7b65]">
                    <TrendingDown size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 pr-8">{offer.route}</h3>
                    <p className="text-neutral-400 font-light mb-8 uppercase tracking-widest text-[10px]">{offer.airline}</p>
                    <div className="mb-10">
                      <p className="text-3xl font-medium mb-2">{offer.price}</p>
                      <span className="inline-block px-3 py-1 bg-[#6b7b65] text-white text-[10px] font-bold tracking-widest uppercase">{offer.savings}</span>
                    </div>
                  </div>
                  <Link
                    href={`/contact?subject=Inquiry about flight: ${offer.route}`}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1a1a1a] hover:text-[#6b7b65] transition-colors"
                  >
                    Inquire Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Flights */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Global Reach</span>
            <h2 className="text-4xl font-medium tracking-tight">International <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Flights</span></h2>
            <p className="text-neutral-500 font-light mt-4">Premium travel to major hubs worldwide with our trusted airline partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {internationalFlights.map((offer, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="bg-white border border-neutral-200 p-10 transition-colors duration-500 hover:shadow-xl relative h-full flex flex-col justify-between">
                  <div className="absolute top-8 right-8 text-[#6b7b65]">
                    <TrendingDown size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 pr-8">{offer.route}</h3>
                    <p className="text-neutral-400 font-light mb-8 uppercase tracking-widest text-[10px]">{offer.airline}</p>
                    <div className="mb-10">
                      <p className="text-3xl font-medium mb-2">{offer.price}</p>
                      <span className="inline-block px-3 py-1 bg-[#111111] text-white text-[10px] font-bold tracking-widest uppercase">{offer.savings}</span>
                    </div>
                  </div>
                  <Link
                    href={`/contact?subject=Inquiry about flight: ${offer.route}`}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1a1a1a] hover:text-[#6b7b65] transition-colors"
                  >
                    Inquire Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Airlines */}
      <section className="py-32 px-6 bg-[#f7f7f7]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Network</span>
            <h2 className="text-5xl font-medium tracking-tight">Our Airline <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Partners</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
            {airlines.map((airline, idx) => (
              <div key={idx} className="bg-white p-10 hover:bg-[#fbfbfb] transition-colors duration-500 flex flex-col items-center text-center">
                <div className="relative w-32 h-20 mb-6 flex items-center justify-center">
                  <Image 
                    src={airline.logo} 
                    alt={airline.name} 
                    fill 
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-medium mb-4">{airline.name}</h3>
                <p className="text-neutral-500 font-light leading-relaxed">{airline.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-white border-t border-neutral-200">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-20 text-center">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Excellence</span>
            <h2 className="text-5xl font-medium tracking-tight">Why Book Flights With <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Tesfa?</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="w-12 h-12 flex items-center justify-center border border-neutral-200 group-hover:bg-[#6b7b65] group-hover:text-white transition-all duration-500 shrink-0">
                  <Star size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 tracking-tight">{benefit.title}</h3>
                  <p className="text-neutral-500 font-light leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
