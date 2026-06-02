'use client';

import { useState } from 'react';
import { Plus, Calendar, MapPin, FileText, ChevronRight, Filter, Search, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisaPipelinePage() {
  const [applications, setApplications] = useState([
    { id: 1, name: 'Grace Wanjiru', country: 'Ethiopia', date: '2024-05-10', stage: 'Document Review', type: 'Single' },
    { id: 2, name: 'James Omollo', country: 'EATV (KE-UG-RW)', date: '2024-05-08', stage: 'Joint Review', type: 'EATV' },
    { id: 3, name: 'Priya Singh', country: 'Qatar', date: '2024-05-12', stage: 'Processing', type: 'Single' },
    { id: 4, name: 'Mohamed Ali', country: 'EATV (KE-UG-RW)', date: '2024-05-05', stage: 'Submitted', type: 'EATV' },
    { id: 5, name: 'Catherine Kipchoge', country: 'Eritrea', date: '2024-04-28', stage: 'Ready for Pickup', type: 'Single' },
    { id: 6, name: 'Benjamin Gitonga', country: 'Ethiopia', date: '2024-04-15', stage: 'Approved', type: 'Single' },
  ]);

  const stages = ['Document Review', 'Joint Review', 'Submitted', 'Processing', 'Ready for Pickup', 'Approved'];

  const getApplicationsByStage = (stage: string) => {
    return applications.filter((app) => app.stage === stage);
  };

  const handleMoveCard = (appId: number, newStage: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, stage: newStage } : app))
    );
  };

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
          <button className="px-8 py-4 bg-white/40 backdrop-blur-md border border-neutral-100 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-white transition-all flex items-center gap-2">
            <Filter size={14} /> Filter
          </button>
          <button className="px-8 py-4 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b7b65] transition-all flex items-center gap-2">
            <Plus size={14} /> New Record
          </button>
        </div>
      </div>

      {/* Kanban Board Container - Glassy Cards */}
      <div className="overflow-x-auto pb-12 -mx-12 px-12 no-scrollbar">
        <div className="flex gap-12 min-w-max">
          {stages.map((stage, stageIdx) => {
            const stageApps = getApplicationsByStage(stage);
            return (
              <div key={stage} className="w-[320px] flex-shrink-0 space-y-8">
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
                        className="bg-white/40 backdrop-blur-md border border-neutral-100 p-8 hover:bg-white hover:shadow-2xl transition-all duration-700 cursor-grab active:cursor-grabbing group relative overflow-hidden"
                      >
                        {/* EATV Indicator */}
                        {app.type === 'EATV' && (
                          <div className="absolute top-0 right-0 p-1.5 bg-[#6b7b65] text-white text-[7px] font-bold uppercase tracking-tighter transform rotate-45 translate-x-[20px] translate-y-[-5px] w-24 text-center">
                            EATV JOINT
                          </div>
                        )}

                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h4 className="text-sm font-bold text-[#111111] mb-1">{app.name}</h4>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">{app.type}</span>
                          </div>
                          <button className="text-neutral-200 hover:text-[#111111] transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-neutral-500">
                             <MapPin size={12} className="text-neutral-300" />
                             <span className="text-[10px] font-medium">{app.country}</span>
                          </div>
                          <div className="flex items-center gap-4 text-neutral-500">
                             <Calendar size={12} className="text-neutral-300" />
                             <span className="text-[10px] font-medium">{app.date}</span>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 pt-8 border-t border-neutral-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              const nextStageIdx = stages.indexOf(app.stage) + 1;
                              if (nextStageIdx < stages.length) {
                                handleMoveCard(app.id, stages[nextStageIdx]);
                              }
                            }}
                            className="text-[9px] font-bold uppercase tracking-widest text-[#6b7b65] flex items-center gap-2 group/btn"
                          >
                            Advance <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          {app.type === 'EATV' && (
                            <div className="flex gap-1">
                              {['KE', 'UG', 'RW'].map(country => (
                                <div key={country} className="w-5 h-5 bg-neutral-50 flex items-center justify-center text-[7px] font-bold text-neutral-300">
                                  {country}
                                </div>
                              ))}
                            </div>
                          )}
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
    </div>
  );
}
