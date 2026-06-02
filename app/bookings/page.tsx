'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Plane, Hotel, MapPin, FileText, Calendar, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('flights');

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'tours', label: 'Tours', icon: MapPin },
    { id: 'visas', label: 'Visas', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Header />

      {/* Hero */}
      <section className="relative pt-48 pb-32 px-6 min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pexels-zakh-36720392.jpg"
            alt="Bookings background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-white from-0% via-80% to-100%" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-white">
          <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-8 block">Reservations</span>
          <h1 
            className="text-6xl md:text-8xl font-medium tracking-tight mb-10 leading-[1.05]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Book Your<br />
            <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Experience</span>
          </h1>
          <p className="text-2xl text-neutral-200 max-w-2xl font-light leading-relaxed">
            Tailored travel solutions for the discerning traveler. Secure your next journey with confidence.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          {/* Custom Tabs */}
          <div className="flex border-b border-neutral-100 mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-6 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${
                    activeTab === tab.id 
                      ? 'border-[#6b7b65] text-[#1a1a1a]' 
                      : 'border-transparent text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Container */}
          <div className="bg-white border border-neutral-100 p-12 shadow-sm">
            {activeTab === 'flights' && (
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Departure</label>
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Destination</label>
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <input
                        type="date"
                        className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <select className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer">
                        <option>1 Adult</option>
                        <option>2 Adults</option>
                        <option>3+ Adults</option>
                        <option>Family</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Class</label>
                    <select className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer">
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                </div>

                <button className="w-full bg-black text-white hover:bg-[#6b7b65] font-bold py-6 rounded-none transition-all duration-500 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4">
                  Search Flights
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            {activeTab === 'hotels' && (
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Destination</label>
                    <input
                      type="text"
                      placeholder="City or Hotel Name"
                      className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Star Rating</label>
                    <select className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer">
                      <option>Any Rating</option>
                      <option>3 Stars</option>
                      <option>4 Stars</option>
                      <option>5 Stars Luxury</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <input type="date" className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <input type="date" className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <select className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer">
                        <option>1 Adult</option>
                        <option>2 Adults</option>
                        <option>3+ Adults</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Rooms</label>
                    <select className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer">
                      <option>1 Room</option>
                      <option>2 Rooms</option>
                      <option>3+ Rooms</option>
                    </select>
                  </div>
                </div>

                <button className="w-full bg-black text-white hover:bg-[#6b7b65] font-bold py-6 rounded-none transition-all duration-500 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4">
                  Search Hotels
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            {activeTab === 'tours' && (
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Tour Destination</label>
                    <input
                      type="text"
                      placeholder="Country, City, or Region"
                      className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Tour Style</label>
                    <select className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer">
                      <option>Adventure & Safari</option>
                      <option>Cultural & Historic</option>
                      <option>Luxury & Wellness</option>
                      <option>City Escapes</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <input type="date" className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Group Size</label>
                    <div className="relative">
                      <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <select className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer">
                        <option>Solo Traveler</option>
                        <option>Couple (2)</option>
                        <option>Small Group (3-6)</option>
                        <option>Large Group (7+)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-black text-white hover:bg-[#6b7b65] font-bold py-6 rounded-none transition-all duration-500 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4">
                  Find Tours
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            {activeTab === 'visas' && (
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Destination Country</label>
                    <input
                      type="text"
                      placeholder="Where are you traveling to?"
                      className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Current Nationality</label>
                    <input
                      type="text"
                      placeholder="Passport Issuing Country"
                      className="w-full bg-white border border-neutral-200 rounded-none px-6 py-4 text-[#1a1a1a] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Expected Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <input type="date" className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Visa Type</label>
                    <div className="relative">
                      <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                      <select className="w-full bg-white border border-neutral-200 rounded-none pl-14 pr-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer">
                        <option>Tourist Visa</option>
                        <option>Business Visa</option>
                        <option>Transit Visa</option>
                        <option>Student Visa</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-black text-white hover:bg-[#6b7b65] font-bold py-6 rounded-none transition-all duration-500 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4">
                  Request Consultation
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
