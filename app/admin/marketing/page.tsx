'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar, Zap, Megaphone, ArrowUpRight, Globe, Mail, MessageSquare, Activity, Plane, Award, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('deals');

  const routeDeals = [
    { id: 1, route: 'Nairobi → Addis Ababa', price: '$300', status: 'Featured', partner: 'Ethiopian Airlines', performance: '+34%' },
    { id: 2, route: 'Nairobi → Asmara', price: '$420', status: 'Specialty', partner: 'Eritrean Airlines', performance: '+12%' },
    { id: 3, route: 'Nairobi → Juba', price: '$380', status: 'Regional', partner: 'Tarco Air', performance: '+18%' },
  ];

  const partners = [
    { name: 'Qatar Airways', deals: 12, status: 'Active' },
    { name: 'Emirates', deals: 8, status: 'Active' },
    { name: 'Kenya Airways', deals: 15, status: 'Active' },
    { name: 'Ethiopian Airlines', deals: 24, status: 'Active' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">TESFA / PROMOTIONS CONTROL</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Growth <span className="font-light italic text-neutral-300">&</span> Reach
          </h1>
        </div>
        <button className="px-10 py-5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-all flex items-center gap-3">
          <Plus size={14} /> Create Global Promo
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-16 border-b border-neutral-100">
        {['Route Promos', 'Airline Partnerships', 'Campaign Analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
            className={`pb-8 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${
              activeTab === tab.toLowerCase().replace(' ', '-') ? 'text-[#111111] font-black' : 'text-neutral-300 hover:text-neutral-500'
            }`}
          >
            {tab}
            {activeTab === tab.toLowerCase().replace(' ', '-') && (
              <motion.div layoutId="marketTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6b7b65]" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'route-promos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {routeDeals.map((deal) => (
            <div key={deal.id} className="bg-white border border-neutral-200 p-12 hover:border-[#111111] hover:shadow-2xl transition-all duration-700 group relative">
              <div className="flex justify-between items-start mb-12">
                 <div className="px-4 py-1.5 bg-[#6b7b65] text-white text-[8px] font-bold uppercase tracking-widest">
                   {deal.status}
                 </div>
                 <Plane size={18} className="text-neutral-200 group-hover:text-[#6b7b65] transition-colors" />
              </div>
              
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">{deal.partner}</p>
              <h3 className="text-3xl font-bold text-[#111111] mb-2 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>{deal.route}</h3>
              <p className="text-5xl font-bold text-[#6b7b65] mb-12">{deal.price}</p>
              
              <div className="space-y-4 pt-10 border-t border-neutral-50">
                 <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                   <span>Demand Volume</span>
                   <span className="text-[#111111]">{deal.performance}</span>
                 </div>
                 <div className="h-1 bg-neutral-50 w-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: deal.performance }} className="h-full bg-[#6b7b65]" />
                 </div>
              </div>
              
              <button className="w-full mt-12 py-5 border border-neutral-100 text-[9px] font-bold uppercase tracking-widest text-neutral-400 hover:bg-[#111111] hover:text-white transition-all">
                 Adjust Seat Allocation
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'airline-partnerships' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 shadow-xl overflow-hidden">
             {partners.map((partner) => (
               <div key={partner.name} className="bg-white p-12 hover:bg-[#fafafa] transition-all">
                  <div className="flex justify-between items-center mb-10">
                    <Award size={24} className="text-[#6b7b65]" />
                    <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">{partner.status}</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#111111] tracking-tighter mb-2">{partner.name}</h4>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{partner.deals} Active Promos</p>
               </div>
             ))}
          </div>

          <div className="bg-[#111111]/95 backdrop-blur-xl p-20 text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-10">
                   <div className="w-12 h-12 bg-[#6b7b65]/20 flex items-center justify-center text-[#6b7b65]">
                      <Globe size={24} />
                   </div>
                   <h2 className="text-5xl font-bold tracking-tighter leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                     Strategic <span className="text-[#6b7b65] italic text-4xl">IATA</span> Partnership<br/>Growth Engine
                   </h2>
                   <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm italic">
                     "Leverage Qatar Airways and Ethiopian Airlines APIs to automatically sync market-beating rates for the Nairobi-Addis corridor."
                   </p>
                </div>
                <div className="flex flex-col justify-center gap-12">
                   <div className="space-y-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7b65] mb-4">IATA Account Health</p>
                      <div className="flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-xl font-bold tracking-tighter uppercase">Fully Compliant</span>
                      </div>
                   </div>
                   <button className="px-12 py-5 bg-[#6b7b65] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-all self-start">
                      Sync Partnership Rates
                   </button>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6b7b65]/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
          </div>
        </div>
      )}

      {/* Intelligence Insight - Glassy */}
      <div className="p-12 bg-white border border-neutral-200 flex items-center justify-between shadow-sm group">
         <div className="flex items-center gap-12">
            <div className="w-12 h-12 bg-neutral-50 flex items-center justify-center text-[#6b7b65]">
               <Zap size={20} />
            </div>
            <div>
               <h4 className="text-lg font-bold text-[#111111]">Intelligence Recommendation</h4>
               <p className="text-sm text-neutral-400 font-light italic mt-1">Reallocate 15% of marketing spend from Ethiopian Facebook Ads to Tarco Air WhatsApp CRM.</p>
            </div>
         </div>
         <ArrowUpRight size={24} className="text-neutral-200 group-hover:text-[#6b7b65] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </div>
    </div>
  );
}
