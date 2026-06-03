import Image from 'next/image';
import Link from 'next/link';

export function Partners() {
  const partners = [
    { name: 'African Express', logo: '/assets/partners/african-express.png' },
    { name: 'Air Kenya', logo: '/assets/partners/air-kenya.png' },
    { name: 'British Airways', logo: '/assets/partners/british-airways.png' },
    { name: 'EgyptAir', logo: '/assets/partners/egypt-air.png' },
    { name: 'Emirates', logo: '/assets/partners/emirates-airways.png' },
    { name: 'Ethiopian Airlines', logo: '/assets/partners/ethiopian-airlines.png' },
    { name: 'Jambojet', logo: '/assets/partners/jambo-jet.png' },
    { name: 'Kenya Airways', logo: '/assets/partners/kenya-airways.png' },
    { name: 'Qatar Airways', logo: '/assets/partners/qatar-airways.png' },
    { name: 'SafariLink', logo: '/assets/partners/safari-link.png' },
    { name: 'Skyward Express', logo: '/assets/partners/sky-ward.png' },
    { name: 'Uganda Airlines', logo: '/assets/partners/ugandan-airlines.png' },
  ];

  return (
    <section className="py-24 bg-white border-y border-neutral-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center flex flex-col items-center justify-center">
        <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-xs uppercase block">Network</span>
        <h2 className="text-4xl font-medium tracking-tight mt-4 text-[#1a1a1a] mb-8">
          Our Global <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Partners</span>
        </h2>
        <Link href="/partners" className="text-xs font-bold tracking-widest uppercase border-b-2 border-transparent hover:border-[#6b7b65] text-[#1a1a1a] hover:text-[#6b7b65] transition-colors pb-1">
          View all partners
        </Link>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Animated Marquee */}
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 px-8">
          {partners.map((partner, idx) => (
            <div key={idx} className="relative w-32 h-16 md:w-40 md:h-20 hover:scale-105 transition-transform duration-500 inline-block shrink-0">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
          {partners.map((partner, idx) => (
            <div key={`dup-${idx}`} className="relative w-32 h-16 md:w-40 md:h-20 hover:scale-105 transition-transform duration-500 inline-block shrink-0">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
