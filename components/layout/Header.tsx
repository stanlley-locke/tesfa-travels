'use client';

import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Flights',
      href: '/flights',
      featuredTitle: 'Premium Flights',
      featuredSub: 'COMFORT + RELIABILITY',
      featuredImage: '/assets/pexels-planespotter-geneva-1877406873-36897685.jpg',
      subItems: [
        { label: 'Domestic Flights', desc: 'Local routes', href: '/flights/domestic' },
        { label: 'International Flights', desc: 'Global coverage', href: '/flights/international' },
        { label: 'Corporate Deals', desc: 'Volume discounts', href: '/corporate' },
      ],
    },
    {
      label: 'Visas',
      href: '/visa',
      featuredTitle: 'Visa Processing',
      featuredSub: 'FAST + SECURE',
      featuredImage: '/assets/pexels-n-voitkevich-7235892.jpg',
      subItems: [
        { label: 'Regional Visas', desc: 'African nations', href: '/visa/regional' },
        { label: 'International', desc: 'US, UK, Schengen', href: '/visa/international' },
        { label: 'Express Service', desc: 'Expedited processing', href: '/visa/express' },
      ],
    },
    {
      label: 'Hotels',
      href: '/bookings',
      featuredTitle: 'Luxury Stays',
      featuredSub: '5-STAR + BOUTIQUE',
      featuredImage: '/assets/pexels-zakh-36720392.jpg',
      subItems: [
        { label: 'Luxury Resorts', desc: 'Premium lodgings', href: '/bookings/hotels' },
        { label: 'Corporate Rates', desc: 'Negotiated stays', href: '/corporate' },
        { label: 'Budget Stays', desc: 'Affordable quality', href: '/bookings/hotels' },
      ],
    },
    {
      label: 'Corporate',
      href: '/corporate',
      featuredTitle: 'Travel Management',
      featuredSub: 'MICE + RETREATS',
      featuredImage: '/assets/pexels-maria-stewart-2268904-5643136.jpg',
      subItems: [
        { label: 'Travel Management', desc: 'End-to-end solutions', href: '/corporate/management' },
        { label: 'Events & Conferences', desc: 'MICE planning', href: '/corporate/events' },
        { label: 'Team Retreats', desc: 'Group travel', href: '/corporate/retreats' },
      ],
    },
    {
      label: 'Offers',
      href: '/offers',
      featuredTitle: 'Special Offers',
      featuredSub: 'LIMITED TIME DEALS',
      featuredImage: '/assets/flight1.jpg',
      subItems: [
        { label: 'Holiday Packages', desc: 'Seasonal deals', href: '/offers' },
        { label: 'Last Minute', desc: 'Quick getaways', href: '/offers' },
      ],
    },
    {
      label: 'Branches',
      href: '/branches',
      featuredTitle: 'Global Presence',
      featuredSub: 'VISIT OUR OFFICES',
      featuredImage: '/assets/pexels-zakh-36720392.jpg',
      subItems: [
        { label: 'Juba, South Sudan', desc: 'Atla bara Tumbra rd', href: '/branches' },
        { label: 'Addis Ababa, Ethiopia', desc: 'Dembel city centre', href: '/branches' },
        { label: 'Asmara, Eritrea', desc: 'kebabi Bar zili shida', href: '/branches' },
      ],
    },
  ];

  return (
    <header className="absolute top-0 w-full z-50 flex flex-col">
      {/* Top Banner (Scrolling Marquee) */}
      <div className="bg-[#2d2d2d] text-[#e0e0e0] text-[9px] sm:text-[10px] py-2 font-mono font-semibold uppercase tracking-widest flex overflow-hidden whitespace-nowrap border-b border-black/20 w-full">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex w-max"
        >
          {/* First Set */}
          <div className="flex gap-12 items-center pr-12">
            <span>NO MEMBERSHIP REQUIRED</span>
            <span className="text-[#e0e0e0]/30">•</span>
            <span>IATA-ACCREDITED AGENCY</span>
            <span className="text-[#e0e0e0]/30">•</span>
            <span>TRANSPARENT PRICING, NO HIDDEN FEES</span>
            <span className="text-[#e0e0e0]/30">•</span>
            <span>PREMIUM CORPORATE TRAVEL DEALS</span>
            <span className="text-[#e0e0e0]/30">•</span>
            <span>24/7 EXPERT SUPPORT</span>
            <span className="text-[#e0e0e0]/30">•</span>
          </div>
          {/* Duplicated Set for Seamless Loop */}
          <div className="flex gap-12 items-center pr-12">
            <span>NO MEMBERSHIP REQUIRED</span>
            <span className="text-[#e0e0e0]/30">•</span>
            <span>IATA-ACCREDITED AGENCY</span>
            <span className="text-[#e0e0e0]/30">•</span>
            <span>TRANSPARENT PRICING, NO HIDDEN FEES</span>
            <span className="text-[#e0e0e0]/30">•</span>
            <span>PREMIUM CORPORATE TRAVEL DEALS</span>
            <span className="text-[#e0e0e0]/30">•</span>
            <span>24/7 EXPERT SUPPORT</span>
            <span className="text-[#e0e0e0]/30">•</span>
          </div>
        </motion.div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full flex justify-center pt-6 px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-none pl-6 lg:pl-8 pr-4 lg:pr-0 h-[64px] flex items-center justify-between gap-6 lg:gap-12 shadow-lg w-full max-w-fit">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="font-bold text-white text-xl tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Tesfa Travel</h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center">
            {navigationItems.map((item, index) => (
              <div key={item.label} className="group flex items-center h-[64px]">
                {index > 0 && <span className="text-white/40 mx-4 font-light text-sm">|</span>}
                <div className="relative h-full flex items-center">
                  <Link
                    href={item.href}
                    className="text-white hover:text-white/80 transition-colors text-[14px] font-medium tracking-wide"
                  >
                    {item.label}
                  </Link>
                  
                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[650px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-2xl p-6 flex gap-6 mt-2 border border-slate-100">
                    {/* Left Column: Links */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="grid grid-cols-2 text-[10px] font-mono text-slate-500 mb-4 tracking-widest uppercase">
                          <span>CATEGORY</span>
                          <span>DETAILS</span>
                        </div>
                        <div className="flex flex-col">
                          {item.subItems.map((sub, idx) => (
                            <Link 
                              key={idx} 
                              href={sub.href} 
                              className="grid grid-cols-2 items-center py-3 border-b border-dotted border-slate-300 hover:bg-slate-50 transition-colors group/link px-2"
                            >
                              <span className="text-slate-800 font-medium text-sm group-hover/link:text-primary">{sub.label}</span>
                              <span className="text-slate-500 text-xs font-mono">{sub.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <Link 
                        href={item.href} 
                        className="mt-6 bg-[#6b7b65] hover:bg-[#5a6a54] text-white py-3 px-4 text-sm font-medium transition-colors flex items-center gap-2 w-full justify-start shadow-sm"
                      >
                        &rarr; Explore {item.label}
                      </Link>
                    </div>

                    {/* Right Column: Featured Image/Card */}
                    <div className="w-[280px] bg-[#f4f2ea] p-5 flex flex-col relative overflow-hidden border border-slate-100">
                      <div className="z-10 relative">
                        <h4 className="text-slate-900 text-[19px] font-bold leading-tight mb-1" style={{ fontFamily: 'var(--font-sans)' }}>{item.featuredTitle}</h4>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.featuredSub}</p>
                      </div>
                      <div className="mt-4 flex-1 relative min-h-[150px] overflow-hidden z-10 shadow-sm border border-slate-200/50">
                        <Image 
                          src={item.featuredImage} 
                          alt={item.featuredTitle} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center h-full">
            <Link
              href="/contact"
              className="bg-[#333333] hover:bg-[#1a1a1a] text-white text-[13px] font-medium px-10 h-full flex items-center gap-2 transition-colors rounded-none"
            >
              <User size={14} strokeWidth={2.5} />
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 transition-colors ml-4"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-slate-900 font-bold text-lg"
                    >
                      {item.label}
                    </Link>
                    <div className="pl-4 space-y-2 border-l-2 border-slate-100">
                      {item.subItems.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-slate-600 hover:text-primary py-1 text-sm font-medium"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-6 border-t border-slate-100 mt-4">
                  <Link
                    href="/bookings"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-[#333333] hover:bg-[#1a1a1a] text-white text-[15px] font-medium px-6 py-4 flex items-center justify-center gap-2 transition-colors rounded-none"
                  >
                    <User size={18} />
                    Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
