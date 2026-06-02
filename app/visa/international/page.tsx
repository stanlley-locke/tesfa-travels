'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';

export default function InternationalVisasPage() {
  const regions = [
    { name: 'Schengen Area', detail: '27 European Countries', time: '14-21 Days' },
    { name: 'United States', detail: 'B1/B2 Visitor Visas', time: 'Varies by Embassy' },
    { name: 'United Kingdom', detail: 'Standard Visitor Visa', time: '15-21 Days' },
    { name: 'Canada', detail: 'Temporary Resident Visa', time: '21-30 Days' },
    { name: 'UAE (Dubai)', detail: 'Tourist e-Visa', time: '2-4 Days' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?q=80&w=2070&auto=format&fit=crop"
            alt="International Visas"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Global Access</span>
          <h1 className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            International <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Visas</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            Navigate complex global immigration requirements with our dedicated international visa experts.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#fbfbfb]">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-3xl font-medium text-[#111111] tracking-tight mb-6">Expert Consular Support</h2>
              <p className="text-lg text-neutral-600 font-light leading-relaxed mb-6">
                Securing an international visa can be a daunting process. Tesfa Travels provides high-touch consultation to ensure your application package is flawless, maximizing your chances of approval.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {['Interview Preparation', 'Document Verification', 'Embassy Appointment Booking', 'Biometrics Coordination'].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#6b7b65]" />
                    <span className="text-sm font-medium text-neutral-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-neutral-200 shadow-sm p-8">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111] mb-6">Key Destinations</h3>
              <div className="divide-y divide-neutral-100">
                {regions.map((region, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <Globe size={16} className="text-neutral-300 group-hover:text-[#111111] transition-colors" />
                      <div>
                        <p className="text-sm font-bold text-[#111111]">{region.name}</p>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{region.detail}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#6b7b65]">{region.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-neutral-200 p-10 sticky top-32 shadow-xl">
              <span className="text-[10px] font-bold tracking-widest text-[#6b7b65] uppercase mb-4 block">Consultation</span>
              <h3 className="text-2xl font-medium mb-4 text-[#111111]">Book a Visa Strategy Session</h3>
              <p className="text-neutral-600 font-light text-sm leading-relaxed mb-8">
                Every traveler's profile is unique. Speak with our experts to review your travel history and plan your international visa strategy.
              </p>
              <Link href="/contact" className="w-full bg-[#111111] hover:bg-[#333333] text-white py-4 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all">
                Schedule Consult <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
