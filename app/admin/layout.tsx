'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Ticket, 
  FileCheck, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Globe, 
  MessageCircle,
  Megaphone,
  ChevronDown,
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Award,
  Mountain,
  Plane,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarItemProps {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ href, icon: Icon, label, active, isCollapsed }: SidebarItemProps) => (
  <Link href={href}>
    <motion.div
      whileHover={{ x: isCollapsed ? 0 : 5 }}
      className={`flex items-center gap-4 px-6 py-3.5 transition-all relative group ${
        active 
          ? 'text-[#6b7b65] font-bold' 
          : 'text-neutral-400 hover:text-white'
      } ${isCollapsed ? 'justify-center px-0' : ''}`}
    >
      <Icon size={18} className={active ? 'text-[#6b7b65]' : 'group-hover:text-white transition-colors'} />
      {!isCollapsed && (
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">{label}</span>
      )}
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className={`absolute left-0 w-1 h-6 bg-[#6b7b65] rounded-r-full shadow-[0_0_15px_rgba(107,123,101,0.5)] ${isCollapsed ? 'left-auto right-0 rounded-r-none rounded-l-full' : ''}`} 
        />
      )}
    </motion.div>
  </Link>
);

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currency, setCurrency] = useState('KES');

  const executiveItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { href: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
  ];

  const travelOpsItems = [
    { href: '/admin/ticketing', icon: Plane, label: 'IATA Ticketing' },
    { href: '/admin/packages', icon: Mountain, label: 'Flights & Destinations' },
    { href: '/admin/visa', icon: FileCheck, label: 'Visa Pipeline' },
  ];

  const crmMarketingItems = [
    { href: '/admin/bookings', icon: Users, label: 'Clients & CRM' },
    { href: '/admin/offers', icon: Target, label: 'Offers & Promotions' },
    { href: '/admin/blog', icon: Megaphone, label: 'Content & Campaigns' },
  ];

  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-black font-sans text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fafafa] font-sans text-[#111111]">
      {/* Sophisticated Dark Glassy Sidepanel */}
      <aside 
        className={`bg-[#111111]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col fixed h-full z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[20px_0_40px_rgba(0,0,0,0.1)] ${
          isCollapsed ? 'w-[80px]' : 'w-[280px]'
        }`}
      >
        {/* Toggle Button */}
        <div 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-[#6b7b65] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer z-[60]"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </div>

        <div className={`p-10 transition-all duration-500 ${isCollapsed ? 'p-6 text-center' : ''}`}>
          <Link href="/admin">
            <h2 className="text-xl font-bold tracking-tighter text-white uppercase" style={{ fontFamily: 'var(--font-serif)' }}>
              {isCollapsed ? 'T.' : 'TESFA'}
            </h2>
          </Link>
        </div>

        <nav className="flex-1 mt-6 space-y-8 overflow-y-auto no-scrollbar pb-20">
          {/* Executive Section */}
          <div className="space-y-1">
            <div className={`px-6 mb-4 transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
               {!isCollapsed && <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-[0.4em]">Executive</span>}
            </div>
            {executiveItems.map((item) => (
              <SidebarItem key={item.href} {...item} isCollapsed={isCollapsed} active={pathname === item.href} />
            ))}
          </div>

          {/* Marketing & CRM */}
          <div className="space-y-1">
            <div className={`px-6 mb-4 transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
               {!isCollapsed && <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-[0.4em]">Growth & CRM</span>}
            </div>
            {crmMarketingItems.map((item) => (
              <SidebarItem key={item.href} {...item} isCollapsed={isCollapsed} active={pathname === item.href} />
            ))}
          </div>

          {/* Travel Operations */}
          <div className="space-y-1">
            <div className={`px-6 mb-4 transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
               {!isCollapsed && <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-[0.4em]">Travel Ops</span>}
            </div>
            {travelOpsItems.map((item) => (
              <SidebarItem key={item.href} {...item} isCollapsed={isCollapsed} active={pathname === item.href} />
            ))}
          </div>
          
          <div className="px-6">
             <div className="h-px bg-white/5 w-full" />
          </div>

          {/* Regional Switcher */}
          <div className={`px-6 transition-all duration-500 ${isCollapsed ? 'px-0 text-center' : ''}`}>
            {!isCollapsed && <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Currency Tools</p>}
            <Link href="/admin/currency" className={`flex items-center gap-4 py-2 transition-all ${isCollapsed ? 'justify-center' : ''} text-neutral-400 hover:text-white`}>
              <Globe size={18} />
              {!isCollapsed && <span className="text-[9px] font-bold uppercase tracking-widest">Exchange Rates</span>}
            </Link>
          </div>
        </nav>

        <div className={`p-8 space-y-4 border-t border-white/5 transition-all duration-500 ${isCollapsed ? 'p-4' : ''}`}>
           <Link href="/admin/settings" className={`w-full flex items-center gap-4 text-neutral-400 hover:text-white transition-all ${isCollapsed ? 'justify-center' : ''}`}>
             <Settings size={18} />
             {!isCollapsed && <span className="text-[9px] font-bold uppercase tracking-widest">Settings</span>}
           </Link>
           <button 
             onClick={() => {
               document.cookie = "adminAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
               document.cookie = "adminEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
               window.location.href = '/admin/login';
             }}
             className={`w-full flex items-center gap-4 text-red-400/50 hover:text-red-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}
           >
             <LogOut size={18} />
             {!isCollapsed && <span className="text-[9px] font-bold uppercase tracking-widest">Exit</span>}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className={`flex-1 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isCollapsed ? 'ml-[80px]' : 'ml-[280px]'
        }`}
      >
        {/* Top Header - Light Glassy */}
        <header className="h-24 px-12 flex items-center justify-between sticky top-0 z-40 bg-[#fafafa]/80 backdrop-blur-xl border-b border-neutral-100">
          <div className="flex items-center gap-12">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300" />
              <input 
                type="text" 
                placeholder="SEARCH RECORDS..." 
                className="bg-transparent border-none text-[10px] font-bold tracking-widest outline-none pl-8 w-64 placeholder:text-neutral-300"
              />
            </div>
            <div className="h-4 w-px bg-neutral-200 hidden md:block" />
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7b65]">
              Tesfa Travel Management Hub
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold tracking-widest text-[#111111]">IATA AGENT</span>
              <span className="text-[8px] font-bold text-[#6b7b65] uppercase tracking-tighter">Nairobi, Kilimani HQ</span>
            </div>
            <div className="w-10 h-10 bg-[#111111] flex items-center justify-center text-white text-[10px] font-bold tracking-tighter rounded-none border border-[#6b7b65]/20">
              TT
            </div>
          </div>
        </header>
        
        <div className="p-12 max-w-[1600px] mx-auto min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
