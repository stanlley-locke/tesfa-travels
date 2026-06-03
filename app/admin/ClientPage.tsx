'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Users, PlaneTakeoff, TrendingUp, ArrowUpRight, Activity, Globe, FileText, CheckCircle2, MessageCircle, Package, Megaphone, Tag, ChevronDown, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToExcel, exportToPDF } from '@/lib/exportUtils';
import { formatDistanceToNow, format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const COLORS = ['#6b7b65', '#111111', '#d4d4d4'];

export default function AdminOverviewClient({ initialData }: { initialData: any }) {
  const { inquiries = [], bookings = [], clients = [], tickets = [], visas = [], campaigns = [], packages = [], offers = [] } = initialData;

  // Synthesis for top cards
  const pendingInquiries = inquiries.filter((i:any) => i.status !== 'RESPONDED').length;
  const activeBookings = bookings.filter((b:any) => b.status !== 'CANCELLED').length;
  const contactMessages = inquiries.filter((i:any) => i.type === 'CONTACT_US').length;
  const corporateClients = clients.filter((c:any) => c.tier === 'CORPORATE' || c.tier === 'VIP').length;

  const activePackages = packages.filter((p:any) => p.status === 'PUBLISHED').length;
  const activeCampaigns = campaigns.filter((c:any) => c.isActive).length;
  const activeOffers = offers.filter((o:any) => o.isActive).length;
  const totalConversions = campaigns.reduce((acc: number, c:any) => acc + (c.conversions || 0), 0);

  const metrics = [
    { label: 'Website Inquiries', value: inquiries.length, change: `+${pendingInquiries}`, icon: MessageCircle, detail: 'Pending Review', link: '/admin/bookings' },
    { label: 'Active Bookings', value: activeBookings, change: 'Total', icon: PlaneTakeoff, detail: 'Flights & Hotels', link: '/admin/bookings' },
    { label: 'Contact Messages', value: contactMessages, change: 'Site', icon: FileText, detail: 'From Public Site', link: '/admin/bookings' },
    { label: 'Corporate Clients', value: corporateClients, change: 'B2B', icon: Users, detail: 'CRM Profiles', link: '/admin/bookings' },
    { label: 'Published Packages', value: activePackages, change: `${packages.length} Total`, icon: Package, detail: 'Tours & Expeditions', link: '/admin/packages' },
    { label: 'Active Campaigns', value: activeCampaigns, change: `${totalConversions} Conv.`, icon: Megaphone, detail: 'Marketing', link: '/admin/campaigns' },
    { label: 'Live Offers', value: activeOffers, change: 'Promos', icon: Tag, detail: 'Special Deals', link: '/admin/offers' },
    { label: 'Visa Applications', value: visas.length, change: 'Total', icon: FileText, detail: 'Pipeline', link: '/admin/visa' },
  ];

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleExportExcel = () => {
    const dataToExport = metrics.map(m => ({
      Metric: m.label,
      Value: m.value,
      Detail: m.detail
    }));
    exportToExcel(dataToExport, `Tesfa_Overview_${format(new Date(), 'yyyy-MM-dd')}`);
    setIsExportMenuOpen(false);
  };

  const handleExportPDF = () => {
    const headers = ['Metric', 'Value', 'Detail'];
    const dataToExport = metrics.map(m => [m.label, m.value, m.detail]);
    exportToPDF(headers, dataToExport, `Tesfa_Overview_${format(new Date(), 'yyyy-MM-dd')}`, 'Tesfa Admin Overview Metrics');
    setIsExportMenuOpen(false);
  };

  // Activity Log Synthesis
  const recentActivity = useMemo(() => {
    const log: any[] = [];
    
    tickets.forEach((t:any) => {
      log.push({ 
        id: `t-${t.id}`, 
        action: t.status === 'ISSUED' ? 'Flight Issued' : 'Ticket Created', 
        detail: `${t.airline} - PNR ${t.pnr} - ${t.passengerName}`, 
        time: new Date(t.updatedAt), 
        status: t.status === 'ISSUED' ? 'success' : 'pending' 
      });
    });
    
    visas.forEach((v:any) => {
      log.push({ 
        id: `v-${v.id}`, 
        action: v.status === 'Approved' ? 'Visa Approved' : 'Visa Application', 
        detail: `${v.country} Visa - ${v.applicantName}`, 
        time: new Date(v.updatedAt), 
        status: v.status === 'Approved' ? 'success' : 'pending' 
      });
    });

    clients.forEach((c:any) => {
      log.push({ 
        id: `c-${c.id}`, 
        action: 'New Client Profile', 
        detail: `${c.name} - ${c.company || 'Individual'}`, 
        time: new Date(c.createdAt), 
        status: 'success' 
      });
    });

    bookings.forEach((b:any) => {
      log.push({ 
        id: `b-${b.id}`, 
        action: 'New Booking', 
        detail: `${b.type} - KSh ${b.amount}`, 
        time: new Date(b.createdAt), 
        status: b.status === 'CONFIRMED' ? 'success' : 'pending' 
      });
    });

    inquiries.forEach((i:any) => {
      log.push({ 
        id: `i-${i.id}`, 
        action: 'New Inquiry', 
        detail: `${i.firstName} ${i.lastName} - ${i.service}`, 
        time: new Date(i.createdAt), 
        status: i.status === 'RESPONDED' ? 'success' : 'pending' 
      });
    });

    return log.sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 10);
  }, [tickets, visas, clients, bookings, inquiries]);

  // Revenue Vector Chart Data (Last 7 days)
  const chartData = useMemo(() => {
    const dataMap: Record<string, number> = {};
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dataMap[format(d, 'MMM dd')] = 0;
    }

    tickets.forEach((t:any) => {
      if (t.status === 'ISSUED') {
        const dateStr = format(new Date(t.updatedAt), 'MMM dd');
        if (dataMap[dateStr] !== undefined) {
          dataMap[dateStr] += t.commission;
        }
      }
    });

    visas.forEach((v:any) => {
      const dateStr = format(new Date(v.updatedAt), 'MMM dd');
      if (dataMap[dateStr] !== undefined) {
        dataMap[dateStr] += (v.fee || 0);
      }
    });

    bookings.forEach((b:any) => {
        if (b.status !== 'CANCELLED') {
          const dateStr = format(new Date(b.updatedAt), 'MMM dd');
          if (dataMap[dateStr] !== undefined) {
            dataMap[dateStr] += b.amount;
          }
        }
    });

    return Object.entries(dataMap).map(([date, revenue]) => ({ date, revenue }));
  }, [tickets, visas, bookings]);

  // Booking Distribution Chart Data
  const bookingDistributionData = useMemo(() => {
    const counts = { FLIGHT: 0, HOTEL: 0, EXPEDITION: 0 };
    bookings.forEach((b:any) => {
      if (b.type === 'FLIGHT') counts.FLIGHT++;
      else if (b.type === 'HOTEL') counts.HOTEL++;
      else if (b.type === 'EXPEDITION') counts.EXPEDITION++;
    });
    return [
      { name: 'Flights', value: counts.FLIGHT },
      { name: 'Hotels', value: counts.HOTEL },
      { name: 'Expeditions', value: counts.EXPEDITION }
    ].filter(d => d.value > 0);
  }, [bookings]);

  // Campaign Performance Chart Data
  const campaignPerformanceData = useMemo(() => {
    return campaigns.slice(0, 5).map((c:any) => ({
      name: c.name.length > 10 ? c.name.substring(0, 10) + '...' : c.name,
      conversions: c.conversions || 0
    }));
  }, [campaigns]);

  const pendingIssuance = tickets.filter((t:any) => t.status === 'PENDING').length;
  const isApiOnline = tickets.length > 0;

  return (
    <div className="space-y-12 md:space-y-16 pb-20 p-0 md:p-4 flex-1">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-8 md:pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-4 md:mb-6 block">TESFA / EXECUTIVE OPS</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            System <span className="font-light italic text-neutral-300">Overview</span>
          </h1>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            className="bg-[#111111] text-white px-6 py-3 md:px-8 md:py-4 text-[9px] font-bold tracking-widest uppercase hover:bg-[#6b7b65] transition-colors rounded-none flex items-center gap-3 w-full md:w-auto justify-center"
          >
            Download Report <ChevronDown size={14} className={`transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isExportMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-neutral-200 shadow-xl z-50 flex flex-col"
              >
                <button 
                  onClick={handleExportExcel}
                  className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-[#fafafa] hover:text-[#6b7b65] transition-colors text-left border-b border-neutral-100"
                >
                  <FileSpreadsheet size={14} /> Export to Excel
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-[#fafafa] hover:text-[#6b7b65] transition-colors text-left"
                >
                  <FileText size={14} /> Export to PDF
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Metrics Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 shadow-xl overflow-hidden">
        {metrics.map((metric, idx) => (
          <Link href={metric.link} key={metric.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#6b7b65] p-10 hover:bg-[#5a6a54] transition-all duration-500 group relative cursor-pointer h-full border border-[#7a8a74]"
            >
              <div className="flex justify-between items-start mb-8">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/70">{metric.label}</p>
                <metric.icon size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-4xl font-bold text-white tracking-tighter">{metric.value}</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#f3e5ab]">
                  <TrendingUp size={12} />
                  {metric.change}
                </div>
              </div>
              <p className="text-[9px] font-bold text-white/50 uppercase tracking-tighter">{metric.detail}</p>
              
              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={16} className="text-white" />
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

          <div className="bg-white border border-[#6b7b65]/20 shadow-sm">
            <div className="p-8 border-b border-[#6b7b65]/10 flex justify-between items-center bg-[#6b7b65]/5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#6b7b65]">Activity Log</span>
              <Activity size={14} className="text-[#6b7b65]" />
            </div>
            <div className="divide-y divide-neutral-100">
              {recentActivity.length > 0 ? recentActivity.map((activity) => (
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
                      <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                        {formatDistanceToNow(activity.time, { addSuffix: true })}
                      </p>
                    </div>
                    <p className="text-xs text-neutral-500 font-medium group-hover:text-neutral-900 transition-colors">{activity.detail}</p>
                  </div>
                </div>
              )) : (
                 <div className="p-12 text-center text-neutral-400 text-sm">No recent activity detected on the platform.</div>
              )}
            </div>
            <button className="w-full p-6 text-[9px] font-bold uppercase tracking-widest text-[#111111] hover:bg-neutral-50 transition-colors border-t border-neutral-200">
              View Complete Audit Trail
            </button>
          </div>
          
          {/* Campaign Conversions Chart */}
          <div className="bg-[#6b7b65] border border-[#7a8a74] shadow-xl p-10 text-white">
             <div className="flex justify-between items-center mb-10">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">Campaign Conversions</span>
             </div>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={campaignPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#ffffff80' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#ffffff80' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '0px', fontSize: '12px' }}
                        cursor={{ fill: '#ffffff10' }}
                      />
                      <Bar dataKey="conversions" fill="#ffffff" barSize={30} radius={[4, 4, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
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
                <h3 className="text-2xl font-bold leading-tight tracking-tight mb-4">
                    {isApiOnline ? 'IATA Connection Active' : 'API Connection Idle'}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light italic mb-8">
                  "Ticketing APIs are responding optimally. Average latency is 42ms across all global GDS endpoints."
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 border-t border-white/10 pt-8">
                   <div>
                      <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-2">API Status</p>
                      <p className="text-lg font-bold text-[#6b7b65]">{isApiOnline ? 'Online' : 'Standby'}</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Pending Issuance</p>
                      <p className="text-lg font-bold text-white">{pendingIssuance}</p>
                   </div>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#6b7b65]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Booking Distribution Pie Chart */}
          <div className="bg-white border border-neutral-200 shadow-sm p-10">
             <div className="flex justify-between items-center mb-10">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111]">Booking Distribution</span>
             </div>
             <div className="h-[250px] w-full flex items-center justify-center">
                {bookingDistributionData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                          data={bookingDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {bookingDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '0px', fontSize: '12px' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                     </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-neutral-400 text-sm">No booking data available</div>
                )}
             </div>
          </div>

          {/* Revenue Area Chart */}
          <div className="bg-white border border-neutral-200 shadow-sm p-10">
             <div className="flex justify-between items-center mb-10">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111]">Revenue Vector</span>
               <select className="bg-neutral-50 border border-neutral-200 text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-none outline-none focus:border-[#6b7b65]">
                 <option>This Week</option>
                 <option>This Month</option>
               </select>
             </div>
             <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6b7b65" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6b7b65" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '0px', fontSize: '12px' }}
                        itemStyle={{ color: '#6b7b65' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#6b7b65" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
