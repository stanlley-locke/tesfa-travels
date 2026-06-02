'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  Globe, 
  DollarSign, 
  Zap, 
  Award,
  Plane,
  Briefcase,
  Users,
  Target,
  BarChart,
  LineChart
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('Quarterly');

  const mainMetrics = [
    { label: 'Total Revenue', value: 'KSh 12.4M', change: '+18%', trend: 'up', detail: 'Fiscal Quarter' },
    { label: 'Active Pipeline', value: '487', change: '+12%', trend: 'up', detail: 'Tickets/Visa' },
    { label: 'Retention Rate', value: '74%', change: '+5%', trend: 'up', detail: 'Client Loyalty' },
    { label: 'Avg Ticket Val', value: 'KSh 84k', change: '-2%', trend: 'down', detail: 'Market Variance' },
  ];

  const regionalPerformance = [
    { region: 'Kenya (Nairobi Hub)', share: '64%', value: 'KSh 7.9M', growth: '+12%' },
    { region: 'Ethiopia (Addis Corridor)', share: '22%', value: 'KSh 2.7M', growth: '+34%' },
    { region: 'Eritrea (Asmara Specialty)', share: '8%', value: 'KSh 992k', growth: '+18%' },
    { region: 'Rwanda / Uganda', share: '6%', value: 'KSh 744k', growth: '+4%' },
  ];

  const airlinePerformance = [
    { carrier: 'Ethiopian Airlines', volume: '32%', efficiency: 'High', status: 'Primary' },
    { carrier: 'Qatar Airways', volume: '18%', efficiency: 'Premium', status: 'Growth' },
    { carrier: 'Kenya Airways', volume: '24%', efficiency: 'High', status: 'Stable' },
    { carrier: 'Specialty Carriers', volume: '12%', efficiency: 'Niche', status: 'Unique' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">TESFA / ANALYTICS ENGINE</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Data <span className="font-light italic text-neutral-300">&</span> Metrics
          </h1>
        </div>
        <div className="flex gap-4">
           {['Monthly', 'Quarterly', 'Yearly'].map((t) => (
             <button
               key={t}
               onClick={() => setTimeframe(t)}
               className={`px-6 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${
                 timeframe === t ? 'bg-[#111111] text-white' : 'bg-neutral-50 text-neutral-400 hover:text-[#111111]'
               }`}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      {/* Main Metrics Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 shadow-xl overflow-hidden">
        {mainMetrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-12 hover:bg-[#fafafa] transition-all duration-500 group relative"
          >
            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-8">{metric.label}</p>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-4xl font-bold text-[#111111] tracking-tighter">{metric.value}</h3>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${metric.trend === 'up' ? 'text-[#6b7b65]' : 'text-red-400'}`}>
                {metric.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {metric.change}
              </div>
            </div>
            <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-tighter">{metric.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Performance Synthesis - 8 Columns */}
        <div className="lg:col-span-8 space-y-12">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tighter text-[#111111]" style={{ fontFamily: 'var(--font-serif)' }}>
                Regional <span className="text-neutral-300 font-light italic">Optimization</span>
              </h2>
           </div>

           {/* Comprehensive Regional Table */}
           <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-neutral-50/50 border-b border-neutral-200">
                       <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-widest text-neutral-400">Market Corridor</th>
                       <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-widest text-neutral-400 text-center">Market Share</th>
                       <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-widest text-neutral-400 text-right">Revenue Yield</th>
                       <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-widest text-neutral-400 text-right">Growth</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-neutral-100">
                    {regionalPerformance.map((item) => (
                      <tr key={item.region} className="group hover:bg-[#fafafa] transition-all">
                         <td className="px-10 py-8">
                            <span className="text-sm font-bold text-[#111111]">{item.region}</span>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex flex-col items-center gap-2">
                               <span className="text-xs font-bold text-[#111111]">{item.share}</span>
                               <div className="w-24 h-1 bg-neutral-50 overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: item.share }}
                                    className="h-full bg-[#6b7b65]"
                                  />
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-8 text-right text-sm font-bold text-[#111111]">{item.value}</td>
                         <td className="px-10 py-8 text-right text-[10px] font-bold text-[#6b7b65]">{item.growth}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {/* Airline Partnership Analytics */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-neutral-200 p-10 space-y-8 shadow-sm hover:shadow-xl transition-all duration-700">
                 <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111]">Airline Revenue Mix</h4>
                    <Plane size={16} className="text-[#6b7b65]" />
                 </div>
                 <div className="space-y-6">
                    {airlinePerformance.map((item) => (
                      <div key={item.carrier} className="space-y-3 group">
                         <div className="flex justify-between items-end">
                            <span className="text-xs font-bold text-neutral-600 group-hover:text-[#111111] transition-colors">{item.carrier}</span>
                            <span className="text-xs font-bold text-[#111111]">{item.volume}</span>
                         </div>
                         <div className="h-1 bg-neutral-50 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: item.volume }} className="h-full bg-[#111111]" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#111111] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                 <div className="relative z-10 flex justify-between items-center text-white">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em]">Operational Efficiency</h4>
                    <Zap size={16} className="text-[#6b7b65]" />
                 </div>
                 <div className="relative z-10 grid grid-cols-2 gap-10">
                    <div>
                       <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Cost Per Lead</p>
                       <p className="text-3xl font-bold text-white tracking-tighter">KSh 1.2k</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Conversion Time</p>
                       <p className="text-3xl font-bold text-white tracking-tighter">4.2 Hrs</p>
                    </div>
                 </div>
                 <div className="relative z-10 pt-10 border-t border-white/5">
                    <p className="text-xs text-neutral-400 font-light leading-relaxed italic">
                      "Efficiency has improved by 14% since the integration of the WhatsApp CRM module."
                    </p>
                 </div>
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#6b7b65]/5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
              </div>
           </div>
        </div>

        {/* Intelligence Side - 4 Columns */}
        <div className="lg:col-span-4 space-y-12">
           <h2 className="text-3xl font-bold tracking-tighter text-[#111111]" style={{ fontFamily: 'var(--font-serif)' }}>
             Intelligence <span className="text-neutral-300 font-light italic">Synthesis</span>
           </h2>

           {/* Market Dominance Module - DARK GLASSY */}
           <div className="bg-[#111111]/95 backdrop-blur-2xl p-12 text-white space-y-12 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-10">
                 <div className="w-12 h-12 bg-[#6b7b65]/20 flex items-center justify-center text-[#6b7b65]">
                   <Target size={24} />
                 </div>
                 <div>
                   <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#6b7b65] mb-4">Market Presence</p>
                   <h3 className="text-3xl font-bold leading-tight tracking-tight underline decoration-[#6b7b65] decoration-2 underline-offset-8">Dominance Index</h3>
                   <div className="flex items-baseline gap-4 mt-8">
                      <span className="text-5xl font-bold">64%</span>
                      <span className="text-[10px] font-bold text-[#6b7b65] uppercase tracking-widest">Nairobi Hub</span>
                   </div>
                 </div>
                 <p className="text-sm text-neutral-400 leading-relaxed font-light italic">
                   "Your footprint in the Nairobi hub remains stable, however, the Addis Ababa route is showing a significant uptick in corporate visa processing (+22% QoQ)."
                 </p>
                 
                 <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                    <div>
                       <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Acquisition Index</p>
                       <p className="text-2xl font-bold text-white">+12.8</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Conversion Delta</p>
                       <p className="text-2xl font-bold text-red-400">-4.2</p>
                    </div>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6b7b65]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
           </div>

           {/* CLV Segment Analysis */}
           <div className="bg-white border border-neutral-200 p-12 space-y-10 shadow-sm">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111]">Client Value (CLV)</h4>
              <div className="space-y-10">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                       <Briefcase size={20} className="text-[#6b7b65]" />
                       <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest">Corporate</span>
                    </div>
                    <span className="text-sm font-bold text-[#111111]">KSh 420k</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                       <Users size={20} className="text-[#111111]" />
                       <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest">Individual</span>
                    </div>
                    <span className="text-sm font-bold text-[#111111]">KSh 92k</span>
                 </div>
                 <div className="mt-8 pt-8 border-t border-neutral-50">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Strategic Target</p>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-[#111111] uppercase tracking-widest">B2B Expansion</span>
                       <span className="text-[10px] font-bold text-green-600">+25% Target</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Partnership Audit Score */}
           <div className="p-12 bg-white border border-neutral-200 flex items-center justify-between shadow-sm group">
              <div className="flex items-center gap-8">
                 <div className="w-12 h-12 bg-neutral-50 flex items-center justify-center text-[#6b7b65]">
                    <Award size={24} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-[#111111]">Agency Health Score</h4>
                    <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest mt-1">Excellent (98/100)</p>
                 </div>
              </div>
              <ArrowUpRight size={20} className="text-neutral-200 group-hover:text-[#111111] transition-all" />
           </div>
        </div>
      </div>
    </div>
  );
}
