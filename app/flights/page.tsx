import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Plane, TrendingDown, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function FlightsPage() {
  const specialOffers = [
    {
      route: 'Nairobi to Addis Ababa',
      price: 'From $300',
      savings: 'Up to 40% off',
      airline: 'Multiple carriers',
    },
    {
      route: 'Nairobi to Dubai',
      price: 'From $450',
      savings: 'Competitive rates',
      airline: 'Emirates & flydubai',
    },
    {
      route: 'Nairobi to London',
      price: 'From $650',
      savings: 'Volume discounts',
      airline: 'Qatar & Kenya Airways',
    },
  ];

  const airlines = [
    { name: 'Qatar Airways', desc: 'Premium international carrier' },
    { name: 'Emirates', desc: 'Luxury travel worldwide' },
    { name: 'Kenya Airways', desc: 'Regional expert' },
    { name: 'Ethiopian Airlines', desc: 'African gateway' },
    { name: 'flydubai', desc: 'Affordable flights' },
    { name: 'RwandAir', desc: 'Growing regional carrier' },
  ];

  const benefits = [
    { title: 'IATA Certified', desc: 'Licensed and regulated agency' },
    { title: 'Best Prices', desc: 'Exclusive deals and discounts' },
    { title: 'Expert Support', desc: 'Professional booking assistance' },
    { title: '24/7 Assistance', desc: 'Round-the-clock support' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Header />

      {/* Hero */}
      <section className="relative pt-48 pb-32 px-6 min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pexels-planespotter-geneva-1877406873-36897685.jpg"
            alt="Flights background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-white from-0% via-80% to-100%" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-white">
          <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-8 block">Global Reach</span>
          <h1 
            className="text-6xl md:text-8xl font-medium tracking-tight mb-10 leading-[1.05]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Elevated<br />
            <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Flight Experiences</span>
          </h1>
          <p className="text-2xl text-neutral-200 max-w-2xl font-light leading-relaxed mb-12">
            Connecting you to over 500 destinations worldwide with premium service and unparalleled reliability.
          </p>
          <div className="flex gap-6">
            <Link
              href="/bookings"
              className="bg-white text-black hover:bg-[#6b7b65] hover:text-white px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 inline-flex items-center gap-4"
            >
              Book A Flight
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Deals</span>
            <h2 className="text-5xl font-medium tracking-tight">Current Special <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Offers</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {specialOffers.map((offer, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="border border-neutral-200 p-12 transition-colors duration-500 group-hover:bg-[#fbfbfb] relative h-full flex flex-col justify-between">
                  <div className="absolute top-8 right-8 text-[#6b7b65]">
                    <TrendingDown size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-2 pr-8">{offer.route}</h3>
                    <p className="text-neutral-400 font-light mb-12 uppercase tracking-widest text-[10px]">{offer.airline}</p>
                    <div className="mb-12">
                      <p className="text-4xl font-medium mb-2">{offer.price}</p>
                      <span className="inline-block px-3 py-1 bg-[#6b7b65] text-white text-[10px] font-bold tracking-widest uppercase">{offer.savings}</span>
                    </div>
                  </div>
                  <Link
                    href="/bookings"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1a1a1a] hover:text-[#6b7b65] transition-colors"
                  >
                    Book Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Airlines */}
      <section className="py-32 px-6 bg-[#f7f7f7]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Network</span>
            <h2 className="text-5xl font-medium tracking-tight">Our Airline <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Partners</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
            {airlines.map((airline, idx) => (
              <div key={idx} className="bg-white p-12 hover:bg-[#fbfbfb] transition-colors duration-500 flex flex-col items-center text-center">
                <Plane size={32} strokeWidth={1} className="text-[#6b7b65] mb-8" />
                <h3 className="text-xl font-medium mb-4">{airline.name}</h3>
                <p className="text-neutral-500 font-light leading-relaxed">{airline.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-20 text-center">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Excellence</span>
            <h2 className="text-5xl font-medium tracking-tight">Why Choose <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Tesfa?</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="w-12 h-12 flex items-center justify-center border border-neutral-200 group-hover:bg-[#6b7b65] group-hover:text-white transition-all duration-500 shrink-0">
                  <Star size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 tracking-tight">{benefit.title}</h3>
                  <p className="text-neutral-500 font-light leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 bg-[#1a1a1a] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
          <span className="text-[40vw] font-black tracking-tighter leading-none">FLIGHTS</span>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-6xl md:text-8xl font-medium mb-10 tracking-tight leading-[1.05]">Ready to <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Book?</span></h2>
          <p className="text-xl md:text-2xl text-neutral-400 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
            Start your journey today with the best flight deals in East Africa. Expert assistance is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bookings"
              className="bg-white text-black hover:bg-[#6b7b65] hover:text-white px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500"
            >
              Search Flights Now
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white hover:text-black text-white border border-white/20 px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
