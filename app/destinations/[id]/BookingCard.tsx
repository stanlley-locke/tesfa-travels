'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import { submitInquiry } from '@/app/actions/inquiries';
import { motion, AnimatePresence } from 'framer-motion';

export function BookingCard({ pkg }: { pkg: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent, type: string) => {
    e.preventDefault();
    const res = await submitInquiry({
      ...formData,
      service: pkg.name,
      type,
      packageId: pkg.id,
    });
    if (res.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
      }, 3000);
    }
  };

  const handleBookNow = async () => {
    // For "Book Now", we can submit a quick booking inquiry immediately, 
    // or open the modal with type="BOOKING". Let's open the modal but prefill message.
    setFormData(prev => ({...prev, message: `I would like to book the ${pkg.name} package.`}));
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-10">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-2">Starting From</div>
        <div className="text-4xl font-medium text-[#111111] mb-8">{pkg.price || 'Contact for Price'}</div>
        
        <div className="space-y-6 mb-10">
          <div className="flex items-start gap-4 pb-6 border-b border-neutral-100">
            <Users size={24} strokeWidth={1} className="text-[#6b7b65] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#111111] mb-1">Capacity</div>
              <div className="text-sm text-neutral-500 font-light">{pkg.capacity ? `Up to ${pkg.capacity} people` : 'Flexible'}</div>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-6 border-b border-neutral-100">
            <ShieldCheck size={24} strokeWidth={1} className="text-[#6b7b65] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#111111] mb-1">Secure Booking</div>
              <div className="text-sm text-neutral-500 font-light">100% money-back guarantee within 24 hours.</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleBookNow}
            className="flex items-center justify-center w-full bg-[#111111] hover:bg-[#6b7b65] text-white py-4 text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
          >
            Book Now
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center w-full border border-neutral-200 hover:border-[#6b7b65] hover:text-[#6b7b65] bg-white py-3 text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Quick Inquire
            </button>
            <Link 
              href={`/contact?subject=Inquiry about: ${pkg.name}`} 
              className="flex items-center justify-center w-full border border-neutral-200 hover:border-[#6b7b65] hover:text-[#6b7b65] bg-white py-3 text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        <p className="text-center text-[10px] text-neutral-400 font-mono mt-6 uppercase tracking-widest">
          T&C Apply. Subject to availability.
        </p>
      </div>

      {/* Quick Inquire / Book Now Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-black z-10"
              >
                <X size={24} />
              </button>

              <div className="p-10 md:p-12">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-[#6b7b65]/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-[#6b7b65]" />
                    </div>
                    <h3 className="text-2xl font-medium text-[#1a1a1a] mb-2">Request Sent!</h3>
                    <p className="text-neutral-500 font-light text-sm">
                      Our specialist for <span className="font-medium">{pkg.name}</span> will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <span className="text-[#6b7b65] font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">Request Details</span>
                    <h2 className="text-3xl font-medium text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                      {pkg.name}
                    </h2>
                    <p className="text-neutral-500 font-light text-sm mb-8">
                      Fill out the form below to get a customized itinerary and pricing.
                    </p>

                    <form onSubmit={(e) => handleSubmit(e, formData.message.includes('book') ? 'BOOKING' : 'QUICK_INQUIRY')} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">First Name</label>
                          <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65]" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Last Name</label>
                          <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Email Address</label>
                          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65]" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Phone</label>
                          <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65]" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Message / Dates / Travelers</label>
                        <textarea required rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#6b7b65] resize-none"></textarea>
                      </div>

                      <button type="submit" className="w-full bg-[#6b7b65] hover:bg-[#5a6a54] text-white py-4 text-xs font-bold uppercase tracking-widest transition-colors mt-4">
                        Send Request
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
