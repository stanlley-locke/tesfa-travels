'use client';

import { Search, Plus, MoreHorizontal, MessageCircle, Ticket, Users, RefreshCw, Archive, Trash2, Send, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { markInquiryRead } from '@/app/actions/inquiries';

export default function ClientsCRMClientPage({ initialInquiries }: { initialInquiries: any[] }) {
  const [activeTab, setActiveTab] = useState('messages');
  const [activeMessage, setActiveMessage] = useState<string | null>(initialInquiries.length > 0 ? initialInquiries[0].id : null);

  const clients = [
    { id: '1', initials: 'JM', name: 'John Mbugua', email: 'john@email.com', status: 'Active', volume: 5, revenue: 'KSh 245k' },
    { id: '2', initials: 'MK', name: 'Mary Kipchoge', email: 'mary@email.com', status: 'Offline', volume: 3, revenue: 'KSh 128k' },
    { id: '3', initials: 'AH', name: 'Ahmed Hassan', email: 'ahmed@email.com', status: 'Active', volume: 8, revenue: 'KSh 568k' },
  ];

  const currentMsg = initialInquiries.find(m => m.id === activeMessage) || initialInquiries[0];

  const handleMessageClick = async (id: string) => {
    setActiveMessage(id);
    const msg = initialInquiries.find(m => m.id === id);
    if (msg && msg.status === 'UNREAD') {
      await markInquiryRead(id);
    }
  };

  return (
    <div className="space-y-12 pb-20 p-10 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">03 / CRM & DATABASE</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Clients & CRM
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="FIND CLIENT..." 
              className="bg-white border border-neutral-200 pl-10 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-[#6b7b65] w-64 shadow-sm"
            />
          </div>
          <button className="bg-[#111111] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#6b7b65] transition-colors flex items-center gap-2 border border-[#111111] shadow-sm">
            <Plus size={14} /> New Client
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200">
        {[
          { id: 'customers', label: 'customers', icon: Users },
          { id: 'tickets', label: 'tickets', icon: Ticket },
          { id: 'messages', label: 'messages', icon: MessageCircle }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-3 transition-colors ${
              activeTab === tab.id 
                ? 'bg-[#111111] text-white' 
                : 'bg-transparent text-neutral-400 hover:text-[#111111] hover:bg-neutral-50'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'customers' && (
        <div className="bg-white border border-neutral-200 shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Client Profile</th>
                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Status</th>
                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Volume</th>
                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Revenue</th>
                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {clients.map((client) => (
                <tr key={client.id} className="group hover:bg-[#fafafa] transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#111111] font-bold tracking-tighter text-sm">
                        {client.initials}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#111111]">{client.name}</h4>
                        <p className="text-[10px] text-neutral-400 mt-1">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-neutral-50 border ${
                      client.status === 'Active' ? 'text-[#6b7b65] border-[#6b7b65]/20' : 'text-neutral-400 border-neutral-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${client.status === 'Active' ? 'bg-[#6b7b65]' : 'bg-neutral-300'}`}></span>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-bold text-[#111111]">{client.volume}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-bold text-[#111111]">{client.revenue}</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="p-2 hover:bg-neutral-100 text-neutral-400 hover:text-[#111111] transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="bg-white border border-neutral-200 flex flex-col h-[800px] overflow-hidden shadow-2xl">
          {/* Messages Header */}
          <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-[#fafafa]">
            <div>
              <h2 className="text-3xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>Inquiries Dashboard</h2>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-2">Real-time communications from visitors.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-neutral-200 bg-white text-[#111111] text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-50 hover:border-neutral-300 transition-colors shadow-sm">
              <RefreshCw size={12} /> Sync Inbox
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-neutral-200 flex flex-col bg-[#fafafa]">
              <div className="p-4 border-b border-neutral-200 bg-white">
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="SEARCH INBOX..." 
                    className="w-full bg-transparent border-none pl-10 pr-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#111111] outline-none placeholder:text-neutral-300"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
                {initialInquiries.length === 0 ? (
                  <div className="p-8 text-center text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                    Inbox is empty
                  </div>
                ) : (
                  initialInquiries.map((inq) => (
                    <div 
                      key={inq.id} 
                      onClick={() => handleMessageClick(inq.id)}
                      className={`p-6 border-b border-neutral-100 cursor-pointer transition-colors ${
                        activeMessage === inq.id ? 'bg-[#fafafa] border-l-4 border-l-[#111111]' : 'hover:bg-[#fafafa]/50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-sm font-bold ${inq.status === 'UNREAD' ? 'text-[#111111]' : 'text-neutral-500'}`}>{inq.firstName} {inq.lastName}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-xs mb-2 ${inq.status === 'UNREAD' ? 'text-[#111111] font-bold' : 'text-neutral-500'}`}>Inquiry: {inq.service}</p>
                      <p className="text-[10px] text-neutral-400 font-medium truncate leading-relaxed">
                        {inq.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Message Details */}
            <div className="w-2/3 flex flex-col bg-white">
              {currentMsg ? (
                <>
                  {/* Detail Header */}
                  <div className="p-8 border-b border-neutral-200 flex justify-between items-center bg-[#fafafa]/50">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-[#111111] flex items-center justify-center text-white font-bold tracking-tighter text-xl">
                        {currentMsg.firstName.charAt(0)}{currentMsg.lastName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#111111]">{currentMsg.firstName} {currentMsg.lastName}</h4>
                        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mt-2">
                          <a href={`mailto:${currentMsg.email}`} className="hover:text-[#6b7b65] transition-colors">{currentMsg.email}</a>
                          <span>|</span>
                          <a href={`tel:${currentMsg.phone}`} className="hover:text-[#6b7b65] transition-colors">{currentMsg.phone}</a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-3 border border-neutral-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white text-neutral-400 transition-all bg-white"><Archive size={16} /></button>
                      <button className="p-3 border border-neutral-200 hover:border-red-500 hover:bg-red-500 hover:text-white text-neutral-400 transition-all bg-white"><Trash2 size={16} /></button>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="flex-1 overflow-y-auto p-10 space-y-12 bg-white">
                    <div className="flex justify-between items-center border-b border-neutral-200 pb-8">
                      <h3 className="text-4xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
                        {currentMsg.service.toUpperCase()} Request
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 bg-neutral-50 px-4 py-2 border border-neutral-200">
                        <Clock size={12} /> {new Date(currentMsg.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-neutral-50 border border-neutral-200 p-8 grid grid-cols-2 gap-y-6 gap-x-10 text-sm">
                      <div className="border-b border-neutral-200 pb-2">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-1">First Name</span> 
                        <span className="text-[#111111] font-medium">{currentMsg.firstName}</span>
                      </div>
                      <div className="border-b border-neutral-200 pb-2">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-1">Last Name</span> 
                        <span className="text-[#111111] font-medium">{currentMsg.lastName}</span>
                      </div>
                      <div className="border-b border-neutral-200 pb-2">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-1">Email Address</span> 
                        <span className="text-[#111111] font-medium">{currentMsg.email}</span>
                      </div>
                      <div className="border-b border-neutral-200 pb-2">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-1">Phone Number</span> 
                        <span className="text-[#111111] font-medium">{currentMsg.phone}</span>
                      </div>
                      <div className="col-span-2 border-b border-neutral-200 pb-2">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-1">Department / Service</span> 
                        <span className="text-[#6b7b65] font-bold uppercase">{currentMsg.service}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 flex items-center gap-2">
                        Message Content <MessageCircle size={12} />
                      </p>
                      <div className="text-[#111111] text-lg font-light leading-relaxed whitespace-pre-wrap p-8 border-l-2 border-[#6b7b65] bg-[#fafafa]">
                        "{currentMsg.message}"
                      </div>
                    </div>

                    {/* Reply Box */}
                    <div className="mt-16 border border-neutral-200 bg-white p-8 shadow-sm">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#111111] uppercase mb-6 block">Quick Respond</span>
                      <textarea 
                        className="w-full h-32 bg-[#fafafa] border border-neutral-200 p-4 text-sm text-[#111111] outline-none resize-none focus:border-[#6b7b65] transition-colors mb-6 placeholder:text-neutral-400"
                        placeholder="Draft your response to the client here..."
                      ></textarea>
                      <div className="flex justify-end">
                        <button className="bg-[#111111] hover:bg-[#6b7b65] text-white px-8 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-3">
                          Send Secure Reply <Send size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-white">
                  <div className="text-center text-neutral-400">
                    <MessageCircle size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase">No message selected</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
