'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Target,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalSearch from './components/GlobalSearch';

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications');
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchNotifications();
    const notifTimer = setInterval(fetchNotifications, 30000); // refresh every 30s
    
    return () => {
      clearInterval(timer);
      clearInterval(notifTimer);
    };
  }, []);

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
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sophisticated Dark Glassy Sidepanel */}
      <aside 
        className={`bg-[#111111]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col fixed h-full z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[20px_0_40px_rgba(0,0,0,0.1)] 
        ${isCollapsed ? 'md:w-[80px]' : 'md:w-[280px]'} 
        w-[280px] ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Desktop Toggle Button */}
        <div 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-[#6b7b65] text-white rounded-full hidden md:flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer z-[60]"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </div>

        <div className={`transition-all duration-500 h-24 mb-6 ${isCollapsed ? 'flex justify-center items-center px-4' : 'flex items-center'}`}>
          <Link href="/admin" className="flex items-center h-full gap-4 w-full">
            {isCollapsed ? (
              <div className="h-full aspect-square overflow-hidden">
                <img src="/assets/logo.png" alt="T" className="h-full w-full object-cover" />
              </div>
            ) : (
              <>
                <div className="h-full aspect-square flex-shrink-0 overflow-hidden">
                  <img src="/assets/logo.png" alt="Tesfa Travels Logo" className="h-full w-full object-cover" />
                </div>
                <span className="text-white font-medium tracking-wide text-2xl truncate" style={{ fontFamily: 'var(--font-serif)' }}>Tesfa Travels</span>
              </>
            )}
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
        className={`flex-1 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-full ${
          isCollapsed ? 'md:ml-[80px]' : 'md:ml-[280px]'
        } ml-0`}
      >
        {/* Top Header - Light Glassy */}
        <header className="h-20 md:h-24 px-4 md:px-12 flex items-center justify-between sticky top-0 z-30 bg-[#fafafa]/80 backdrop-blur-xl border-b border-neutral-100">
          <div className="flex items-center gap-4 md:gap-12">
            <button 
              className="md:hidden p-2 text-neutral-600 hover:text-black"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div 
              className="relative hidden md:block cursor-pointer group"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300 group-hover:text-[#6b7b65] transition-colors" />
              <div className="bg-transparent border-none text-[10px] font-bold tracking-widest pl-8 w-64 text-neutral-400 group-hover:text-[#111111] transition-colors flex items-center h-full">
                SEARCH SYSTEM...
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-neutral-200 px-1.5 py-0.5 rounded-sm bg-white shadow-sm text-[8px] font-bold text-neutral-400">
                CTRL + K
              </div>
            </div>
            <div className="h-4 w-px bg-neutral-200 hidden md:block" />
            
            {/* Live Clock Feature */}
            <div className="hidden md:flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7b65]">
              <Clock size={12} />
              {time ? time.toLocaleTimeString('en-US', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit' }) : '...'} NBO
            </div>
          </div>
          
          <div className="flex items-center gap-6 md:gap-8 relative">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-neutral-400 hover:text-[#111111] transition-colors"
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
                )}
              </button>
              
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-4 w-80 bg-white border border-neutral-200 shadow-2xl z-50 flex flex-col"
                  >
                    <div className="p-4 border-b border-neutral-100 bg-[#fafafa] flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Notifications</span>
                      <span className="text-[8px] bg-[#111111] text-white px-2 py-0.5 font-bold uppercase tracking-widest">{notifications.length} New</span>
                    </div>
                    <div className="divide-y divide-neutral-100 max-h-[300px] overflow-y-auto no-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-neutral-400 font-bold uppercase tracking-widest">No new notifications</div>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif.id} className="p-4 hover:bg-[#fafafa] cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-xs font-bold text-[#111111]">{notif.title}</p>
                              <span className="text-[8px] font-bold text-[#6b7b65] uppercase tracking-widest">
                                {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-400">{notif.description}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-6 w-px bg-neutral-200" />

            {/* Profile Dropdown */}
            <div className="relative">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-4 cursor-pointer group"
              >
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-[10px] font-bold tracking-widest text-[#111111] group-hover:text-[#6b7b65] transition-colors">IATA AGENT</span>
                  <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-tighter">Nairobi HQ</span>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#111111] flex items-center justify-center text-white text-[10px] font-bold tracking-tighter rounded-none border border-neutral-200 shadow-sm shrink-0 group-hover:bg-[#6b7b65] transition-colors">
                  TT
                </div>
              </div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-4 w-48 bg-white border border-neutral-200 shadow-xl z-50 flex flex-col p-2"
                  >
                    <Link href="/admin/settings" className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:bg-[#fafafa] hover:text-[#111111] flex items-center gap-2">
                      <Settings size={12} /> Account Settings
                    </Link>
                    <div className="h-px w-full bg-neutral-100 my-1" />
                    <button 
                      onClick={() => window.location.href = '/admin/login'}
                      className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-[#fafafa] text-left flex items-center gap-2"
                    >
                      <LogOut size={12} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
        
        <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        
        <div className="p-4 md:p-12 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)] overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
