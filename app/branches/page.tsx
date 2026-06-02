'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Earth from '@/components/ui/globe';

export default function BranchesPage() {
  const branches = [
    {
      city: 'Nairobi, Kenya',
      type: 'Global Headquarters',
      address: 'Shujah Mall, 2nd Floor\nKilimani Area',
      hours: 'Mon-Sun, 9:00 AM - 6:00 PM',
      phones: ['+254 713 303 030'],
      email: 'tickets@tesfatravels.com',
      image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      city: 'Juba, South Sudan',
      type: 'Regional Branch Office',
      address: 'Atla bara Tumbra road',
      hours: 'Mon-Fri, 9:00 AM - 5:00 PM',
      phones: ['+211 911 779 928', '+211 928 633 444'],
      email: 'Tesfatraveljuba@gmail.com',
      image: 'https://images.unsplash.com/photo-1523805009056-24ea942e8b2b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      city: 'Addis Ababa, Ethiopia',
      type: 'Regional Branch Office',
      address: 'Dembel city centre\nbeside Yemeni Airways 1st floor',
      hours: 'Mon-Fri, 9:00 AM - 5:00 PM',
      phones: ['+251 927 263 802'],
      email: 'addis@tesfatravels.com',
      image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      city: 'Asmara, Eritrea',
      type: 'Regional Branch Office',
      address: 'kebabi Bar zili shida',
      hours: 'Mon-Fri, 9:00 AM - 5:00 PM',
      phones: ['+291 747 1111'],
      email: 'asmara@tesfatravels.com',
      image: 'https://images.unsplash.com/photo-1523805009056-24ea942e8b2b?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      {/* Cinematic Hero */}
      <section className="relative h-[65vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
            alt="Tesfa Travels Global Presence"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Global Presence</span>
          <h1 className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            Our <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Branches</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            From our headquarters in Nairobi to our regional offices across East Africa, we are always within your reach.
          </p>
        </div>
      </section>

      {/* Branches Grid Section */}
      <section className="relative py-24 px-6 bg-[#fbfbfb] overflow-hidden">
        <div className='absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(#83838352_1px,transparent_1px)] bg-[size:20px_20px]'></div>
        
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none overflow-hidden">
          <Earth
            mapBrightness={6}
            dark={0.1}
            baseColor={[0.5, 0.6, 0.5]}
            glowColor={[1, 1, 1]}
            className='w-[800px] md:w-[1000px] opacity-40'
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {branches.map((loc, idx) => (
              <div key={idx} className="group flex flex-col bg-white shadow-sm border border-neutral-100 hover:shadow-2xl hover:border-neutral-200 transition-all duration-700 rounded-none overflow-hidden relative">
                
                {/* Image Header */}
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={loc.image}
                    alt={loc.city}
                    fill
                    className="transition-transform duration-700 object-cover group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="bg-white text-black font-mono text-[10px] tracking-widest font-bold px-4 py-2 rounded-none shadow-sm">
                      {loc.type}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-3xl font-medium text-white tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>{loc.city}</h3>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-8 lg:p-10 flex flex-col h-full bg-white relative z-20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
                    
                    {/* Left Details */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 text-[#6b7b65] font-mono text-[10px] tracking-widest uppercase mb-3">
                          <MapPin size={14}/> Office Address
                        </div>
                        <p className="text-neutral-600 font-light text-sm leading-relaxed whitespace-pre-line">
                          {loc.address}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 text-[#6b7b65] font-mono text-[10px] tracking-widest uppercase mb-3">
                          <Clock size={14}/> Operating Hours
                        </div>
                        <p className="text-neutral-600 font-light text-sm leading-relaxed">
                          {loc.hours}
                        </p>
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 text-[#6b7b65] font-mono text-[10px] tracking-widest uppercase mb-3">
                          <Phone size={14}/> Contact Numbers
                        </div>
                        <div className="flex flex-col gap-1">
                          {loc.phones.map((phone, i) => (
                            <a key={i} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm font-medium text-[#111111] hover:text-[#6b7b65] transition-colors">{phone}</a>
                          ))}
                        </div>
                      </div>

                      {loc.email && (
                        <div>
                          <div className="flex items-center gap-3 text-[#6b7b65] font-mono text-[10px] tracking-widest uppercase mb-3">
                            <Mail size={14}/> Email Address
                          </div>
                          <a href={`mailto:${loc.email}`} className="text-sm font-medium text-[#111111] hover:text-[#6b7b65] transition-colors block break-all">
                            {loc.email}
                          </a>
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="mt-10 pt-8 border-t border-neutral-100 flex justify-end">
                     <Link href="/contact" className="text-[#111111] hover:text-[#6b7b65] text-[11px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-2 group/link">
                        Get Directions <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                     </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
