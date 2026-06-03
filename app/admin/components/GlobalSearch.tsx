'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Package, Users, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function GlobalSearch({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ clients: any[], packages: any[], inquiries: any[] }>({ clients: [], packages: [], inquiries: [] });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults({ clients: [], packages: [], inquiries: [] });
    }
  }, [isOpen]);

  // Handle keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search triggered from layout
          // Handled in layout.tsx via event listener or state lift
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query) {
      setResults({ clients: [], packages: [], inquiries: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  const totalResults = results.clients.length + results.packages.length + results.inquiries.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden border border-neutral-200"
          >
            {/* Input Header */}
            <div className="flex items-center p-4 border-b border-neutral-200 bg-[#fafafa]">
              <Search className="text-neutral-400 mr-3" size={20} />
              <input 
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search clients, destinations, inquiries..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-[#111111] placeholder:text-neutral-300 uppercase tracking-widest"
              />
              {isLoading ? (
                <Loader2 className="animate-spin text-[#6b7b65]" size={18} />
              ) : (
                <button onClick={onClose} className="text-neutral-400 hover:text-[#111111] p-1 bg-white border border-neutral-200 text-[10px] uppercase font-bold tracking-widest px-2">
                  ESC
                </button>
              )}
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar bg-white">
              {!query && (
                <div className="p-12 text-center text-neutral-400 text-xs uppercase tracking-[0.2em] font-bold">
                  Start typing to search across the system
                </div>
              )}

              {query && totalResults === 0 && !isLoading && (
                <div className="p-12 text-center text-neutral-400 text-xs uppercase tracking-[0.2em] font-bold">
                  No results found for "{query}"
                </div>
              )}

              {/* Clients Section */}
              {results.clients.length > 0 && (
                <div className="p-2 border-b border-neutral-100">
                  <div className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7b65] flex items-center gap-2">
                    <Users size={12} /> Clients & CRM
                  </div>
                  {results.clients.map((client) => (
                    <div 
                      key={client.id}
                      onClick={() => handleNavigate('/admin/bookings')}
                      className="px-4 py-3 hover:bg-[#fafafa] cursor-pointer flex justify-between items-center group transition-colors"
                    >
                      <div>
                        <div className="text-sm font-bold text-[#111111]">{client.name}</div>
                        <div className="text-xs text-neutral-400">{client.email}</div>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 group-hover:text-[#111111] opacity-0 group-hover:opacity-100 transition-all">
                        View <span className="text-[#6b7b65]">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Packages Section */}
              {results.packages.length > 0 && (
                <div className="p-2 border-b border-neutral-100">
                  <div className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7b65] flex items-center gap-2">
                    <Package size={12} /> Destinations & Packages
                  </div>
                  {results.packages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      onClick={() => handleNavigate('/admin/packages')}
                      className="px-4 py-3 hover:bg-[#fafafa] cursor-pointer flex justify-between items-center group transition-colors"
                    >
                      <div>
                        <div className="text-sm font-bold text-[#111111]">{pkg.name}</div>
                        <div className="text-xs text-neutral-400">{pkg.price} • {pkg.status}</div>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 group-hover:text-[#111111] opacity-0 group-hover:opacity-100 transition-all">
                        View <span className="text-[#6b7b65]">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Inquiries Section */}
              {results.inquiries.length > 0 && (
                <div className="p-2">
                  <div className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b7b65] flex items-center gap-2">
                    <MessageCircle size={12} /> Inquiries & Messages
                  </div>
                  {results.inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      onClick={() => handleNavigate('/admin/bookings')}
                      className="px-4 py-3 hover:bg-[#fafafa] cursor-pointer flex justify-between items-center group transition-colors"
                    >
                      <div>
                        <div className="text-sm font-bold text-[#111111]">{inq.firstName} {inq.lastName}</div>
                        <div className="text-xs text-neutral-400">Request: {inq.service} • Status: {inq.status}</div>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 group-hover:text-[#111111] opacity-0 group-hover:opacity-100 transition-all">
                        View <span className="text-[#6b7b65]">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-[#111111] p-3 flex justify-between items-center text-white/50 text-[9px] uppercase tracking-widest font-bold">
              <div>Navigate System Faster</div>
              <div className="flex gap-4">
                <span><span className="text-white border border-white/20 px-1 py-0.5 rounded-sm mr-1">↑↓</span> to navigate</span>
                <span><span className="text-white border border-white/20 px-1 py-0.5 rounded-sm mr-1">Enter</span> to select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
