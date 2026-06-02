import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, CheckCircle2, Navigation, Plane, Hotel, Star } from 'lucide-react';

export default function DubaiPackagePage() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/flight2.jpg"
            alt="Dubai Luxury Getaway"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#6b7b65] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                PREMIUM PACKAGE
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase bg-white/10 backdrop-blur-md px-3 py-1">
                Most Popular
              </span>
            </div>
            <h1 
              className="text-5xl md:text-8xl font-medium tracking-tight mb-4 leading-[1]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Dubai Luxury <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Getaway</span><sup className="text-2xl md:text-4xl ml-1">Hx</sup>
            </h1>
            <p className="text-xl text-neutral-300 font-light max-w-xl">
              Experience the pinnacle of modern luxury, world-class dining, and breathtaking architecture in the heart of the UAE.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 border border-white/20 shrink-0 w-full md:w-[350px]">
            <div className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase mb-1">Starting From</div>
            <div className="text-4xl font-medium text-white mb-6">$2,850 <span className="text-lg text-neutral-400 font-light">/person</span></div>
            <Link
              href="/bookings"
              className="w-full bg-white hover:bg-[#6b7b65] text-black hover:text-white transition-colors duration-300 py-4 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase"
            >
              Book Package <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-3xl font-medium mb-6" style={{ fontFamily: 'var(--font-sans)' }}>Overview</h2>
                <p className="text-neutral-500 font-light leading-relaxed text-lg">
                  Immerse yourself in the ultimate fusion of traditional Arabian culture and futuristic innovation. This 5-day luxury itinerary is meticulously crafted to give you VIP access to Dubai's most exclusive experiences, from private desert safaris to fine dining atop the world's tallest building.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-medium mb-8" style={{ fontFamily: 'var(--font-sans)' }}>What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: Plane, text: 'Round-trip Business Class Flights' },
                    { icon: Hotel, text: '5 Nights at the Burj Al Arab' },
                    { icon: Navigation, text: 'Private Chauffeur Service' },
                    { icon: Star, text: 'VIP Desert Safari & Dinner' },
                    { icon: MapPin, text: 'Guided City Architecture Tour' },
                    { icon: CheckCircle2, text: '24/7 Dedicated Concierge' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 border border-neutral-100 bg-neutral-50 hover:border-[#6b7b65] transition-colors">
                      <item.icon className="text-[#6b7b65]" size={24} strokeWidth={1.5} />
                      <span className="font-medium text-sm text-neutral-800">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-medium mb-8" style={{ fontFamily: 'var(--font-sans)' }}>Itinerary Highlights</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
                  {[
                    { day: 'Day 1', title: 'Arrival & Welcome', desc: 'VIP airport transfer via luxury chauffeur to your suite at the Burj Al Arab.' },
                    { day: 'Day 2', title: 'The Heights of Luxury', desc: 'Private tour of At The Top, Burj Khalifa SKY, followed by a yacht cruise at Dubai Marina.' },
                    { day: 'Day 3', title: 'Desert Elegance', desc: 'Exclusive sunset desert safari in a vintage Land Rover, complete with a private Bedouin-style dinner under the stars.' },
                    { day: 'Day 4', title: 'Cultural Immersion', desc: 'Guided exploration of the gold and spice souks, followed by an evening at the Dubai Opera.' },
                    { day: 'Day 5', title: 'Departure', desc: 'Leisure morning, private shopping experience at Dubai Mall, and chauffeured transfer to the airport.' },
                  ].map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-[#6b7b65] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-[10px] text-[#6b7b65] font-mono tracking-widest uppercase mb-2">{item.day}</div>
                        <h4 className="text-xl font-medium mb-2">{item.title}</h4>
                        <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Sticky */}
            <div className="relative">
              <div className="sticky top-32 space-y-8">
                <div className="bg-[#fbfbfb] p-8 border border-neutral-100">
                  <h3 className="text-xl font-medium mb-6">Trip Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="text-neutral-500 text-sm">Duration</span>
                      <span className="font-medium text-sm flex items-center gap-2"><Calendar size={14} className="text-[#6b7b65]"/> 5 Days / 4 Nights</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="text-neutral-500 text-sm">Group Size</span>
                      <span className="font-medium text-sm text-right">2 - 6 Persons</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="text-neutral-500 text-sm">Pace</span>
                      <span className="font-medium text-sm">Relaxed / Luxury</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="text-neutral-500 text-sm">Accommodation</span>
                      <span className="font-medium text-sm">5-Star Premium</span>
                    </div>
                  </div>
                  <Link
                    href="/bookings"
                    className="w-full bg-[#1a1a1a] hover:bg-[#6b7b65] text-white transition-colors duration-300 py-4 mt-8 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase"
                  >
                    Inquire Now <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="bg-[#6b7b65] text-white p-8">
                  <h3 className="text-xl font-medium mb-4">Need Assistance?</h3>
                  <p className="text-sm text-[#e0e0e0] font-light mb-6">Our luxury travel specialists are ready to customize this itinerary to your exact preferences.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase border-b border-white pb-1 hover:text-neutral-200 transition-colors">
                    Contact an Expert <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
