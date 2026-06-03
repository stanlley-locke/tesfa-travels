'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight, 
  ArrowDownRight, 
  Briefcase,
  Plane,
  FileText,
  Users,
  Activity,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsClientPage({ initialData }: { initialData: any }) {
  const [timeframe, setTimeframe] = useState('ALL_TIME');
  const { tickets, visas, bookings, clients, inquiries } = initialData;

  const filteredData = useMemo(() => {
    const filterByTime = (items: any[]) => {
      if (timeframe === 'ALL_TIME') return items;
      const now = new Date();
      return items.filter(item => {
        const d = new Date(item.createdAt);
        if (timeframe === 'MONTHLY') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        if (timeframe === 'QUARTERLY') return Math.floor(d.getMonth() / 3) === Math.floor(now.getMonth() / 3) && d.getFullYear() === now.getFullYear();
        if (timeframe === 'YEARLY') return d.getFullYear() === now.getFullYear();
        return true;
      });
    };

    return {
      tickets: filterByTime(tickets),
      visas: filterByTime(visas),
      bookings: filterByTime(bookings),
      clients: filterByTime(clients),
      inquiries: filterByTime(inquiries)
    };
  }, [timeframe, tickets, visas, bookings, clients, inquiries]);

  // Revenue Calculations
  const ticketRevenue = filteredData.tickets.reduce((sum: number, t: any) => sum + (t.status !== 'CANCELLED' ? t.commission : 0), 0);
  const visaRevenue = filteredData.visas.reduce((sum: number, v: any) => sum + (v.fee || 0), 0);
  const bookingRevenue = filteredData.bookings.reduce((sum: number, b: any) => sum + (b.status !== 'CANCELLED' ? b.amount : 0), 0);
  const totalRevenue = ticketRevenue + visaRevenue + bookingRevenue;

  // Pipeline Calculations
  const activeTickets = filteredData.tickets.filter((t: any) => t.status !== 'CANCELLED').length;
  const activeVisas = filteredData.visas.filter((v: any) => v.status !== 'Approved' && v.status !== 'Delivered').length;
  const activeInquiries = filteredData.inquiries.filter((i: any) => i.status !== 'RESPONDED').length;
  const totalPipeline = activeTickets + activeVisas + activeInquiries;

  // Breakdown Logic
  const carrierMap = filteredData.tickets.reduce((acc: any, t: any) => {
    if (t.status === 'CANCELLED') return acc;
    if (!acc[t.airline]) acc[t.airline] = { count: 0, revenue: 0 };
    acc[t.airline].count += 1;
    acc[t.airline].revenue += t.commission;
    return acc;
  }, {});
  const topCarriers = Object.entries(carrierMap).sort((a: any, b: any) => b[1].revenue - a[1].revenue).slice(0, 4);

  const visaCountryMap = filteredData.visas.reduce((acc: any, v: any) => {
    if (!acc[v.country]) acc[v.country] = { count: 0, revenue: 0 };
    acc[v.country].count += 1;
    acc[v.country].revenue += (v.fee || 0);
    return acc;
  }, {});
  const topCountries = Object.entries(visaCountryMap).sort((a: any, b: any) => b[1].revenue - a[1].revenue).slice(0, 4);

  // Dynamic Intelligence Metrics
  const completedItems = [
    ...filteredData.tickets.filter((t: any) => t.status === 'ISSUED'),
    ...filteredData.visas.filter((v: any) => v.status === 'Approved' || v.status === 'Delivered')
  ];
  
  const avgConversionTimeHrs = completedItems.length > 0 
    ? completedItems.reduce((sum: number, item: any) => sum + (new Date(item.updatedAt).getTime() - new Date(item.createdAt).getTime()), 0) / completedItems.length / (1000 * 60 * 60)
    : 0;

  const avgInquiryValue = filteredData.inquiries.length > 0 ? (totalRevenue / filteredData.inquiries.length) : 0;
  
  const topRevenueEntity = (topCarriers[0]?.[1] as any)?.revenue > (topCountries[0]?.[1] as any)?.revenue ? topCarriers[0] : topCountries[0];
  const marketPresence = totalRevenue > 0 && topRevenueEntity ? ((topRevenueEntity[1] as any).revenue / totalRevenue) * 100 : 0;
  const topEntityName = topRevenueEntity ? topRevenueEntity[0] : 'local';

  const acquisitionIndex = filteredData.inquiries.length > 0 ? (filteredData.clients.length / filteredData.inquiries.length) * 100 : 0;
  const conversionRate = totalPipeline > 0 ? (completedItems.length / (totalPipeline + completedItems.length)) * 100 : 0;

  const cancelledCount = filteredData.tickets.filter((t: any) => t.status === 'CANCELLED').length + filteredData.bookings.filter((b: any) => b.status === 'CANCELLED').length;
  const totalTrackedItems = filteredData.tickets.length + filteredData.visas.length + filteredData.bookings.length;
  const healthScoreRaw = totalTrackedItems > 0 ? 100 - ((cancelledCount / totalTrackedItems) * 100) : 100;
  const healthScoreLabel = healthScoreRaw > 90 ? 'Excellent' : healthScoreRaw > 75 ? 'Good' : healthScoreRaw > 50 ? 'Fair' : 'Needs Attention';

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">TESFA / ANALYTICS ENGINE</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Data <span className="font-light italic text-neutral-300">&</span> Metrics
          </h1>
        </div>
        <div className="flex gap-4">
           {['ALL_TIME', 'YEARLY', 'QUARTERLY', 'MONTHLY'].map((t) => (
             <button
               key={t}
               onClick={() => setTimeframe(t)}
               className={`px-6 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${
                 timeframe === t ? 'bg-[#111111] text-white' : 'bg-neutral-50 text-neutral-400 hover:text-[#111111]'
               }`}
             >
               {t.replace('_', ' ')}
             </button>
           ))}
        </div>
      </div>

      {/* Primary Revenue Breakdown */}
      <div>
         <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b7b65] mb-6">Revenue Synthesis</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 shadow-xl overflow-hidden">
           
           <Link href="/admin/ticketing" className="bg-white p-12 hover:bg-[#6b7b65]/5 transition-all duration-500 group relative block">
             <div className="flex justify-between items-center mb-8">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Flight Commissions</span>
                <Plane size={16} className="text-neutral-200 group-hover:text-[#6b7b65] transition-colors" />
             </div>
             <p className="text-2xl font-bold text-[#111111] tracking-tighter">KSh {ticketRevenue.toLocaleString()}</p>
             <p className="text-[10px] font-bold text-neutral-400 mt-2">From Tickets</p>
           </Link>

           <Link href="/admin/visa" className="bg-white p-12 hover:bg-[#6b7b65]/5 transition-all duration-500 group relative block">
             <div className="flex justify-between items-center mb-8">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Visa Fees</span>
                <FileText size={16} className="text-neutral-200 group-hover:text-[#6b7b65] transition-colors" />
             </div>
             <p className="text-2xl font-bold text-[#111111] tracking-tighter">KSh {visaRevenue.toLocaleString()}</p>
             <p className="text-[10px] font-bold text-neutral-400 mt-2">From Applications</p>
           </Link>

           <div className="bg-white p-12 hover:bg-[#6b7b65]/5 transition-all duration-500 group relative block">
             <div className="flex justify-between items-center mb-8">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Booking Amounts</span>
                <Briefcase size={16} className="text-neutral-200 group-hover:text-[#6b7b65] transition-colors" />
             </div>
             <p className="text-2xl font-bold text-[#111111] tracking-tighter">KSh {bookingRevenue.toLocaleString()}</p>
             <p className="text-[10px] font-bold text-neutral-400 mt-2">From Packages</p>
           </div>

           <div className="bg-[#111111] p-12 transition-all duration-500 group relative flex flex-col justify-center">
             <span className="text-[9px] font-bold uppercase tracking-widest text-[#6b7b65] mb-4">Total Platform Revenue</span>
             <p className="text-4xl font-bold text-white tracking-tighter">KSh {totalRevenue.toLocaleString()}</p>
           </div>

         </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
         {/* Operations Pipeline */}
         <div className="border border-neutral-100 bg-white p-10 hover:border-[#6b7b65]/30 transition-all">
            <div className="flex justify-between items-center mb-10">
               <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Active Pipeline</span>
               <Activity size={16} className="text-[#6b7b65]" />
            </div>
            <p className="text-5xl font-bold text-[#111111] mb-6">{totalPipeline}</p>
            <div className="space-y-3">
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-neutral-400">Tickets Pending</span>
                  <span className="text-[#111111]">{activeTickets}</span>
               </div>
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-neutral-400">Visas Processing</span>
                  <span className="text-[#111111]">{activeVisas}</span>
               </div>
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-neutral-400">Active Leads</span>
                  <span className="text-[#111111]">{activeInquiries}</span>
               </div>
            </div>
         </div>

         {/* CRM Base */}
         <Link href="/admin/clients" className="border border-neutral-100 bg-white p-10 hover:border-[#6b7b65]/30 transition-all block group">
            <div className="flex justify-between items-center mb-10">
               <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Client Base</span>
               <Users size={16} className="text-[#6b7b65]" />
            </div>
            <p className="text-5xl font-bold text-[#111111] mb-6">{filteredData.clients.length}</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-[#6b7b65] transition-colors">
               Manage CRM <ArrowUpRight size={14} />
            </div>
         </Link>

         {/* Average Order Value */}
         <div className="border border-neutral-100 bg-white p-10 hover:border-[#6b7b65]/30 transition-all">
            <div className="flex justify-between items-center mb-10">
               <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Avg Transaction Value</span>
               <Award size={16} className="text-[#6b7b65]" />
            </div>
            <p className="text-5xl font-bold text-[#111111] mb-6">
               KSh {((totalRevenue) / (filteredData.tickets.length + filteredData.visas.length + filteredData.bookings.length) || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Across all services</p>
         </div>
      </div>

      {/* Advanced Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Airline Mix */}
         <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b7b65]">Airline Revenue Mix</h3>
            <div className="border border-neutral-100 divide-y divide-neutral-100 bg-white">
               {topCarriers.length > 0 ? topCarriers.map(([carrier, data]: any) => (
                 <div key={carrier} className="flex justify-between items-center p-6 hover:bg-[#fafafa]">
                    <div>
                       <p className="text-sm font-bold text-[#111111]">{carrier}</p>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{data.count} Tickets</p>
                    </div>
                    <p className="text-sm font-bold text-[#6b7b65]">KSh {data.revenue.toLocaleString()}</p>
                 </div>
               )) : (
                 <div className="p-6 text-sm text-neutral-400">No ticketing data available.</div>
               )}
            </div>
         </div>

         {/* Visa Corridors */}
         <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b7b65]">Top Visa Corridors</h3>
            <div className="border border-neutral-100 divide-y divide-neutral-100 bg-white">
               {topCountries.length > 0 ? topCountries.map(([country, data]: any) => (
                 <div key={country} className="flex justify-between items-center p-6 hover:bg-[#fafafa]">
                    <div>
                       <p className="text-sm font-bold text-[#111111]">{country}</p>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{data.count} Applications</p>
                    </div>
                    <p className="text-sm font-bold text-[#6b7b65]">KSh {data.revenue.toLocaleString()}</p>
                 </div>
               )) : (
                 <div className="p-6 text-sm text-neutral-400">No visa data available.</div>
               )}
            </div>
         </div>
      </div>

      {/* Operational Efficiency & Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
         {/* Operational Efficiency */}
         <div className="lg:col-span-1 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b7b65]">Operational Efficiency</h3>
            <div className="bg-[#111111] p-10 text-white flex flex-col justify-between h-[300px]">
               <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-2 block">Avg Conversion Time</span>
                  <p className="text-4xl font-bold tracking-tighter">{avgConversionTimeHrs > 0 ? `${avgConversionTimeHrs.toFixed(1)} Hrs` : 'N/A'}</p>
               </div>
               <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-2 block">Avg Inquiry Value</span>
                  <p className="text-4xl font-bold tracking-tighter">KSh {avgInquiryValue.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
               </div>
               <p className="text-xs text-white/50 italic leading-relaxed">
                 "Overall pipeline conversion efficiency is currently tracking at {conversionRate.toFixed(1)}% across all services."
               </p>
            </div>
         </div>

         {/* Intelligence Synthesis */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b7b65]">Intelligence Synthesis</h3>
            <div className="border border-neutral-100 bg-white grid grid-cols-1 md:grid-cols-2">
               <div className="p-10 border-b md:border-b-0 md:border-r border-neutral-100">
                  <div className="flex justify-between items-center mb-6">
                     <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Market Presence</span>
                  </div>
                  <p className="text-3xl font-bold text-[#111111] mb-2">{marketPresence.toFixed(1)}%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6b7b65] mb-4">Dominance Index</p>
                  <p className="text-xs text-neutral-400 italic leading-relaxed">
                    "Your operational footprint is currently heavily leveraged towards {topEntityName} services, driving {marketPresence.toFixed(1)}% of your total tracked platform revenue."
                  </p>
               </div>
               <div className="p-10 flex flex-col justify-center space-y-8">
                  <div>
                     <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Acquisition Index (Clients/Leads)</span>
                     <div className="flex items-center gap-4">
                        <p className="text-3xl font-bold text-[#111111]">{acquisitionIndex.toFixed(1)}%</p>
                        <TrendingUp size={16} className="text-[#6b7b65]" />
                     </div>
                  </div>
                  <div>
                     <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Completion Delta</span>
                     <div className="flex items-center gap-4">
                        <p className="text-3xl font-bold text-[#111111]">{conversionRate.toFixed(1)}%</p>
                        {conversionRate > 50 ? <TrendingUp size={16} className="text-[#6b7b65]" /> : <TrendingDown size={16} className="text-red-400" />}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* CLV & Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
         <div className="border border-neutral-100 bg-white p-10">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b7b65] mb-8">Client Value (CLV)</h3>
            <div className="space-y-6">
               <div className="flex justify-between items-end border-b border-neutral-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">Corporate</span>
                  <span className="text-xl font-bold text-[#6b7b65]">KSh {(((totalRevenue * 0.7) / (filteredData.clients.length || 1)) || 420000).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
               </div>
               <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Individual</span>
                  <span className="text-xl font-bold text-[#111111]">KSh {(((totalRevenue * 0.3) / (filteredData.clients.length || 1)) || 92000).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
               </div>
            </div>
         </div>

         <div className="bg-[#6b7b65] p-10 text-white flex flex-col justify-center">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Strategic Target</h3>
            <p className="text-3xl font-bold tracking-tighter mb-1">B2B Expansion</p>
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">+25% Target</p>
         </div>

         <div className="border border-neutral-100 bg-white p-10 flex flex-col justify-center text-center">
            <Award size={32} className="text-[#6b7b65] mx-auto mb-6" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-2">Agency Health Score</h3>
            <p className="text-3xl font-bold text-[#111111]">{healthScoreLabel}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b7b65] mt-1">({healthScoreRaw.toFixed(0)}/100)</p>
         </div>
      </div>
    </div>
  );
}
