'use client';

import Link from 'next/link';
import { CreditCard, Users, PlaneTakeoff, TrendingUp, ArrowUpRight, Activity, Globe, FileText, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminOverview() {
  const metrics = [
    { label: 'Website Inquiries', value: '42', change: '+12', icon: MessageCircle, detail: 'Pending Review', link: '/admin/bookings' },
    { label: 'Active Bookings', value: '142', change: '+8.2%', icon: PlaneTakeoff, detail: 'Flights & Hotels', link: '/admin/bookings' },
    { label: 'Contact Messages', value: '18', change: '+5', icon: FileText, detail: 'From Public Site', link: '/admin/bookings' },
    { label: 'Corporate Clients', value: '28', change: '+24.0%', icon: Users, detail: 'CRM Profiles', link: '/admin/bookings' },
  ];

  const recentActivity = [
    { id: 1, action: 'Flight Issued', detail: 'EK 722 to Dubai - John Doe', time: '10 mins ago', status: 'success' },
    { id: 2, action: 'Visa Approved', detail: 'Schengen Visa - Sarah Smith', time: '1 hour ago', status: 'success' },
    { id: 3, action: 'New Corporate Account', detail: 'Acme Corp Onboarding', time: '3 hours ago', status: 'pending' },
    { id: 4, action: 'Payment Received', detail: 'Invoice #4029 - $4,200', time: '5 hours ago', status: 'success' },
    { id: 5, action: 'Expedition Booked', detail: 'Serengeti 7-Day - Group of 4', time: '1 day ago', status: 'pending' },
  ];

  return (
    <div className="space-y-16 pb-20 p-10 flex-1">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">TESFA / EXECUTIVE OPS</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            System <span className="font-light italic text-neutral-300">Overview</span>
          </h1>
        </div>
        <button className="bg-[#111111] text-white px-8 py-4 text-[9px] font-bold tracking-widest uppercase hover:bg-[#6b7b65] transition-colors rounded-none flex items-center gap-3">
          Download Report <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Main Metrics Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 shadow-xl overflow-hidden">
        {metrics.map((metric, idx) => (
          <Link href={metric.link} key={metric.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 hover:bg-[#fafafa] transition-all duration-500 group relative cursor-pointer h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">{metric.label}</p>
                <metric.icon size={16} className="text-neutral-300 group-hover:text-[#6b7b65] transition-colors" />
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-4xl font-bold text-[#111111] tracking-tighter">{metric.value}</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#6b7b65]">
                  <TrendingUp size={12} />
                  {metric.change}
                </div>
              </div>
              <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-tighter">{metric.detail}</p>
              
              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={16} className="text-[#6b7b65]" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Operations Activity Feed - 7 Columns */}
        <div className="lg:col-span-7 space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tighter text-[#111111]" style={{ fontFamily: 'var(--font-serif)' }}>
              Live <span className="text-neutral-300 font-light italic">Operations</span>
            </h2>
          </div>

          <div className="bg-white border border-neutral-200 shadow-sm">
            <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Activity Log</span>
              <Activity size={14} className="text-neutral-400" />
            </div>
            <div className="divide-y divide-neutral-100">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-8 flex items-start gap-6 hover:bg-[#fafafa] transition-colors group">
                  <div className="mt-1">
                    {activity.status === 'success' ? (
                      <CheckCircle2 size={16} className="text-[#6b7b65]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-2">
                      <p className="text-sm font-bold text-[#111111]">{activity.action}</p>
                      <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{activity.time}</p>
                    </div>
                    <p className="text-xs text-neutral-500 font-medium group-hover:text-neutral-900 transition-colors">{activity.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full p-6 text-[9px] font-bold uppercase tracking-widest text-[#111111] hover:bg-neutral-50 transition-colors border-t border-neutral-200">
              View Complete Audit Trail
            </button>
          </div>
        </div>

        {/* System Intelligence - 5 Columns */}
        <div className="lg:col-span-5 space-y-12">
          <h2 className="text-3xl font-bold tracking-tighter text-[#111111]" style={{ fontFamily: 'var(--font-serif)' }}>
             System <span className="text-neutral-300 font-light italic">Status</span>
          </h2>

          {/* Quick Action Module - DARK GLASSY */}
          <div className="bg-[#111111] p-10 text-white space-y-10 relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                   <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#6b7b65]">Global Network</p>
                   <Globe size={16} className="text-[#6b7b65]" />
                </div>
                <h3 className="text-2xl font-bold leading-tight tracking-tight mb-4">IATA Connection Active</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light italic mb-8">
                  "Ticketing APIs are responding optimally. Average latency is 42ms across all global GDS endpoints."
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                   <div>
                      <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-2">API Status</p>
                      <p className="text-lg font-bold text-[#6b7b65]">Online</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Pending Issuance</p>
                      <p className="text-lg font-bold text-white">12</p>
                   </div>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#6b7b65]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Chart Placeholder / Performance Summary */}
          <div className="bg-white border border-neutral-200 shadow-sm p-10">
             <div className="flex justify-between items-center mb-10">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111]">Revenue Vector</span>
               <select className="bg-neutral-50 border border-neutral-200 text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-none outline-none focus:border-[#6b7b65]">
                 <option>This Week</option>
                 <option>This Month</option>
               </select>
             </div>
             <div className="h-[200px] w-full flex flex-col items-center justify-center bg-neutral-50 border border-neutral-100 border-dashed rounded-none relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-[#6b7b65]/20 to-transparent clip-path-polygon-[0_100%,0_40%,20_60%,40_30%,60_50%,80_20%,100_70%,100_100%]"></div>
                <Activity size={24} className="mb-4 text-neutral-300 relative z-10" />
                <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 relative z-10">Telemetry Data Loading</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
