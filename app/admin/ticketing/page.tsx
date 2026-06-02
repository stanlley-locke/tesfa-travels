'use client';

import { useState } from 'react';
import { 
  Plane, 
  Award, 
  DollarSign, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function IATATicketingPage() {
  const [activeView, setActiveView] = useState('active-tickets');

  const tickets = [
    { id: 'PNR-8821', client: 'Grace Wanjiru', carrier: 'Ethiopian Airlines', route: 'NBO → ADD', status: 'Issued', date: '2024-05-10', commission: 'KSh 4,200' },
    { id: 'PNR-4410', client: 'James Omollo', carrier: 'Qatar Airways', route: 'NBO → DOH', status: 'Pending', date: '2024-05-09', commission: 'KSh 8,500' },
    { id: 'PNR-2291', client: 'Ahmed Hassan', carrier: 'Tarco Air', route: 'NBO → JUB', status: 'Issued', date: '2024-05-08', commission: 'KSh 3,800' },
    { id: 'PNR-1102', client: 'Lisa Chen', carrier: 'Kenya Airways', route: 'NBO → KGL', status: 'Cancelled', date: '2024-05-07', commission: 'KSh 0' },
  ];

  const commissions = [
    { carrier: 'Ethiopian Airlines', volume: 'KSh 1.2M', growth: '+15%', status: 'Primary' },
    { carrier: 'Qatar Airways', volume: 'KSh 840k', growth: '+8%', status: 'Growth' },
    { carrier: 'Kenya Airways', volume: 'KSh 2.1M', growth: '+24%', status: 'Strategic' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">TESFA / IATA ACCREDITED PORTAL</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Ticketing <span className="font-light italic text-neutral-300">&</span> Flow
          </h1>
        </div>
        <div className="flex gap-4">
           <button className="px-10 py-5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-all flex items-center gap-3">
            <Plus size={14} /> Issue New Ticket
          </button>
        </div>
      </div>

      {/* Metrics Section - High Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200 shadow-xl overflow-hidden">
        {commissions.map((c) => (
          <div key={c.carrier} className="bg-white p-12 hover:bg-[#fafafa] transition-all group">
             <div className="flex justify-between items-center mb-8">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#6b7b65]">{c.status}</span>
                <TrendingUp size={16} className="text-neutral-200 group-hover:text-[#6b7b65] transition-colors" />
             </div>
             <h4 className="text-lg font-bold text-[#111111] tracking-tighter mb-1">{c.carrier}</h4>
             <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-[#111111]">{c.volume}</p>
                <span className="text-[10px] font-bold text-[#6b7b65]">{c.growth}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Main Ticketing Table - Glassy */}
      <div className="space-y-12">
         <div className="flex gap-16 border-b border-neutral-100">
            {['active-tickets', 'commission-reports', 'pnr-logs'].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`pb-8 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${
                  activeView === view ? 'text-[#111111] font-black' : 'text-neutral-300 hover:text-neutral-500'
                }`}
              >
                {view.replace('-', ' ')}
                {activeView === view && (
                  <motion.div layoutId="ticketingTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6b7b65]" />
                )}
              </button>
            ))}
         </div>

         <div className="bg-white/40 backdrop-blur-md border border-neutral-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-200">
                  <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-neutral-400">PNR & Client</th>
                  <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-neutral-400">Carrier & Route</th>
                  <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-neutral-400 text-center">Status</th>
                  <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-neutral-400 text-right">Agency Commission</th>
                  <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {tickets.map((t) => (
                  <tr key={t.id} className="group hover:bg-white transition-all duration-500">
                    <td className="px-10 py-10">
                       <div>
                          <h4 className="text-sm font-bold text-[#111111] mb-1">{t.id}</h4>
                          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{t.client}</p>
                       </div>
                    </td>
                    <td className="px-10 py-10">
                       <div>
                          <h4 className="text-sm font-bold text-[#111111] mb-1">{t.carrier}</h4>
                          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{t.route}</p>
                       </div>
                    </td>
                    <td className="px-10 py-10 text-center">
                       <div className="flex items-center justify-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            t.status === 'Issued' ? 'bg-[#6b7b65]' : t.status === 'Pending' ? 'bg-amber-400' : 'bg-red-500'
                          }`} />
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${
                            t.status === 'Issued' ? 'text-[#6b7b65]' : t.status === 'Pending' ? 'text-amber-600' : 'text-red-500'
                          }`}>
                            {t.status}
                          </span>
                       </div>
                    </td>
                    <td className="px-10 py-10 text-right text-sm font-bold text-[#111111]">{t.commission}</td>
                    <td className="px-10 py-10 text-right">
                       <div className="flex justify-end gap-6 text-neutral-200 group-hover:text-[#111111] transition-colors">
                          <button className="hover:text-[#6b7b65] transition-colors"><FileText size={16} /></button>
                          <button className="hover:text-[#6b7b65] transition-colors"><MoreHorizontal size={16} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>

      {/* IATA Integrity - DARK GLASSY */}
      <div className="bg-[#111111]/95 backdrop-blur-xl p-20 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
               <div className="w-12 h-12 bg-[#6b7b65]/20 flex items-center justify-center text-[#6b7b65]">
                  <Award size={24} />
               </div>
               <h2 className="text-5xl font-bold tracking-tighter leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                 Professional <span className="text-[#6b7b65] italic text-4xl">Accountability</span><br/>& Governance
               </h2>
               <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm italic">
                 "As an IATA Authorized Agent, Tesfa Travel ensures every ticket issuance follows global standards for secure, professional travel management."
               </p>
            </div>
            <div className="flex flex-col justify-center space-y-12">
               <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7b65] mb-4">Security Compliance</p>
                    <p className="text-4xl font-bold tracking-tighter">100%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7b65] mb-4">Audit Rating</p>
                    <p className="text-4xl font-bold tracking-tighter">Gold Tier</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="absolute bottom-0 left-0 w-full h-1 bg-[#6b7b65]/20" />
      </div>
    </div>
  );
}
