'use client';

import { useState } from 'react';
import { 
  Map, 
  Mountain, 
  Users, 
  Calendar, 
  Navigation, 
  Bus, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExpeditionManagerPage() {
  const [activeExpedition, setActiveExpedition] = useState(null);

  const expeditions = [
    { id: 1, title: 'Simien Mountains Trek', location: 'Ethiopia', date: 'Oct 2024', status: 'Confirming', participants: 12, guide: 'Zeleke B.' },
    { id: 2, title: 'Lalibela Cultural Discovery', location: 'Ethiopia', date: 'Sept 2024', status: 'Full', participants: 18, guide: 'Hanna T.' },
    { id: 3, title: 'Mt. Kenya Expedition', location: 'Kenya', date: 'Aug 2024', status: 'Open', participants: 8, guide: 'Davis K.' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">TESFA / EXPEDITIONS & TOURS</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Expeditions <span className="font-light italic text-neutral-300">&</span> Logs
          </h1>
        </div>
        <button className="px-10 py-5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-all flex items-center gap-3">
          <Plus size={14} /> Design New Tour
        </button>
      </div>

      {/* Expedition Grid - High Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {expeditions.map((tour) => (
          <div key={tour.id} className="bg-white border border-neutral-200 p-12 hover:border-[#111111] hover:shadow-2xl transition-all duration-700 group relative overflow-hidden">
             <div className="flex justify-between items-start mb-12">
                <div className={`px-4 py-1.5 text-[8px] font-bold uppercase tracking-widest ${
                  tour.status === 'Full' ? 'bg-[#111111] text-white' : 'bg-[#6b7b65] text-white'
                }`}>
                  {tour.status}
                </div>
                <Mountain size={18} className="text-neutral-200 group-hover:text-[#6b7b65] transition-colors" />
             </div>
             
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">{tour.location}</p>
             <h3 className="text-2xl font-bold text-[#111111] mb-12 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>{tour.title}</h3>
             
             <div className="space-y-6 pt-10 border-t border-neutral-50">
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                  <span className="text-neutral-400">Date</span>
                  <span className="text-[#111111]">{tour.date}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                  <span className="text-neutral-400">Group Size</span>
                  <span className="text-[#111111]">{tour.participants} PAX</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                  <span className="text-neutral-400">Lead Guide</span>
                  <span className="text-[#6b7b65]">{tour.guide}</span>
                </div>
             </div>
             
             <button className="w-full mt-12 py-5 border border-neutral-100 text-[9px] font-bold uppercase tracking-widest text-neutral-400 group-hover:bg-[#111111] group-hover:text-white transition-all">
                Manage Logistics
             </button>
          </div>
        ))}
      </div>

      {/* Expedition Intelligence - DARK GLASSY */}
      <div className="bg-[#111111]/95 backdrop-blur-xl p-20 text-white grid grid-cols-1 lg:grid-cols-2 gap-20 relative overflow-hidden shadow-2xl">
         <div className="relative z-10 space-y-12">
            <div className="w-12 h-12 bg-[#6b7b65]/20 flex items-center justify-center text-[#6b7b65]">
               <Navigation size={24} />
            </div>
            <h2 className="text-5xl font-bold tracking-tighter leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Operational <span className="text-[#6b7b65] italic text-4xl">Excellence</span><br/>in the Highlands
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm italic">
              "Manage local vendor partnerships, 4x4 transport logistics, and high-altitude gear checklists for Tesfa's signature Ethiopian cultural tours."
            </p>
         </div>
         <div className="relative z-10 flex flex-col justify-center gap-12">
            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7b65] mb-4">Vendor Health</p>
                  <p className="text-5xl font-bold tracking-tighter">Gold</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7b65] mb-4">Safety Score</p>
                  <p className="text-5xl font-bold tracking-tighter">100%</p>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#6b7b65]/5 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4" />
      </div>

      {/* Safety & Compliance Section */}
      <div className="p-12 bg-white border border-neutral-200 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-12">
            <div className="w-12 h-12 bg-neutral-50 flex items-center justify-center text-[#6b7b65]">
               <ShieldCheck size={24} />
            </div>
            <div>
               <h4 className="text-lg font-bold text-[#111111]">Safety & Insurance Sync</h4>
               <p className="text-sm text-neutral-400 font-light italic mt-1">Global travel insurance mandates for all participants are 100% verified for upcoming Q3 expeditions.</p>
            </div>
         </div>
         <CheckCircle2 size={24} className="text-[#6b7b65]" />
      </div>
    </div>
  );
}
