'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ArrowRight, Plane, FileText, Briefcase, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { submitInquiry } from '@/app/actions/inquiries';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await submitInquiry(formData);
      if (res.success) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            service: '',
            message: '',
          });
          setSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const desks = [
    { name: 'Global Ticketing Desk', icon: Plane, phone: '+254 713 303 030', email: 'tickets@tesfatravels.com' },
    { name: 'Visa Processing Center', icon: FileText, phone: '+254 759 888 743', email: 'visas@tesfatravels.com' },
    { name: 'Corporate & M.I.C.E.', icon: Briefcase, phone: '+254 713 303 030', email: 'corporate@tesfatravels.com' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#6b7b65] selection:text-white">
      <Header />

      {/* Cinematic Hero */}
      <section className="relative h-[65vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Tesfa Travels"
            fill
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#fbfbfb] from-0% via-80% to-100%"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center mt-20">
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Connect With Us</span>
          <h1 className="text-[48px] md:text-[72px] font-medium text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            Get In <span className="font-light italic text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
            Our expert agents are standing by to assist with your travel planning, visa processing, and corporate logistics.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 px-6 bg-[#fbfbfb]">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Direct Contact & Location */}
          <div className="lg:col-span-5 space-y-12">
            {/* Location Cards */}
            <div className="space-y-6">
              {[
                {
                  city: 'Nairobi, Kenya',
                  type: 'Headquarters',
                  address: 'Shujah Mall, 2nd Floor\nKilimani Area',
                  hours: 'Mon-Sun, 9:00 AM - 6:00 PM',
                  phones: []
                },
                {
                  city: 'Juba, South Sudan',
                  type: 'Branch Office',
                  address: 'Atla bara Tumbra road',
                  hours: 'Mon-Fri, 9:00 AM - 5:00 PM',
                  phones: ['+211 911 779 928', '+211 928 633 444'],
                  email: 'Tesfatraveljuba@gmail.com'
                },
                {
                  city: 'Addis Ababa, Ethiopia',
                  type: 'Branch Office',
                  address: 'Dembel city centre\nbeside Yemeni Airways 1st floor',
                  hours: 'Mon-Fri, 9:00 AM - 5:00 PM',
                  phones: ['+251 927 263 802']
                },
                {
                  city: 'Asmara, Eritrea',
                  type: 'Branch Office',
                  address: 'kebabi Bar zili shida',
                  hours: 'Mon-Fri, 9:00 AM - 5:00 PM',
                  phones: ['+291 747 1111']
                }
              ].map((loc, idx) => (
                <div key={idx} className="bg-white p-8 border border-neutral-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#6b7b65]/5 rounded-bl-[80px] -z-0 transition-transform group-hover:scale-150 duration-700"></div>
                  <div className="relative z-10">
                    <MapPin size={20} className="text-[#6b7b65] mb-4" />
                    <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-2">{loc.type}</h3>
                    <h4 className="text-xl font-medium text-[#111111] mb-4">{loc.city}</h4>
                    <p className="text-neutral-600 font-light text-sm leading-relaxed mb-4 whitespace-pre-line">
                      {loc.address}
                    </p>
                    {loc.phones.length > 0 && (
                      <div className="flex flex-col gap-1 mb-4">
                        {loc.phones.map((phone, i) => (
                          <a key={i} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm font-mono text-neutral-500 hover:text-[#6b7b65] transition-colors">{phone}</a>
                        ))}
                      </div>
                    )}
                    {loc.email && (
                      <a href={`mailto:${loc.email}`} className="text-sm font-mono text-neutral-500 hover:text-[#6b7b65] transition-colors block mb-4">{loc.email}</a>
                    )}
                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium pt-4 border-t border-neutral-100">
                      <Clock size={14} className="text-[#6b7b65]" />
                      {loc.hours}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Department Desks */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111] mb-6">Direct Lines</h3>
              {desks.map((desk, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-white border border-neutral-200 shadow-sm hover:border-[#6b7b65]/30 transition-colors">
                  <div className="w-12 h-12 bg-[#111111] text-white flex items-center justify-center shrink-0">
                    <desk.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#111111] font-bold mb-1 text-sm">{desk.name}</h4>
                    <div className="flex flex-col sm:flex-row sm:gap-4 text-xs text-neutral-500 font-mono tracking-wider mt-2">
                      <a href={`tel:${desk.phone}`} className="hover:text-[#6b7b65]">{desk.phone}</a>
                      <span className="hidden sm:inline text-neutral-300">|</span>
                      <a href={`mailto:${desk.email}`} className="hover:text-[#6b7b65]">{desk.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <Link
              href="https://wa.me/254713303030"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-lg"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </Link>

          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-10 md:p-14 border border-neutral-200 shadow-xl h-full">
              <div className="mb-10 border-b border-neutral-100 pb-8">
                <h2 className="text-3xl font-medium text-[#111111] tracking-tight mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                  Submit an Inquiry
                </h2>
                <p className="text-neutral-500 font-light leading-relaxed">
                  Fill out the form below detailing your travel requirements. A specialist will review your request and contact you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-[#6b7b65]/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-[#6b7b65]" />
                  </div>
                  <h3 className="text-2xl font-medium text-[#111111] mb-2">Request Received</h3>
                  <p className="text-neutral-500 font-light max-w-sm mx-auto">
                    Thank you. We have received your details and our team is preparing a response.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-neutral-300 py-3 text-[#111111] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-neutral-300 py-3 text-[#111111] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-neutral-300 py-3 text-[#111111] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-neutral-300 py-3 text-[#111111] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors"
                        placeholder="+254 700 000 000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Department</label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-neutral-300 py-3 text-[#111111] focus:outline-none focus:border-[#6b7b65] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select the relevant desk</option>
                        <option value="flights">Global Ticketing</option>
                        <option value="visa">Visa Processing</option>
                        <option value="corporate">Corporate / MICE</option>
                        <option value="hotels">Hotel Booking</option>
                        <option value="other">General Inquiry</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                        <ArrowRight size={14} className="rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-neutral-300 py-3 text-[#111111] placeholder-neutral-300 focus:outline-none focus:border-[#6b7b65] transition-colors resize-none"
                      placeholder="Please provide details about your travel dates, destinations, or specific requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#111111] hover:bg-[#333333] text-white py-5 flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-4"
                  >
                    Send Secure Message <Send size={16} />
                  </button>
                  <p className="text-center text-[10px] text-neutral-400 uppercase tracking-widest mt-4">
                    Protected by SSL Encryption
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}


