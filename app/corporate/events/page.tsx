'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, CheckCircle2, Mic } from 'lucide-react';

export default function CorporateEventsPage() {
  const offerings = [
    { title: 'Conference Venue Sourcing', desc: 'Identifying and negotiating rates for the perfect venues in East Africa and beyond.' },
    { title: 'Delegate Travel & Visas', desc: 'Coordinating flights, airport transfers, and group visa processing.' },
    { title: 'On-Ground Logistics', desc: 'Managing transportation fleets and high-security convoys for VIPs.' },
    { title: 'Event Production', desc: 'Audio/Visual setup, catering coordination, and staging.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
            alt="MICE Events and Conferences"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">M.I.C.E. Logistics</span>
          <h1 className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            Events & <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Conferences</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            From intimate corporate board meetings to massive international summits, we handle the complex logistics so you can focus on the agenda.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#fbfbfb]">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-3xl font-medium text-[#111111] tracking-tight mb-6">Meetings, Incentives, Conferences & Exhibitions</h2>
              <p className="text-lg text-neutral-600 font-light leading-relaxed mb-6">
                Executing a successful event requires flawless synchronization of travel, accommodation, and venue logistics. Tesfa Travels acts as an extension of your organizing committee, bringing local expertise and deep vendor networks to your event.
              </p>
              <div className="mt-10 grid gap-6">
                {offerings.map((offering, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm">
                    <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h4 className="text-[#111111] font-bold mb-1">{offering.title}</h4>
                      <p className="text-sm text-neutral-500">{offering.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#111111] text-white p-10 sticky top-32 shadow-2xl">
              <div className="w-12 h-12 bg-[#6b7b65] flex items-center justify-center text-white mb-8">
                <Mic size={24} />
              </div>
              <h3 className="text-2xl font-medium mb-6">Planning an Event?</h3>
              <p className="text-neutral-400 font-light text-sm leading-relaxed mb-8">
                Share your requirements (headcount, preferred dates, destination) and our MICE specialists will craft a comprehensive logistics proposal.
              </p>
              <Link href="/contact" className="w-full bg-[#6b7b65] hover:bg-[#5a6a54] text-white py-4 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all">
                Request MICE Proposal <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
