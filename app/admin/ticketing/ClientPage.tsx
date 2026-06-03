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

import { Ticket } from '@prisma/client';
import { createTicket, updateTicketStatus, deleteTicket } from '@/app/actions/tickets';

export default function IATATicketingPage({ initialTickets = [] }: { initialTickets: any[] }) {
  const [activeView, setActiveView] = useState('active-tickets');
  const [timeFilter, setTimeFilter] = useState('ALL_TIME');
  const [tickets, setTickets] = useState(initialTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pnr: '',
    airline: '',
    passengerName: '',
    route: '',
    commission: 0,
    status: 'PENDING'
  });

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await createTicket(formData);
    if (result.success && result.data) {
      setTickets([result.data, ...tickets]);
      setIsModalOpen(false);
      setFormData({ pnr: '', airline: '', passengerName: '', route: '', commission: 0, status: 'PENDING' });
    }
    setIsSubmitting(false);
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'PENDING' ? 'ISSUED' : currentStatus === 'ISSUED' ? 'CANCELLED' : 'PENDING';
    
    // Optimistic update
    setTickets(tickets.map(t => t.id === id ? { ...t, status: nextStatus } : t));
    
    await updateTicketStatus(id, nextStatus);
  };

  const filteredTickets = tickets.filter((t: any) => {
    if (timeFilter === 'ALL_TIME') return true;
    const tDate = new Date(t.createdAt);
    const now = new Date();
    if (timeFilter === 'THIS_MONTH') {
      return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    }
    if (timeFilter === 'THIS_QUARTER') {
      const q = Math.floor(now.getMonth() / 3);
      const tQ = Math.floor(tDate.getMonth() / 3);
      return q === tQ && tDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const commissionMap = filteredTickets.reduce((acc: any, ticket: any) => {
    if (!acc[ticket.airline]) {
      acc[ticket.airline] = { carrier: ticket.airline, volume: 0, count: 0 };
    }
    if (ticket.status !== 'CANCELLED') {
      acc[ticket.airline].volume += ticket.commission;
    }
    acc[ticket.airline].count += 1;
    return acc;
  }, {});

  const totalVolume = filteredTickets.reduce((sum: number, t: any) => sum + (t.status !== 'CANCELLED' ? t.commission : 0), 0);
  const activeTicketsCount = filteredTickets.filter((t: any) => t.status !== 'CANCELLED').length;
  
  const sortedCarriers = Object.values(commissionMap).sort((a: any, b: any) => b.volume - a.volume);
  const topCarrier: any = sortedCarriers.length > 0 ? sortedCarriers[0] : null;

  const displayMetrics = [
    { label: 'Total Commission', value: `KSh ${totalVolume.toLocaleString()}`, detail: 'From Pipeline', status: 'Revenue' },
    { label: 'Active Pipeline', value: activeTicketsCount.toString(), detail: 'Pending & Issued', status: 'Volume' },
    { label: 'Top Carrier', value: topCarrier ? topCarrier.carrier : 'N/A', detail: topCarrier ? `KSh ${topCarrier.volume.toLocaleString()}` : '0 KSh', status: 'Leader' },
  ];

  const displayedTickets = filteredTickets.filter((t: any) => {
    if (activeView === 'active-tickets') return t.status !== 'CANCELLED';
    if (activeView === 'commission-reports') return t.status === 'ISSUED';
    return true; // 'pnr-logs' shows all
  });

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
        <div className="flex gap-4 items-center">
           <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-6 py-4 bg-transparent border-b border-neutral-300 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:border-[#6b7b65] transition-colors outline-none cursor-pointer"
           >
              <option value="ALL_TIME">All Time</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="THIS_QUARTER">This Quarter</option>
           </select>
           <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-all flex items-center gap-3">
            <Plus size={14} /> Issue New Ticket
          </button>
        </div>
      </div>

      {/* Metrics Section - High Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#7a8a74] border border-[#7a8a74] shadow-xl overflow-hidden">
        {displayMetrics.map((m: any, idx: number) => (
          <div key={`metric-${idx}`} className="bg-[#6b7b65] p-12 hover:bg-[#5a6a54] transition-all group text-white">
             <div className="flex justify-between items-center mb-8">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#f3e5ab]">{m.status}</span>
                <TrendingUp size={16} className="text-white/30 group-hover:text-[#f3e5ab] transition-colors" />
             </div>
             <h4 className="text-lg font-bold text-white tracking-tighter mb-1">{m.label}</h4>
             <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-white">{m.value}</p>
                <span className="text-[10px] font-bold text-[#f3e5ab]">{m.detail}</span>
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

         <div className="bg-white/40 backdrop-blur-md border border-neutral-200 shadow-sm overflow-x-auto w-full">
            {activeView === 'commission-reports' ? (
              <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-[#6b7b65]/5 border-b border-[#6b7b65]/20">
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-[#6b7b65]">Carrier</th>
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-[#6b7b65] text-center">Total Tickets (Issued)</th>
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-[#6b7b65] text-right">Total Commission</th>
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-[#6b7b65] text-right">Avg. Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {sortedCarriers.map((c: any) => (
                    <tr key={c.carrier} className="group hover:bg-[#6b7b65]/5 transition-all duration-500">
                      <td className="px-10 py-10">
                         <h4 className="text-sm font-bold text-[#111111]">{c.carrier}</h4>
                      </td>
                      <td className="px-10 py-10 text-center">
                         <span className="text-lg font-bold text-[#111111]">{c.count}</span>
                      </td>
                      <td className="px-10 py-10 text-right">
                         <span className="text-lg font-bold text-[#6b7b65]">KSh {c.volume.toLocaleString()}</span>
                      </td>
                      <td className="px-10 py-10 text-right">
                         <span className="text-sm font-bold text-neutral-400">KSh {(c.volume / c.count || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeView === 'pnr-logs' ? (
              <div className="p-8 space-y-4">
                {displayedTickets.map((t: any) => (
                  <div key={t.id} className="flex items-center justify-between p-4 border border-neutral-100 hover:border-[#6b7b65]/30 transition-colors font-mono text-xs">
                    <div className="flex items-center gap-8">
                      <span className="text-neutral-400">{new Date(t.createdAt).toISOString()}</span>
                      <span className="font-bold text-[#111111]">{t.pnr}</span>
                      <span className="text-[#6b7b65]">{t.status}</span>
                    </div>
                    <div className="flex items-center gap-8 text-neutral-500">
                      <span>{t.airline}</span>
                      <span>{t.passengerName}</span>
                      <span>KSh {t.commission}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-[#6b7b65] text-white border-b border-[#7a8a74]">
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-white/90">PNR & Client</th>
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-white/90">Carrier & Route</th>
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-white/90 text-center">Status</th>
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-white/90 text-right">Agency Commission</th>
                    <th className="px-10 py-8 text-[9px] font-bold uppercase tracking-widest text-white/90 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {displayedTickets.map((t: any) => (
                    <tr key={t.id} className="group hover:bg-white transition-all duration-500">
                      <td className="px-10 py-10">
                         <div>
                            <h4 className="text-sm font-bold text-[#111111] mb-1">{t.pnr}</h4>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{t.passengerName}</p>
                         </div>
                      </td>
                      <td className="px-10 py-10">
                         <div>
                            <h4 className="text-sm font-bold text-[#111111] mb-1">{t.airline}</h4>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{t.route}</p>
                         </div>
                      </td>
                      <td className="px-10 py-10 text-center">
                         <button onClick={() => handleStatusUpdate(t.id, t.status)} className="flex items-center justify-center gap-2 mx-auto hover:scale-105 transition-transform">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              t.status === 'ISSUED' ? 'bg-[#6b7b65]' : t.status === 'PENDING' ? 'bg-amber-400' : 'bg-red-500'
                            }`} />
                            <span className={`text-[9px] font-bold uppercase tracking-widest ${
                              t.status === 'ISSUED' ? 'text-[#6b7b65]' : t.status === 'PENDING' ? 'text-amber-600' : 'text-red-500'
                            }`}>
                              {t.status}
                            </span>
                         </button>
                      </td>
                      <td className="px-10 py-10 text-right text-sm font-bold text-[#111111]">KSh {t.commission}</td>
                      <td className="px-10 py-10 text-right">
                         <div className="flex justify-end gap-6 text-neutral-200 group-hover:text-[#111111] transition-colors">
                            <button className="hover:text-red-500 transition-colors" onClick={async () => {
                              await deleteTicket(t.id);
                              setTickets(tickets.filter((ticket: any) => ticket.id !== t.id));
                            }}><FileText size={16} /></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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

      {/* Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 max-w-md w-full relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-black">✕</button>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Issue New Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <input type="text" placeholder="PNR (e.g. PNR-1234)" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.pnr} onChange={e => setFormData({...formData, pnr: e.target.value})} />
              <input type="text" placeholder="Passenger Name" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.passengerName} onChange={e => setFormData({...formData, passengerName: e.target.value})} />
              <input type="text" placeholder="Airline Carrier" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.airline} onChange={e => setFormData({...formData, airline: e.target.value})} />
              <input type="text" placeholder="Route (e.g. NBO -> LHR)" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} />
              <input type="number" placeholder="Commission (KSh)" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.commission || ''} onChange={e => setFormData({...formData, commission: Number(e.target.value)})} />
              
              <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-colors disabled:opacity-50">
                {isSubmitting ? 'Saving...' : 'Issue Ticket'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
