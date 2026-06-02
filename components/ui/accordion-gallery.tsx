'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const itemsArr = [
  {
    id: 1,
    url: '/assets/flight1.jpg',
    title: 'Global Connectivity',
    description: 'Experience seamless connections across continents with our premium airline partners, bringing the world closer.',
  },
  {
    id: 2,
    url: '/assets/flight2.jpg',
    title: 'Luxury in the Skies',
    description: "Enjoy unparalleled comfort and world-class service as you soar above the clouds.",
  },
  {
    id: 3,
    url: '/assets/flight3.jpg',
    title: 'Modern Aviation',
    description: 'Fly on the newest, most advanced aircraft designed for safety, speed, and environmental efficiency.',
  },
  {
    id: 4,
    url: '/assets/flight4.jpg',
    title: 'Takeoff to Adventure',
    description: 'Your journey begins the moment you leave the runway. Prepare for unforgettable destinations.',
  },
  {
    id: 5,
    url: '/assets/flight5.jpg',
    title: 'Window Seat Views',
    description: 'Witness breathtaking sunrises, majestic mountain peaks, and stunning cityscapes from 35,000 feet.',
  },
  {
    id: 6,
    url: '/assets/flight6.jpg',
    title: 'Corporate Travel Solutions',
    description: 'Streamline your business trips with priority boarding, lounge access, and dedicated support.',
  },
  {
    id: 7,
    url: '/assets/flight7.jpg',
    title: 'Safe Arrivals',
    description: 'Relax knowing you are in the hands of experienced pilots and top-tier aviation professionals.',
  }
];

function Gallery({
  items,
  setIndex,
  setOpen,
  index,
}: {
  items: typeof itemsArr;
  setIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
  index: number;
}) {
  return (
    <div className='relative w-fit md:gap-2 gap-1 flex'>
      {items.map((item, i) => {
        return (
          <motion.img
            whileTap={{ scale: 0.95 }}
            className={`rounded-none ${
              index === i ? 'w-[200px] xl:w-[250px]' : 'xl:w-[50px] md:w-[30px] sm:w-[20px] w-[14px]'
            } h-[140px] md:h-[200px] shrink-0 object-cover transition-[width] ease-in-out duration-300 cursor-pointer shadow-lg`}
            key={item.id}
            onMouseEnter={() => {
              setIndex(i);
            }}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            src={item.url}
            layoutId={`gallery-${item.id}`}
          />
        );
      })}
    </div>
  );
}

export default function AccordionGallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className='relative'>
      <Gallery items={itemsArr} index={index} setIndex={setIndex} setOpen={setOpen} />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key='overlay'
            className='bg-black/60 backdrop-blur-md fixed inset-0 z-[100] w-full h-full flex items-center justify-center'
            onClick={() => {
              setOpen(false);
            }}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <motion.div
                layoutId={`gallery-${itemsArr[index].id}`}
                className='w-[90vw] h-[80vh] md:w-[900px] md:h-[500px] lg:w-[1100px] lg:h-[600px] rounded-none relative cursor-default overflow-hidden shadow-2xl bg-white flex flex-col md:flex-row'
              >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full shrink-0 bg-[#f4f2ea]">
                  <img
                    src={itemsArr[index].url}
                    alt={itemsArr[index].title}
                    className='h-full w-full object-cover'
                  />
                </div>

                {/* Content Section */}
                <div className='flex-1 bg-white p-8 md:p-12 flex flex-col relative'>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-mono text-slate-800 bg-slate-100 px-3 py-1.5 font-bold tracking-wider uppercase">Gallery View</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                      className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 transition-colors"
                    >
                      <X size={16} strokeWidth={2}/>
                    </button>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="text-[10px] text-[#6b7b65] font-mono uppercase tracking-widest mb-2">FEATURED HIGHLIGHT</div>
                    <motion.h1
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className='text-3xl lg:text-4xl font-medium mb-4 text-slate-900 tracking-tight'
                    >
                      {itemsArr[index].title}
                    </motion.h1>
                    <div className="w-full h-px bg-slate-200 mb-6"></div>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className='text-base lg:text-lg leading-relaxed text-slate-600 font-light'
                    >
                      {itemsArr[index].description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                      className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4"
                    >
                      <a href="/destinations" className="text-slate-700 hover:text-[#6b7b65] text-[11px] flex items-center gap-1 font-medium transition-colors">
                        <span className="text-sm leading-none mb-0.5">&#x21aa;</span> Explore options
                      </a>
                      <a href="/bookings" className="bg-[#1a1a1a] hover:bg-[#6b7b65] text-white text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 transition-colors">
                        Book Flights
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
