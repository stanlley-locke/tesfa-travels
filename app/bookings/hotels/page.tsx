'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Star, Building } from 'lucide-react';

export default function HotelsPage() {
  const categories = [
    { name: 'Luxury Resorts', desc: '5-Star properties across Dubai, Mauritius, and Mombasa.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Corporate Stays', desc: 'Centrally located business hotels with meeting facilities.', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d13c05?q=80&w=2089&auto=format&fit=crop' },
    { name: 'Boutique Escapes', desc: 'Unique, intimate lodgings for the perfect getaway.', image: 'https://images.unsplash.com/photo-1505531278149-813f3607fc76?q=80&w=1978&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-c5a4d40715af?q=80&w=2068&auto=format&fit=crop"
            alt="Luxury Hotels"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Global Stays</span>
          <h1 className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            Curated <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Accommodations</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            From 5-star international luxury resorts to centrally-located corporate business suites, book your stay with exclusive agency rates.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#fbfbfb]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 max-w-3xl">
            <h2 className="text-3xl font-medium text-[#111111] tracking-tight mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
              Exclusive Agency Inventory
            </h2>
            <p className="text-lg text-neutral-600 font-light leading-relaxed">
              Tesfa Travels partners directly with global hospitality groups to offer you priority booking, complimentary upgrades, and negotiated rates that you won't find on public booking engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {categories.map((cat, idx) => (
              <div key={idx} className="group cursor-pointer bg-white border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-[#111111] text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-2">
                      <Star size={12} className="text-[#6b7b65]" /> Premium
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-medium text-[#111111] mb-3">{cat.name}</h3>
                  <p className="text-neutral-500 font-light text-sm">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#111111] text-white p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[10px] font-bold tracking-widest text-[#6b7b65] uppercase mb-4 block">Corporate Accounts</span>
              <h3 className="text-3xl font-medium mb-4">Need blocks of rooms?</h3>
              <p className="text-neutral-400 font-light leading-relaxed">
                If you are planning a conference or team retreat, our MICE division handles bulk hotel bookings, negotiating massive group discounts and managing delegate lists.
              </p>
            </div>
            <Link href="/corporate/events" className="relative z-10 shrink-0 bg-white text-black hover:bg-[#6b7b65] hover:text-white px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-3">
              Explore MICE <ArrowRight size={16} />
            </Link>
            <Building size={200} className="absolute -right-10 -bottom-10 text-white/5 pointer-events-none" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
