'use client';

import { useState } from 'react';
import { Plus, Calendar, MapPin, FileText, ChevronRight, Filter, Search, MoreHorizontal, Award, TrendingUp, ChevronDown, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToExcel, exportToPDF } from '@/lib/exportUtils';

import { VisaApplication } from '@prisma/client';
import { createVisaApplication, updateVisaStatus, deleteVisaApplication } from '@/app/actions/visas';

export default function VisaPipelinePage({ initialVisas = [] }: { initialVisas: any[] }) {
  const [applications, setApplications] = useState(initialVisas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: '',
    country: '',
    passportDetails: '',
    type: 'Single',
    fee: 0,
  });

  const stages = ['Document Review', 'Joint Review', 'Submitted', 'Processing', 'Ready for Pickup', 'Approved'];

  const getApplicationsByStage = (stage: string) => {
    return applications.filter((app: any) => app.status === stage);
  };

  const handleCreateVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await createVisaApplication(formData);
    if (result.success && result.data) {
      setApplications([result.data, ...applications]);
      setIsModalOpen(false);
      setFormData({ applicantName: '', country: '', passportDetails: '', type: 'Single', fee: 0 });
    }
    setIsSubmitting(false);
  };

  const handleMoveCard = async (appId: string, newStage: string) => {
    // Optimistic
    setApplications((prev: any[]) =>
      prev.map((app: any) => (app.id === appId ? { ...app, status: newStage } : app))
    );
    await updateVisaStatus(appId, newStage);
  };

  const handleExportExcel = () => {
    const dataToExport = applications.map((a: any) => ({
      Applicant: a.applicantName,
      Country: a.country,
      Type: a.type,
      Fee: a.fee,
      Status: a.status,
      Submitted: new Date(a.createdAt).toLocaleDateString()
    }));
    exportToExcel(dataToExport, `Tesfa_Visa_Pipeline_${new Date().toISOString().split('T')[0]}`);
    setIsExportMenuOpen(false);
  };

  const handleExportPDF = () => {
    const headers = ['Applicant', 'Country', 'Type', 'Fee', 'Status', 'Submitted Date'];
    const dataToExport = applications.map((a: any) => [
      a.applicantName, a.country, a.type, a.fee, a.status, new Date(a.createdAt).toLocaleDateString()
    ]);
    exportToPDF(headers, dataToExport, `Tesfa_Visa_Pipeline_${new Date().toISOString().split('T')[0]}`, 'Tesfa Visa Applications Pipeline');
    setIsExportMenuOpen(false);
  };

  const totalApplications = applications.length;
  const approvedCount = applications.filter((a: any) => a.status === 'Approved').length;
  const totalRevenue = applications.reduce((sum: number, a: any) => sum + (a.fee || 0), 0);

  const displayMetrics = [
    { label: 'Total Applications', value: totalApplications.toString(), detail: 'Active Pipeline', status: 'Volume' },
    { label: 'Approved Visas', value: approvedCount.toString(), detail: 'Successfully Processed', status: 'Success' },
    { label: 'Total Revenue', value: `KSh ${totalRevenue.toLocaleString()}`, detail: 'From Visa Fees', status: 'Revenue' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-100 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">02 / VISA PIPELINE</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Applications
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="px-8 py-4 bg-white/40 backdrop-blur-md border border-neutral-100 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-white transition-all flex items-center gap-2"
            >
              Export <ChevronDown size={14} className={`transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isExportMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 shadow-xl z-50 flex flex-col"
                >
                  <button 
                    onClick={handleExportExcel}
                    className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-[#fafafa] hover:text-[#6b7b65] transition-colors text-left border-b border-neutral-100"
                  >
                    <FileSpreadsheet size={14} /> Excel
                  </button>
                  <button 
                    onClick={handleExportPDF}
                    className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-[#fafafa] hover:text-[#6b7b65] transition-colors text-left"
                  >
                    <FileText size={14} /> PDF
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-all flex items-center gap-2">
            <Plus size={14} /> New Record
          </button>
        </div>
      </div>

      {/* Metrics Section - High Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#6b7b65] border border-[#7a8a74] shadow-xl overflow-hidden">
        {displayMetrics.map((m: any, idx: number) => (
          <div key={`metric-${idx}`} className="bg-[#6b7b65] p-12 hover:bg-[#5a6a54] transition-all group border border-[#7a8a74]/50">
             <div className="flex justify-between items-center mb-8">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">{m.status}</span>
                <TrendingUp size={16} className="text-white/40 group-hover:text-white transition-colors" />
             </div>
             <h4 className="text-lg font-bold text-white tracking-tighter mb-1">{m.label}</h4>
             <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-white">{m.value}</p>
                <span className="text-[10px] font-bold text-[#f3e5ab]">{m.detail}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Kanban Board Container - Glassy Cards */}
      <div className="overflow-x-auto pb-12 -mx-12 px-12 no-scrollbar">
        <div className="flex gap-12 min-w-max">
          {stages.map((stage, stageIdx) => {
            const stageApps = getApplicationsByStage(stage);
            return (
              <div key={stage} className="w-[380px] flex-shrink-0 space-y-8">
                {/* Column Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-neutral-200">0{stageIdx + 1}</span>
                    <h3 className="text-xs font-bold text-[#111111] uppercase tracking-[0.2em]">{stage}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#6b7b65]">{stageApps.length}</span>
                </div>

                {/* Cards Container */}
                <div className="space-y-6 min-h-[600px]">
                  <AnimatePresence mode="popLayout">
                    {stageApps.map((app) => (
                      <motion.div
                        key={app.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-6 transition-all duration-500 cursor-grab active:cursor-grabbing group relative overflow-hidden flex flex-col justify-between shadow-lg border border-white/10"
                        style={{ 
                           aspectRatio: '1.586/1', 
                           borderRadius: '0px',
                           background: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)' 
                        }}
                      >
                        {/* Diagonal Stripes Pattern Overlay */}
                        <div className="absolute inset-0 opacity-20" style={{
                           backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)'
                        }} />

                        {/* Top Row: Brand & Delete */}
                        <div className="relative z-10 flex justify-between items-start">
                           <div className="flex flex-col">
                              <span className="text-white/90 text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-sans, sans-serif)' }}>Tesfa <span className="font-normal">Gold</span></span>
                              <span className="text-[7px] text-white/50 uppercase tracking-widest">{app.country} • {app.type}</span>
                           </div>
                           <button 
                            onClick={async () => {
                              await deleteVisaApplication(app.id);
                              setApplications(applications.filter((a: any) => a.id !== app.id));
                            }} 
                            className="text-white/30 hover:text-red-400 transition-colors"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>

                        {/* Middle Row: Chip & Contactless */}
                        <div className="relative z-10 flex items-center gap-3 mt-4">
                           {/* Fake Chip */}
                           <div className="w-10 h-8 rounded-md bg-gradient-to-br from-[#f3e5ab] to-[#c5a059] border border-[#a67c00] flex flex-col justify-between p-1 opacity-90 shadow-sm relative overflow-hidden">
                              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#a67c00]/40 -translate-x-1/2" />
                              <div className="absolute top-1/2 left-0 right-0 h-px bg-[#a67c00]/40 -translate-y-1/2" />
                              <div className="w-full h-full border border-[#a67c00]/40 rounded-sm" />
                           </div>
                           <div className="text-white/60 font-bold rotate-90 scale-y-150 text-sm">)))</div>
                        </div>

                        {/* Card Number */}
                        <div className="relative z-10 mt-4">
                           <p className="text-white text-xl font-mono tracking-widest" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                              4000 1234 5678 {app.id.toString().slice(-4).padStart(4, '0')}
                           </p>
                        </div>

                        {/* Bottom Row: Expiry, Name, VISA Logo */}
                        <div className="relative z-10 flex justify-between items-end mt-2">
                           <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                 <span className="text-[5px] text-white/70 uppercase leading-none text-right">Good<br/>Thru</span>
                                 <span className="text-white text-sm font-mono tracking-widest" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                                    {new Date(new Date(app.createdAt).setFullYear(new Date(app.createdAt).getFullYear() + 1)).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}
                                 </span>
                              </div>
                              <p className="text-white text-xs font-mono uppercase tracking-widest mt-1" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                                 {app.applicantName}
                              </p>
                           </div>

                           <div className="flex flex-col items-end gap-2">
                              <div className="text-white text-2xl font-black italic tracking-tighter leading-none" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>VISA</div>
                              
                              <button 
                                onClick={() => {
                                  const nextStageIdx = stages.indexOf(app.status) + 1;
                                  if (nextStageIdx < stages.length) {
                                    handleMoveCard(app.id, stages[nextStageIdx]);
                                  }
                                }}
                                className="text-[8px] font-bold uppercase tracking-widest text-[#111111] bg-white px-3 py-1.5 flex items-center gap-1 hover:bg-[#f3e5ab] transition-colors"
                              >
                                Advance Stage <ChevronRight size={10} />
                              </button>
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Visa Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 max-w-md w-full relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-black">✕</button>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>New Visa Application</h3>
            <form onSubmit={handleCreateVisa} className="space-y-4">
              <input type="text" placeholder="Applicant Name" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.applicantName} onChange={e => setFormData({...formData, applicantName: e.target.value})} />
              <input type="text" placeholder="Destination Country" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
              <input type="text" placeholder="Passport Details" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.passportDetails} onChange={e => setFormData({...formData, passportDetails: e.target.value})} />
              <select required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="Single">Single Entry</option>
                <option value="Multiple">Multiple Entry</option>
                <option value="EATV">EATV (KE-UG-RW)</option>
              </select>
              <input type="number" placeholder="Processing Fee (KSh)" required className="w-full p-4 border border-neutral-200 text-sm outline-none" value={formData.fee || ''} onChange={e => setFormData({...formData, fee: Number(e.target.value)})} />
              
              <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-colors disabled:opacity-50">
                {isSubmitting ? 'Saving...' : 'Add Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
