import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Briefcase, BarChart3, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CorporatePage() {
  const corporateServices = [
    {
      title: 'Travel Management',
      desc: 'End-to-end solutions for your entire team with centralized billing and priority support.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop'
    },
    {
      title: 'Events & Conferences',
      desc: 'Full MICE planning logistics support, from ground transport to venue coordination.',
      image: 'https://images.unsplash.com/photo-1573165850883-9b0e18c44bd2?w=500&auto=format&fit=crop'
    },
    {
      title: 'Team Retreats',
      desc: 'Curated group travel experiences designed to inspire and connect your workforce.',
      image: 'https://images.unsplash.com/photo-1573496358322-6d530124361d?w=500&auto=format&fit=crop'
    }
  ];

  const benefits = [
    'Dedicated account manager',
    'Volume discounts (5-40%)',
    'Flexible payment terms',
    'Priority customer support',
    '24/7 assistance',
    'Expense reporting tools',
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Header />

      {/* Hero */}
      <section className="relative pt-48 pb-32 px-6 min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/pexels-maria-stewart-2268904-5643136.jpg"
            alt="Corporate background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white from-0% via-80% to-100%" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-white">
          <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-8 block">B2B Solutions</span>
          <h1 
            className="text-6xl md:text-8xl font-medium tracking-tight mb-10 leading-[1.05]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Corporate Travel<br />
            <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Management</span>
          </h1>
          <p className="text-2xl text-neutral-200 max-w-2xl font-light leading-relaxed mb-12">
            Tailored travel solutions for businesses of all sizes. Efficiency, reliability, and exclusive corporate benefits.
          </p>
          <Link
            href="/contact"
            className="bg-white text-black hover:bg-[#6b7b65] hover:text-white px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 inline-flex items-center gap-4"
          >
            Request Account
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Capabilities</span>
            <h2 className="text-5xl font-medium tracking-tight">Enterprise <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Services</span></h2>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {corporateServices.map((service, idx) => (
              <div key={idx} className="group cursor-pointer">
                <figure 
                  style={{ clipPath: `url(#clip-another${idx + 1})` }}
                  className="relative aspect-[4/5] w-full overflow-hidden mb-8 bg-[#f4f2ea]"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </figure>
                <div className="px-2">
                  <h3 className="text-2xl font-medium mb-3 text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{service.title}</h3>
                  <p className="text-neutral-500 font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-32 px-6 bg-[#1a1a1a] text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Exclusivity</span>
            <h2 className="text-5xl font-medium tracking-tight">Corporate <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Benefits</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-6 p-8 border border-white/5 hover:border-[#6b7b65] transition-colors duration-500">
                <div className="w-10 h-10 border border-[#6b7b65] flex items-center justify-center flex-shrink-0 text-[#6b7b65]">
                  <span className="text-sm font-bold tracking-widest uppercase">✓</span>
                </div>
                <p className="text-lg font-light tracking-tight">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 bg-[#f7f7f7] text-[#1a1a1a] text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
          <span className="text-[40vw] font-black tracking-tighter leading-none">B2B</span>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-6xl md:text-8xl font-medium mb-10 tracking-tight leading-[1.05]">Transform Your <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Business Travel</span></h2>
          <p className="text-xl md:text-2xl text-neutral-500 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
            Get a dedicated account manager and access to exclusive rates. Let us optimize your corporate mobility.
          </p>
          <Link
            href="/contact"
            className="bg-black text-white hover:bg-[#6b7b65] px-12 py-5 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 inline-flex items-center gap-4"
          >
            Get Started Today
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
