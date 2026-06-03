'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, X, Calendar, CheckCircle2, Send } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Earth from '@/components/ui/globe';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Package } from '@prisma/client';
import { FlightDeals } from './FlightDeals';

import { submitInquiry } from '@/app/actions/inquiries';
import Link from 'next/link';

export default function DestinationsClientPage({ destinations }: { destinations: Package[] }) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'flights' ? 'flights' : 'packages';
  const [activeTab, setActiveTab] = useState<'packages' | 'flights'>(initialTab);
  const [selectedDest, setSelectedDest] = useState<Package | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    if (searchParams.get('tab') === 'flights') {
      setActiveTab('flights');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDest) return;
    
    const res = await submitInquiry({
      ...formData,
      service: selectedDest.name,
      type: 'QUICK_INQUIRY',
      packageId: selectedDest.id,
    });
    
    if (res.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedDest(null);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Header />



      {/* Hero */}
      <section className="relative pt-48 pb-32 px-6 min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Global Destinations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fbfbfb] from-0% via-80% to-100%" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-white text-center flex flex-col items-center mt-10">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Explore the World</span>
          <h1 
            className="text-5xl md:text-8xl font-medium tracking-tight mb-8 leading-[1.05]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Global <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Destinations</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl font-light leading-relaxed">
            Discover our curated portfolio of extraordinary locales. Find your perfect escape.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex justify-center -mt-8 relative z-20">
        <div className="bg-white p-2 shadow-2xl flex border border-neutral-100">
          <button 
            onClick={() => setActiveTab('packages')}
            className={`px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
              activeTab === 'packages' ? 'bg-[#1a1a1a] text-white' : 'bg-transparent text-neutral-400 hover:text-black hover:bg-neutral-50'
            }`}
          >
            Common Destinations
          </button>
          <button 
            onClick={() => setActiveTab('flights')}
            className={`px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
              activeTab === 'flights' ? 'bg-[#1a1a1a] text-white' : 'bg-transparent text-neutral-400 hover:text-black hover:bg-neutral-50'
            }`}
          >
            Flight Routes
          </button>
        </div>
      </div>

      {activeTab === 'packages' ? (
        <section className="relative py-24 bg-white overflow-hidden text-[#1a1a1a]">
        <div className='absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(#83838352_1px,#ececec_1px)] bg-[size:20px_20px]'></div>
        <Earth
          mapBrightness={6}
          dark={1}
          baseColor={[1, 1, 1]}
          glowColor={[1, 1, 1]}
          className='w-[800px] md:w-[1200px] absolute -bottom-40 translate-y-4 -right-20 md:-right-40 opacity-50 z-0'
        />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <svg className='absolute -top-[999px] -left-[999px] w-0 h-0'>
            <defs>
              <clipPath id='clip-another1' clipPathUnits={'objectBoundingBox'}>
                <path d='M0 0.0417599C0 0.0186966 0.0250721 0 0.056 0H0.6105C0.641428 0 0.6665 0.0186965 0.6665 0.0417599V0.148024C0.6665 0.171087 0.691572 0.189784 0.7225 0.189784H0.944C0.974928 0.189784 1 0.20848 1 0.231544V0.95824C1 0.981303 0.974928 1 0.944 1H0.056C0.0250721 1 0 0.981303 0 0.95824V0.0417599Z' fill='#D9D9D9' />
              </clipPath>
              <clipPath id='clip-another2' clipPathUnits={'objectBoundingBox'}>
                <path d='M0.1145 0.139138L0.235656 0.0147291C0.244771 0.0053695 0.257945 0 0.271794 0H0.5H0.96C0.982091 0 1 0.016076 1 0.0359066V0.964093C1 0.983924 0.982091 1 0.96 1H0.04C0.0179086 1 0 0.983924 0 0.964093V0.5V0.265845C0 0.255659 0.00428628 0.24585 0.0120005 0.238381L0.1145 0.139138Z' fill='#D9D9D9' />
              </clipPath>
              <clipPath id='clip-another3' clipPathUnits={'objectBoundingBox'}>
                <path d='M0 0.0351351C0 0.0157306 0.0174609 0 0.039 0H0.5H0.727414C0.741798 0 0.755513 0.00547207 0.765179 0.0150678L0.858 0.107207L0.98622 0.236143C0.995093 0.245066 1 0.256625 1 0.268605V0.5V0.964865C1 0.984269 0.982539 1 0.961 1H0.039C0.0174609 1 0 0.984269 0 0.964865V0.0351351Z' fill='#D9D9D9' />
              </clipPath>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
            {destinations.map((dest, idx) => (
              <div key={idx} className="group cursor-pointer flex flex-col items-center bg-transparent transition-all duration-500">
                <figure style={{ clipPath: `url(#clip-another${(idx % 3) + 1})` }} className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="transition-all duration-500 align-bottom object-cover group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex justify-between items-center">
                      <span className="bg-white text-black font-mono text-[10px] tracking-widest font-bold px-4 py-2 rounded-full">
                        {dest.price}
                      </span>
                    </div>
                  </div>
                </figure>
                <div className="mt-8 text-center px-4 pb-4 w-full">
                  <div className="flex justify-center gap-4 text-[#6b7b65] font-mono text-[10px] tracking-widest uppercase mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={12}/> {dest.capacity ? dest.capacity + ' PAX Max' : 'Flexible'}</span>
                  </div>
                  <h3 className="text-3xl font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>{dest.name}</h3>
                  <p className="text-[#6b7b65] font-light text-sm italic mb-4">{dest.status}</p>
                  <p className="text-neutral-600 font-light text-base mb-6">{dest.description}</p>
                  
                  <div className="flex flex-col gap-3 w-full">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedDest(dest); }}
                      className="bg-[#111111] hover:bg-[#6b7b65] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors w-full"
                    >
                      Quick Inquire
                    </button>
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <Link 
                        href={`/destinations/${dest.id}`}
                        className="bg-transparent border border-neutral-200 hover:border-black text-[#111111] px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors w-full text-center"
                      >
                        View Details
                      </Link>
                      <Link 
                        href={`/contact?subject=Inquiry about: ${dest.name}`}
                        className="bg-transparent border border-neutral-200 hover:border-black text-[#111111] px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors w-full text-center"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {destinations.length === 0 && (
            <div className="text-center py-20 text-neutral-400 font-light italic">
              No destinations currently published.
            </div>
          )}
        </div>
      </section>
      ) : (
        <FlightDeals />
      )}

      {/* Dynamic Inquiry Modal */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedDest(null)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-black z-10"
              >
                <X size={24} />
              </button>

              <div className="p-10 md:p-12">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-500">
                    <div className="w-16 h-16 bg-[#6b7b65]/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-[#6b7b65]" />
                    </div>
                    <h3 className="text-2xl font-medium text-[#1a1a1a] mb-2">Inquiry Sent!</h3>
                    <p className="text-neutral-500 font-light text-sm">
                      Our specialist for <span className="font-medium">{selectedDest.name}</span> will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">Quick Inquiry</span>
                    <h2 className="text-3xl font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                      {selectedDest.name}
                    </h2>
                    <p className="text-neutral-500 font-light text-sm mb-8">
                      Fill out the form below to get a customized itinerary and pricing for this destination.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">First Name</label>
                          <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65]" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Last Name</label>
                          <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Email Address</label>
                          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65]" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Phone</label>
                          <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65]" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Message / Dates / Travelers</label>
                        <textarea required rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65] resize-none"></textarea>
                      </div>

                      <button type="submit" className="w-full bg-[#111111] hover:bg-[#6b7b65] text-white py-4 mt-4 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all">
                        Request Quote <Send size={14} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
