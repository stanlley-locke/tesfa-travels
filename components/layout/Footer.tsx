'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React, { type FormEvent, useRef, useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, HeadphonesIcon, Facebook, Instagram, MessageCircle } from 'lucide-react';

const pathArr = [
  'M55.7447 0H15.3191L0 45.5836H18.2979L4.25532 81.7065H16.5957L5.95745 126L34.4681 82.9966L45.9574 126H120V0H104.681L104.255 110.519H58.2979L45.9574 64.5051H28.0851L42.9787 39.1331L61.7021 106.648H99.5745V0H80V94.6075H76.1702L55.7447 0Z',
  'M167.002 107.746C175.137 107.746 182.109 104.758 186.426 97.4531H207.178C200.371 114.719 186.592 125.676 167.666 125.676C143.594 125.676 124.834 106.916 124.834 82.8438C124.834 59.6016 143.262 39.5137 166.836 39.5137C192.402 39.5137 210 59.9336 210 84.6699C210 85.998 209.834 87.3262 209.834 88.6543H144.424C145.752 101.271 154.717 107.746 167.002 107.746ZM166.836 57.1113C156.543 57.1113 147.744 63.4199 145.088 73.5469H189.414C186.094 62.4238 178.291 57.1113 166.836 57.1113Z',
  'M244.512 60.2656L261.5 41L294 0V32L255.137 78.6934L291.494 125.344C291.494 125.51 291.66 125.51 291.66 125.676L291.826 125.842H266.758C266.758 125.842 266.758 125.842 266.592 125.676L244.346 97.1211H240.693L205 136.998H186.5L230.068 78.6934L199.5 40H225L225.254 40.3438L240.693 60.2656H244.512Z',
  'M337.978 126H296.142V0H315.898V39.0137H343L339 54.4531H315.898V109.072H337.978V126Z',
  'M455.019 39.3457H426.299C419.492 29.8828 409.697 25.4004 398.076 25.4004C377.49 25.4004 361.885 42.998 361.885 63.252C361.885 83.6719 376.826 101.934 398.076 101.934C409.033 101.934 419.16 98.2812 425.469 89.1504H454.189C443.232 113.057 424.805 125.84 398.408 125.84C363.047 125.84 337.48 97.2852 337.48 62.7539C337.48 29.2188 365.039 1.32812 398.574 1.32812C425.469 1.32812 443.896 15.1074 455.019 39.3457Z',
  'M495.693 39.6777C519.433 39.6777 539.023 58.1055 539.023 82.0117C539.023 106.748 521.094 125.84 496.025 125.84C472.119 125.84 453.359 106.25 453.359 82.5098C453.359 58.9355 472.285 39.6777 495.693 39.6777ZM496.191 106.914C511.133 106.914 519.267 96.123 519.267 81.8457C519.267 68.2324 509.805 58.4375 496.191 58.4375C482.246 58.4375 472.949 68.7305 472.949 82.5098C472.949 96.7871 481.25 106.914 496.191 106.914Z',
  'M539.023 82.5098C539.023 58.9355 557.617 39.6777 581.357 39.6777C590.488 39.6777 599.453 42.168 606.592 48.3105V0H625.185V125.84H606.592V116.543C599.287 122.354 590.488 125.674 581.357 125.674C557.119 125.674 539.023 106.25 539.023 82.5098ZM582.685 58.6035C569.238 58.6035 558.945 69.5605 558.945 82.8418C558.945 96.9531 569.736 106.748 583.515 106.748C596.963 106.748 605.762 95.791 605.762 83.0078C605.762 69.5605 596.465 58.6035 582.685 58.6035Z',
  'M666.76 108.138C674.817 108.138 681.722 105.162 685.997 97.8846H706.548C699.807 115.085 686.161 126 667.418 126C643.578 126 625 107.312 625 83.3308C625 60.177 643.249 40.1654 666.596 40.1654C691.915 40.1654 709.343 60.5077 709.343 85.15C709.343 86.4731 709.179 87.7962 709.179 89.1192H644.4C645.716 101.688 654.594 108.138 666.76 108.138ZM666.596 57.6962C656.402 57.6962 647.689 63.9808 645.058 74.0693H688.956C685.668 62.9885 677.94 57.6962 666.596 57.6962Z',
  'M775.138 110.619V126H700.166V114.092L747.517 55.3808H702.633V40H772.508V51.9077L724.17 110.619H775.138Z',
];

function GlobalClock({ city, timeZone }: { city: string, timeZone: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const int = setInterval(updateTime, 10000);
    return () => clearInterval(int);
  }, [timeZone]);

  return (
    <div className="flex flex-col border-b border-white/20 pb-2 group">
      <span className="text-sm font-mono text-white/60 mb-1">{time || '--:--'}</span>
      <span className="text-xl font-medium group-hover:text-white/80 transition-colors tracking-tight">{city}</span>
    </div>
  );
}

