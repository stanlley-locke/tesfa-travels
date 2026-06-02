'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2, Zap } from 'lucide-react';

export default function ExpressVisasPage() {
  const services = [
    { service: 'Dubai Express', timeframe: '24-48 Hours', type: 'Tourist e-Visa' },
    { service: 'Ethiopia Priority', timeframe: '24 Hours', type: 'Business / e-Visa' },
    { service: 'EATV Expedited', timeframe: '48 Hours', type: 'East Africa Tourist' },
    { service: 'Emergency Consular', timeframe: 'Case by Case', type: 'Medical / Urgent' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544253018-b2a8d5b8aa3c?q=80&w=2070&auto=format&fit=crop"
            alt="Express Visa Services"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <div className="flex items-center gap-2 text-red-500 font-bold tracking-[0.4em] text-[10px] uppercase mb-6 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
            <Zap size={14} /> Expedited Processing
          </div>
          <h1 className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            Express <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Visas</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            Urgent travel? Our dedicated fast-track team bypasses the queue to secure your documentation in record time.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#fbfbfb]">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-3xl font-medium text-[#111111] tracking-tight mb-6">When Time is Critical</h2>
              <p className="text-lg text-neutral-600 font-light leading-relaxed mb-6">
                Last-minute business trips and emergency travel require immediate action. Tesfa Travels leverages strong consular relationships and premium processing channels to deliver your visa fast.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {['Priority Document Review', 'Direct Embassy Liaison', '24/7 Dedicated Agent', 'Instant Digital Delivery'].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#6b7b65]" />
                    <span className="text-sm font-medium text-neutral-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-neutral-200 shadow-sm p-8">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111] mb-6">Fast-Track Services</h3>
              <div className="divide-y divide-neutral-100">
                {services.map((svc, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <Clock size={16} className="text-neutral-300 group-hover:text-red-500 transition-colors" />
                      <div>
                        <p className="text-sm font-bold text-[#111111]">{svc.service}</p>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{svc.type}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-red-500">{svc.timeframe}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#111111] text-white p-10 sticky top-32 shadow-2xl border-t-4 border-red-500">
              <h3 className="text-2xl font-medium mb-6">Urgent Request</h3>
              <p className="text-neutral-400 font-light text-sm leading-relaxed mb-8">
                For emergency processing, bypass the standard queue. Call our dedicated express line or submit an urgent request now.
              </p>
              <Link href="/contact" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all">
                Submit Urgent Request <ArrowRight size={16} />
              </Link>
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">24/7 Priority Hotline</p>
                <p className="text-lg font-bold mt-2 tracking-tight text-white">+254 759 888 743</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
