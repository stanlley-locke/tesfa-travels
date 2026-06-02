'use client';

import React, { useRef, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Plane, MapPin, FileText, Briefcase, ArrowRight, ChevronDown, X, Shield, Clock, Search, Map, Navigation, Calendar, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Earth from '@/components/ui/globe';
import useEmblaCarousel from 'embla-carousel-react';
import AccordionGallery from '@/components/ui/accordion-gallery';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function HomeClient({ destinations }: { destinations: any[] }) {
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true });
  const [reviewsRef] = useEmblaCarousel({ align: 'start', dragFree: true });
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const services = [
    {
      title: 'Air Ticketing',
      description: 'Expert issuance of local and international flight tickets with major airlines.',
      icon: Plane,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop',
    },
    {
      title: 'Visa Assistance',
      description: 'Comprehensive support for visa documentation and applications.',
      icon: FileText,
      image: 'https://images.unsplash.com/photo-1526243741027-444d6d255f30?w=500&h=400&fit=crop',
    },
    {
      title: 'Hotel Reservations',
      description: 'Global and local hotel bookings at competitive corporate rates.',
      icon: MapPin,
      image: 'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500&h=400&fit=crop',
    },
    {
      title: 'Corporate Travel',
      description: 'Tailored travel management for businesses and conferences.',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
    },
  ];

  const faqItems = [
    {
      question: 'What is IATA accreditation and why does it matter?',
      answer: 'IATA accreditation ensures we meet strict international standards for air ticketing, financial security, and customer service. It guarantees your bookings are protected.',
    },
    {
      question: 'How long does visa processing take?',
      answer: 'Regional visas typically take 3-5 business days, while international visas may take 1-4 weeks. We provide expedited services for urgent requests.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, bank transfers, mobile money, and corporate accounts. All transactions are secure through certified payment gateways.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Header />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#111111] [clip-path:inset(0)]">
        {/* Background Image / Video - Constant/Fixed */}
        <div className="fixed inset-0 z-0 bg-slate-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/12449638_3840_2160_120fps.mp4" type="video/mp4" />
          </video>
          {/* A gradient overlay fading smoothly into the white globe section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-white"></div>
        </div>

        {/* Accordion Gallery Overlay */}
        <div className="absolute bottom-8 right-8 z-30 hidden md:block">
          <AccordionGallery />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center justify-center pt-20">
          <h1 
            className="text-[56px] md:text-[80px] font-medium text-white mb-8 leading-[1.05] tracking-tight"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Flying is our business,<br />
            <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>service is our asset.</span>
          </h1>
          <div className="flex justify-center mt-4">
            <Link
              href="/bookings"
              className="bg-[#333333] hover:bg-[#1a1a1a] text-[#e0e0e0] font-medium px-5 py-2.5 flex items-center gap-2 transition-colors text-sm"
            >
              <span className="text-lg leading-none mb-1">&#x21aa;</span> Find your destination
            </Link>
          </div>
        </div>

        {/* Floating Cards Container - Bottom Left */}
        <div className="absolute bottom-8 left-8 z-20 hidden md:flex items-center gap-6">
          {/* Card 1: Destination Shortcut */}
          <div className="bg-white p-4 rounded-none shadow-2xl flex items-center gap-6 w-[360px] relative">
            <div className="relative w-[72px] h-[100px] bg-[#f4f2ea] rounded-none overflow-hidden flex-shrink-0">
              <Image src="/assets/pexels-zakh-36720392.jpg" alt="Dubai" fill className="object-cover" />
            </div>
            <div className="flex-1 relative">
              <div className="mt-2">
                <span className="text-[8px] text-neutral-500 font-bold tracking-widest uppercase mb-1 block">Find your destination</span>
                <h3 className="text-slate-900 text-[18px] font-medium leading-tight mb-1">Dubai</h3>
                <span className="text-[9px] font-mono text-[#6b7b65] bg-[#6b7b65]/10 px-2 py-0.5 rounded-none font-bold uppercase inline-block mb-3">Most Popular</span>
                <div className="w-full h-px bg-slate-200 mb-3"></div>
                <div className="flex items-center justify-between">
                  <Link href="/destinations/dubai" className="text-slate-700 hover:text-slate-900 text-[11px] flex items-center gap-1 font-medium">
                    <span className="text-sm leading-none mb-0.5">&#x21aa;</span> Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Premium Package / Offer */}
          <div className="bg-white p-4 rounded-none shadow-2xl flex items-center gap-6 w-[360px] relative">
            <div className="relative w-[72px] h-[100px] bg-[#f4f2ea] rounded-none overflow-hidden flex-shrink-0">
              <Image src="/assets/flight1.jpg" alt="Luxury Package" fill className="object-cover" />
            </div>
            <div className="flex-1 relative">
              <div className="mt-2">
                <div className="text-[8px] text-[#6b7b65] font-mono uppercase tracking-widest mb-1">PREMIUM PACKAGE</div>
                <h4 className="text-slate-900 text-[15px] font-medium leading-tight mb-2">Dubai Luxury Getaway<sup className="text-[10px] ml-0.5">Hx</sup></h4>
                <div className="w-full h-px bg-slate-200 mb-3"></div>
                <div className="flex items-center justify-between">
                  <Link href="/offers" className="text-slate-700 hover:text-slate-900 text-[11px] flex items-center gap-1 font-medium">
                    <span className="text-sm leading-none mb-0.5">&#x21aa;</span> Learn more
                  </Link>
                  <Link href="/bookings" className="bg-[#6b7b65] hover:bg-[#5a6a54] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-none transition-colors">
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [01] Featured Destinations - Editorial Grid */}
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
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">[01] Destinations</span>
              <h2 
                className="text-5xl md:text-7xl font-medium text-[#1a1a1a] leading-[1.1] tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Explore our most<br />
                popular <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>routes</span>
              </h2>
              <p className="text-xl text-neutral-500 max-w-lg font-light leading-relaxed">
                Handpicked travel experiences designed for those who seek the extraordinary.
              </p>
            </div>
            <Link href="/destinations" className="inline-flex items-center gap-3 text-[#1a1a1a] hover:text-[#6b7b65] transition-all duration-300 font-medium pb-2 border-b-2 border-[#1a1a1a] hover:border-[#6b7b65] group">
              View all destinations
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

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
                      <Link href="/destinations" className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#6b7b65] hover:text-white transition-colors">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </figure>
                <div className="mt-8 text-center px-4 pb-4">
                  <h3 className="text-3xl font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>{dest.name}</h3>
                  <p className="text-neutral-600 font-light text-base">{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [02] Core Services - Editorial Layout */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">[02] Services</span>
              <h2 
                className="text-5xl md:text-7xl font-medium text-[#1a1a1a] leading-[1.1] tracking-tight"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Comprehensive travel<br />
                <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>solutions</span> for you
              </h2>
            </div>
            <p className="text-xl text-neutral-500 max-w-sm font-light leading-relaxed mb-2">
              From global air ticketing to bespoke corporate travel management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              const isWide = idx === 0 || idx === 3;
              return (
                <div key={idx} className={`p-12 transition-all duration-500 group relative overflow-hidden ${isWide ? 'col-span-1 md:col-span-2' : 'col-span-1'} min-h-[350px] flex flex-col justify-between bg-[#1a1a1a]`}>
                  {/* Background Image */}
                  <Image src={service.image} alt={service.title} fill className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

                  <motion.div 
                    className="text-white group-hover:text-[#6b7b65] transition-colors duration-500 relative z-10 w-fit"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <IconComponent size={40} strokeWidth={1} />
                  </motion.div>
                  
                  <div className="relative z-10 mt-auto pt-10">
                    <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">{service.title}</h3>
                    <p className="text-neutral-300 leading-relaxed text-base font-light mb-8 max-w-md group-hover:text-white transition-colors duration-500">
                      {service.description}
                    </p>
                    <Link href={`/${service.title.toLowerCase().split(' ')[0]}`} className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-[#6b7b65] transition-colors border-b border-transparent hover:border-[#6b7b65] pb-1">
                      Explore Service <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
            
            {/* Featured Service Card */}
            <div className="col-span-1 md:col-span-2 relative h-full min-h-[400px] bg-[#1a1a1a] p-12 flex flex-col justify-between overflow-hidden group">
              <Image 
                src="/assets/VOLAR.jpg" 
                alt="Corporate" 
                fill 
                className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-[#6b7b65] text-white text-[10px] font-bold tracking-widest uppercase mb-6">Featured</span>
                <h3 className="text-4xl font-medium text-white mb-6 leading-tight group-hover:-translate-y-2 transition-transform duration-500">Corporate Travel<br />Management</h3>
                <p className="text-neutral-400 font-light text-lg mb-8 group-hover:-translate-y-2 transition-transform duration-500 delay-75">Streamline your business travel with our dedicated corporate account services.</p>
              </div>
              <Link href="/corporate" className="relative z-10 w-full py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-center font-medium uppercase tracking-widest text-xs text-white group-hover:-translate-y-2 delay-100">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* [03] About Us - Immersive Layout */}
      <section ref={aboutRef} className="py-32 px-6 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#6b7b65]/5 pointer-events-none"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-[3/4] w-full bg-neutral-800 overflow-hidden order-2 lg:order-1">
              <motion.video
                style={{ y: videoY }}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-[130%] object-cover -top-[15%]"
              >
                <source src="/assets/11645740-hd_1080_1920_60fps.mp4" type="video/mp4" />
              </motion.video>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-8 block">[03] About Us</span>
              <h2 
                className="text-5xl md:text-7xl font-medium mb-10 leading-[1.1] tracking-tight"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Why Choose<br />
                <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Tesfa Travels?</span>
              </h2>
              <p className="text-2xl text-neutral-400 mb-16 leading-relaxed font-light max-w-xl">
                As an IATA-accredited agency with over a decade of experience, we've built our reputation on trust, reliability, and exceptional service.
              </p>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 mb-16"
              >
                {[
                  'IATA Certified & Regulated',
                  'Competitive Market Rates',
                  'Expert Travel Consultants',
                  '24/7 Customer Support',
                  'Multiple Payment Options',
                  'Corporate Account Services',
                ].map((feature, idx) => (
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    key={idx} 
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-1.5 h-1.5 bg-[#6b7b65] group-hover:scale-150 transition-transform"></div>
                    <span className="text-neutral-100 text-lg font-light tracking-wide">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-6 text-white"
              >
                <span className="text-xs font-bold tracking-[0.3em] uppercase pb-2 border-b border-white/30 group-hover:border-white transition-all">
                  Read our story
                </span>
                <motion.div 
                  whileHover={{ scale: 1.1, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all cursor-pointer"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* [04] FAQ Section - Minimalist Accordions */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-24 text-center">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">[04] FAQ</span>
            <h2 
              className="text-5xl md:text-6xl font-medium text-[#1a1a1a] tracking-tight"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Common <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>questions</span>
            </h2>
          </div>

          <div className="space-y-0 border-t border-neutral-200">
            {faqItems.map((item, idx) => (
              <FaqItem key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA - Editorial Impact */}
      <section className="py-40 px-6 bg-[#f7f7f7] text-[#1a1a1a] text-center relative overflow-hidden group">
        {/* Hover-reveal video background */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/11645740-hd_1080_1920_60fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>

        {/* Infinite Ticker Text */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-20 select-none flex items-center overflow-hidden z-10 transition-opacity duration-1000">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            className="flex whitespace-nowrap"
          >
            <span className="text-[40vw] font-black tracking-tighter leading-none group-hover:text-white transition-colors duration-1000">TESFA TRAVELS </span>
            <span className="text-[40vw] font-black tracking-tighter leading-none group-hover:text-white transition-colors duration-1000">TESFA TRAVELS </span>
          </motion.div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-20 transition-colors duration-1000 group-hover:text-white">
          <h2 
            className="text-6xl md:text-8xl font-medium mb-10 tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Ready to <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Travel?</span>
          </h2>
          <p className="text-xl md:text-2xl text-neutral-500 group-hover:text-neutral-300 mb-16 font-light max-w-2xl mx-auto leading-relaxed transition-colors duration-1000">
            Start your next adventure with Tesfa Travel & Tour. Book flights, arrange visas, and plan your perfect trip today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/bookings"
              className="bg-black text-white group-hover:bg-white group-hover:text-black px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 hover:scale-105 flex items-center gap-4 shadow-2xl"
            >
              Book Now
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-black hover:text-white group-hover:border-white/50 group-hover:hover:bg-white group-hover:hover:text-black text-black group-hover:text-white border border-black/20 px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-20 px-6 bg-white overflow-hidden border-t border-neutral-100">
        <div className="mb-12 text-center">
          <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase block">Our Partners</span>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <motion.div 
            className="flex items-center gap-16 md:gap-32 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase text-neutral-300 hover:text-[#6b7b65] transition-colors cursor-default">Emirates</span>
                <span className="text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase text-neutral-300 hover:text-[#6b7b65] transition-colors cursor-default">Qatar</span>
                <span className="text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase text-neutral-300 hover:text-[#6b7b65] transition-colors cursor-default">Ethiopian</span>
                <span className="text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase text-neutral-300 hover:text-[#6b7b65] transition-colors cursor-default">Turkish</span>
                <span className="text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase text-neutral-300 hover:text-[#6b7b65] transition-colors cursor-default">Marriott</span>
                <span className="text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase text-neutral-300 hover:text-[#6b7b65] transition-colors cursor-default">Hilton</span>
              </React.Fragment>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="py-32 px-6 bg-[#fbfbfb] border-t border-neutral-100 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Testimonials</span>
              <h2 className="text-5xl md:text-6xl font-medium text-[#1a1a1a] tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                What our <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>clients</span> say
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-black/20 text-neutral-400 rounded-full"><ArrowRight size={20} className="rotate-180"/></div>
              <div className="w-12 h-12 flex items-center justify-center border border-black/20 text-neutral-400 rounded-full"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing -mx-6 px-6" ref={reviewsRef}>
            <div className="flex gap-8">
              {[
                { name: 'Sarah Jenkins', role: 'Corporate Director', text: 'Tesfa Travels completely overhauled our corporate booking process. The 24/7 support is unmatched and incredibly reliable.' },
                { name: 'Michael Chen', role: 'Frequent Flyer', text: 'Finding luxury accommodations at competitive rates used to be a chore. Their team makes it effortless and seamless.' },
                { name: 'Aisha Mohammed', role: 'CEO, TechFlow', text: 'The Visa assistance service saved our executive team weeks of bureaucracy. We only travel with Tesfa now.' },
                { name: 'David Smith', role: 'Travel Blogger', text: 'Every itinerary is crafted with such attention to detail. It feels like having a personal concierge on every trip.' }
              ].map((review, i) => (
                <div key={i} className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 bg-white p-12 shadow-sm border border-neutral-100 hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between group">
                  <div>
                    <div className="text-neutral-200 group-hover:text-[#6b7b65] transition-colors duration-500 mb-8">
                      <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1449 30C15.7488 30 20.2899 25.56 20.2899 20.08C20.2899 14.6 15.7488 10.16 10.1449 10.16C8.84058 10.16 7.63285 10.4 6.47343 10.84C8.4058 3.84 15.6522 1.48 19.9034 0.600002L18.6473 0C9.75845 1.52 0 8.04 0 20.08C0 25.56 4.54106 30 10.1449 30ZM30.4348 30C36.0386 30 40.5797 25.56 40.5797 20.08C40.5797 14.6 36.0386 10.16 30.4348 10.16C29.1304 10.16 27.9227 10.4 26.7633 10.84C28.6957 3.84 35.942 1.48 40.1932 0.600002L38.9372 0C30.0483 1.52 20.2899 8.04 20.2899 20.08C20.2899 25.56 24.8309 30 30.4348 30Z"/>
                      </svg>
                    </div>
                    <p className="text-xl text-neutral-600 font-light leading-relaxed mb-12">"{review.text}"</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-black">{review.name}</h4>
                    <p className="text-xs text-neutral-400 font-mono mt-1 uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FaqItem({ item, idx }: { item: { question: string, answer: string }, idx: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="group border-b border-neutral-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-10 px-4 font-medium text-2xl text-[#1a1a1a] outline-none transition-colors hover:bg-neutral-50 text-left"
      >
        <span className="flex gap-8 items-center">
          <span className="text-xs font-mono text-neutral-300">0{idx + 1}</span>
          {item.question}
        </span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
          className="text-[#1a1a1a]"
        >
          {isOpen ? <Minus size={24} strokeWidth={1}/> : <Plus size={24} strokeWidth={1}/>}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-16 pb-12 text-neutral-500 leading-relaxed text-xl font-light max-w-3xl">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