export function Footer() {
  const container = useRef<HTMLDivElement>(null);
  const [openPopup, setOpenPopUp] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const brandName = "TESFA TRAVELS";

  const variants = {
    visible: (i: number) => ({
      translateY: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
        duration: 0.6,
        delay: i * 0.05,
      },
    }),
    hidden: { translateY: 100, opacity: 0 },
  };

  const handleNewsLetterData = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    setOpenPopUp(true);
    target.reset();
    setTimeout(() => {
      setOpenPopUp(false);
    }, 2000);
  };

  return (
    <footer className='relative sm:pt-20 pt-12 bg-[#6b7b65] text-white border-t border-[#6b7b65] overflow-hidden' ref={container}>
      {/* Background Scrolling Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-100 select-none flex items-center overflow-hidden z-0">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 120 }}
          className="flex whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-[100vw] md:text-[25vw] font-black tracking-tighter leading-none text-white/5 px-8" style={{ fontFamily: 'var(--font-sans)' }}>
              TESFA TRAVELS 
            </span>
          ))}
        </motion.div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-start w-full gap-12'>
          <div className="flex-1 w-full max-w-2xl">
            <div className="flex items-center gap-5 mb-8">
              <div className="h-20 aspect-square flex-shrink-0 overflow-hidden">
                <img src="/assets/logo.png" alt="Tesfa Travels Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-white font-medium tracking-wide text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>Tesfa Travels</span>
            </div>
            <h2 className='text-4xl sm:text-5xl font-medium tracking-tight leading-tight mb-8' style={{ fontFamily: 'var(--font-sans)' }}>
              Flying is our business,<br />
              <span className="font-light italic text-white/80" style={{ fontFamily: 'var(--font-serif)' }}>service is our asset.</span>
            </h2>
            <div className='pt-2 pb-12'>
              <p className='md:text-xl text-lg mb-6 text-white/80'>Sign up for exclusive travel deals & updates*</p>
              <form
                onSubmit={handleNewsLetterData}
                className='relative flex items-center border border-white/30 hover:border-white transition-colors rounded-none overflow-hidden h-14'
              >
                <input
                  type='email'
                  name='newsletter_email'
                  required
                  className='flex-1 border-none bg-transparent py-3 px-6 text-lg text-white focus:outline-none placeholder:text-white/50'
                  placeholder='Your Email *'
                />
                <button
                  type='submit'
                  className='h-full px-8 bg-white text-[#6b7b65] hover:bg-neutral-100 transition-colors duration-300 font-bold tracking-widest uppercase text-xs'
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className='flex flex-wrap gap-12 md:gap-16 md:mt-4'>
            <div>
              <h4 className='text-xs font-bold tracking-widest text-white/50 mb-6 uppercase'>Explore</h4>
              <ul className='space-y-4'>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/'>Home</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/destinations'>Destinations</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/destinations?tab=flights'>Book Flights</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/partners'>Our Partners</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/blog'>Travel Journal (Blog)</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/offers'>Offers & Promotions</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/branches'>Our Branches</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/contact'>Contact</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className='text-xs font-bold tracking-widest text-white/50 mb-6 uppercase'>Services</h4>
              <ul className='space-y-4'>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/air'>Air Ticketing</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/hotel'>Hotels</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/visa'>Visas</Link>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <Link href='/corporate'>Corporate</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-xs font-bold tracking-widest text-white/50 mb-6 uppercase'>Social</h4>
              <ul className='space-y-6'>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <a href='#' target='_blank' rel='noreferrer noopener' className='flex items-center gap-3'>
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <a href='#' target='_blank' rel='noreferrer noopener' className='flex items-center gap-3'>
                    <Facebook size={20} />
                    Facebook
                  </a>
                </li>
                <li className='text-lg font-medium hover:text-white/70 transition-colors'>
                  <a href='#' target='_blank' rel='noreferrer noopener' className='flex items-center gap-3'>
                    <Instagram size={20} />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      {/* Global Hubs & Trust Signals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20 pt-16 border-t border-white/20">
          <div>
            <h4 className='text-xs font-bold tracking-widest text-white/50 mb-10 uppercase'>Global Hubs</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <GlobalClock city="Addis Ababa" timeZone="Africa/Addis_Ababa" />
              <GlobalClock city="Dubai" timeZone="Asia/Dubai" />
              <GlobalClock city="London" timeZone="Europe/London" />
              <GlobalClock city="New York" timeZone="America/New_York" />
            </div>
          </div>
          <div>
            <h4 className='text-xs font-bold tracking-widest text-white/50 mb-10 uppercase'>Accreditation & Trust</h4>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex items-center gap-3 border border-white/20 px-4 py-3 rounded-none bg-white/5 backdrop-blur-sm">
                <ShieldCheck className="text-white" size={20} />
                <span className="text-sm font-bold tracking-wide uppercase">IATA Accredited</span>
              </div>
              <div className="flex items-center gap-3 border border-white/20 px-4 py-3 rounded-none bg-white/5 backdrop-blur-sm">
                <CreditCard className="text-white" size={20} />
                <span className="text-sm font-bold tracking-wide uppercase">Secure Payments</span>
              </div>
              <div className="flex items-center gap-3 border border-white/20 px-4 py-3 rounded-none bg-white/5 backdrop-blur-sm">
                <HeadphonesIcon className="text-white" size={20} />
                <span className="text-sm font-bold tracking-wide uppercase">24/7 Global Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex md:flex-row flex-col-reverse gap-6 justify-between py-8 text-sm border-t border-white/10 mt-16 pt-8'>
          <span className='text-white/60 font-medium'>
            &copy; {new Date().getFullYear()} Tesfa Travels. All Rights Reserved.
          </span>
          <div className="flex gap-8">
            <Link href='/privacy' className='font-semibold text-white/80 hover:text-white transition-colors'>
              Privacy Policy
            </Link>
            <Link href='/terms' className='font-semibold text-white/80 hover:text-white transition-colors'>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
