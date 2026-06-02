import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileText, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VisaPage() {
  const visas = [
    { country: 'Ethiopia', processing: '3-5 days', type: 'Regional' },
    { country: 'South Sudan', processing: '5-7 days', type: 'Regional' },
    { country: 'Eritrea', processing: '7-10 days', type: 'Regional' },
    { country: 'UAE', processing: '2-3 days', type: 'International' },
    { country: 'Qatar', processing: '3-5 days', type: 'International' },
    { country: 'UK', processing: '10-15 days', type: 'International' },
  ];

  const process = [
    { step: '01', title: 'Submit Documents', desc: 'Provide required documents and information through our secure portal or in-person.' },
    { step: '02', title: 'Review & Verification', desc: 'Our team of experts reviews and verifies every document for embassy compliance.' },
    { step: '03', title: 'Submission', desc: 'We handle the entire submission process directly with the respective embassy.' },
    { step: '04', title: 'Processing', desc: 'Our team monitors the status daily and provides real-time updates on your application.' },
    { step: '05', title: 'Approval & Pickup', desc: 'Collect your approved visa from our office or receive it via secure courier.' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Header />

      {/* Hero */}
      <section className="relative pt-48 pb-32 px-6 min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pexels-n-voitkevich-7235892.jpg"
            alt="Visa background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-white from-0% via-80% to-100%" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-white">
          <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-8 block">Visa Services</span>
          <h1 
            className="text-6xl md:text-8xl font-medium tracking-tight mb-10 leading-[1.05]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Seamless Visa<br />
            <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Assistance</span>
          </h1>
          <p className="text-2xl text-neutral-200 max-w-2xl font-light leading-relaxed mb-12">
            Comprehensive support for regional and international destinations. We handle the complexity, you enjoy the journey.
          </p>
          <Link
            href="/bookings"
            className="bg-white text-black hover:bg-[#6b7b65] hover:text-white px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 inline-flex items-center gap-4"
          >
            Apply Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Visa Destinations */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Destinations</span>
            <h2 className="text-5xl font-medium tracking-tight">Global Visa <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Coverage</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
            {visas.map((visa, idx) => (
              <div key={idx} className="bg-white p-12 hover:bg-[#fbfbfb] transition-colors duration-500 group">
                <div className="mb-8 text-[#6b7b65]">
                  <FileText size={32} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-medium mb-4">{visa.country}</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-neutral-500 font-light">
                    <Clock size={16} className="text-[#6b7b65]" />
                    Processing: {visa.processing}
                  </p>
                  <span className="inline-block px-3 py-1 border border-neutral-200 text-[#1a1a1a] text-[10px] font-bold tracking-widest uppercase group-hover:border-[#6b7b65] group-hover:text-[#6b7b65] transition-colors">
                    {visa.type} Visa
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-6 bg-[#1a1a1a] text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Our Method</span>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight">The Visa <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Process</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative">
            {/* Connection Line (Desktop) */}
            <div className="absolute top-12 left-0 w-full h-px bg-white/10 hidden lg:block"></div>
            
            {process.map((item, idx) => (
              <div key={idx} className="relative z-10">
                <div className="bg-[#6b7b65] text-white w-12 h-12 flex items-center justify-center font-mono text-sm mb-8 mx-auto lg:mx-0">
                  {item.step}
                </div>
                <h3 className="text-xl font-medium mb-4 text-center lg:text-left">{item.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm text-center lg:text-left">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 bg-[#f7f7f7] text-[#1a1a1a] text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
          <span className="text-[40vw] font-black tracking-tighter leading-none">VISA</span>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-6xl md:text-8xl font-medium mb-10 tracking-tight leading-[1.05]">Ready to <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Apply?</span></h2>
          <p className="text-xl md:text-2xl text-neutral-500 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
            Start your visa application with our expert team today. We ensure accuracy and speed at every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bookings"
              className="bg-black text-white hover:bg-[#6b7b65] px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 flex items-center justify-center gap-3"
            >
              Apply Now
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-black hover:text-white text-black border border-black/20 px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
