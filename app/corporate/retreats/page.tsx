'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, CheckCircle2 } from 'lucide-react';

export default function CorporateRetreatsPage() {
  const experiences = [
    { title: 'Safari Team Building', location: 'Maasai Mara / Serengeti', type: 'Wildlife & Strategy' },
    { title: 'Coastal Escapes', location: 'Diani Beach / Zanzibar', type: 'Relaxation & Bonding' },
    { title: 'Mountain Treks', location: 'Mt. Kenya / Kilimanjaro', type: 'Endurance & Leadership' },
    { title: 'Cultural Immersions', location: 'Addis Ababa / Lalibela', type: 'Heritage & Discovery' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
            alt="Corporate Team Retreats"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Company Culture</span>
          <h1 className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            Team <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Retreats</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            Build stronger teams through curated incentive trips and unforgettable off-site experiences across East Africa.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#fbfbfb]">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-3xl font-medium text-[#111111] tracking-tight mb-6">Invest in Your People</h2>
              <p className="text-lg text-neutral-600 font-light leading-relaxed mb-6">
                A well-planned corporate retreat can transform company culture and drive massive ROI in team cohesion. We curate bespoke experiences that balance strategic work sessions with once-in-a-lifetime adventures.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {['Custom Itinerary Design', 'Group Airfare Negotiation', 'Team-Building Facilitators', 'Full-Board Lodge Buyouts'].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#6b7b65]" />
                    <span className="text-sm font-medium text-neutral-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-neutral-200 shadow-sm p-8">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111] mb-6">Popular Retreat Formats</h3>
              <div className="divide-y divide-neutral-100">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <Compass size={16} className="text-neutral-300 group-hover:text-[#6b7b65] transition-colors" />
                      <div>
                        <p className="text-sm font-bold text-[#111111]">{exp.title}</p>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{exp.location}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#6b7b65]">{exp.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#111111] text-white p-10 sticky top-32 shadow-2xl">
              <h3 className="text-2xl font-medium mb-6">Build Your Retreat</h3>
              <p className="text-neutral-400 font-light text-sm leading-relaxed mb-8">
                Whether you're taking 10 executives to a luxury bush camp or 100 employees to a coastal resort, our logistics team handles every detail from departure to return.
              </p>
              <Link href="/contact" className="w-full bg-[#6b7b65] hover:bg-[#5a6a54] text-white py-4 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all">
                Plan an Off-site <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
