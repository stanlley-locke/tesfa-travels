'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Headset, CreditCard, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const values = [
  { icon: Award, title: 'IATA Certified & Regulated', description: 'Globally recognized accreditation ensuring the highest standards of financial and professional competence.' },
  { icon: ShieldCheck, title: 'Competitive Market Rates', description: 'Direct access to global GDS networks guarantees optimal pricing and exclusive negotiated fares.' },
  { icon: Users, title: 'Expert Travel Consultants', description: 'A dedicated team of industry veterans crafting meticulous itineraries tailored to precise specifications.' },
  { icon: Headset, title: '24/7 Customer Support', description: 'Unwavering global assistance around the clock, providing peace of mind wherever you land.' },
  { icon: CreditCard, title: 'Multiple Payment Options', description: 'Secure, flexible, and diversified corporate and personal payment gateways across major global currencies.' },
  { icon: Briefcase, title: 'Corporate Account Services', description: 'Bespoke corporate travel management designed to streamline business operations and maximize efficiency.' },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] selection:bg-[#6b7b65] selection:text-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase mb-6 block">Our Heritage</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]" style={{ fontFamily: 'var(--font-serif)' }}>
              Over a Decade of <br />
              <span className="font-light italic text-neutral-400">Exceptional</span> Service
            </h1>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
                Built on Trust <br /> <span className="font-light italic text-neutral-400">and Reliability</span>
              </h2>
              <div className="space-y-6 text-sm md:text-base text-neutral-600 leading-relaxed max-w-lg">
                <p>Since our inception, Tesfa Travels has redefined the standard for premium travel management. As a fully IATA-accredited agency with over a decade of operational excellence, we have cultivated a legacy anchored in absolute reliability and meticulous attention to detail.</p>
                <p>Whether navigating complex corporate travel logistics, securing specialized visa clearances, or orchestrating bespoke luxury expeditions, our approach remains fiercely uncompromising: we deliver global access with localized precision.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative h-[500px] w-full bg-neutral-100 overflow-hidden">
              <div className="absolute inset-0 bg-[#6b7b65]/10 z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200 to-neutral-50" />
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Grid */}
        <section className="bg-[#111111] text-white py-32 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center max-w-3xl mx-auto">
              <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase mb-6 block">The Tesfa Advantage</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Why Choose <span className="font-light italic text-neutral-400">Us?</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {values.map((value, idx) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#111111] p-12 hover:bg-[#1a1a1a] transition-colors group">
                  <value.icon className="w-8 h-8 text-[#6b7b65] mb-8 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-lg font-bold tracking-tight mb-4">{value.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 md:px-12 py-32 max-w-[1400px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
              Ready to elevate your <span className="font-light italic text-neutral-400">travel experience?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-colors flex items-center justify-center gap-3">
                Contact Our Team <ArrowRight size={14} />
              </Link>
              <Link href="/destinations" className="w-full sm:w-auto px-10 py-5 bg-transparent border border-neutral-200 text-[#111111] text-[10px] font-bold uppercase tracking-widest hover:border-[#111111] transition-colors">
                Explore Destinations
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
