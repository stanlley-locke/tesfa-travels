import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';

export const metadata = {
  title: 'Terms of Service | Tesfa Travels',
  description: 'Terms and conditions governing the use of Tesfa Travels services and website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#6b7b65] selection:text-white flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 border-b border-neutral-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Terms Background" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <span className="text-neutral-300 font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Legal</span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            Terms of <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Service</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm uppercase tracking-widest">Last Updated: June 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 flex-grow">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 prose-p:text-neutral-500 prose-p:leading-relaxed prose-p:font-light prose-li:text-neutral-500 prose-li:font-light">
            
            <p className="text-xl text-neutral-600 mb-12">
              Welcome to Tesfa Travels. By accessing our website, engaging with our consultants, or utilizing our booking services, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By utilizing the services provided by Tesfa Travels, including but not limited to air ticketing, hotel reservations, corporate travel management, and visa assistance, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, you must refrain from using our services.
            </p>

            <h2>2. Booking and Reservations</h2>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li><strong>Accuracy of Information:</strong> It is your responsibility to ensure that all names (matching passports exactly), dates, and itinerary details are correct before confirming a booking.</li>
              <li><strong>Fares and Pricing:</strong> All quotes are subject to availability and can change without prior notice until the final ticket issuance or booking confirmation.</li>
              <li><strong>Third-Party Providers:</strong> Tesfa Travels acts as an agent on behalf of airlines, hotels, and tour operators. We are not liable for changes, cancellations, or service failures initiated by these third parties.</li>
            </ul>

            <h2>3. Payment Terms</h2>
            <p>
              Full payment must be received before the issuance of any travel documentation or tickets. We accept major credit cards and corporate bank transfers. In the event of a payment dispute or chargeback, your booking may be immediately canceled, and you may be liable for any associated penalties imposed by the airline or hotel.
            </p>

            <h2>4. Cancellations and Refunds</h2>
            <p>
              Cancellation policies vary strictly depending on the airline, hotel, or service provider utilized for your specific itinerary. 
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Tesfa Travels charges a standardized administrative fee for processing cancellations and refunds, in addition to any penalties levied by the third-party provider.</li>
              <li>Non-refundable tickets and deeply discounted promotional fares cannot be refunded under any circumstances.</li>
              <li>Refund processing times depend on the respective airline or hotel and may take several weeks.</li>
            </ul>

            <h2>5. Travel Documents and Visas</h2>
            <p>
              While Tesfa Travels provides comprehensive visa assistance, the final decision regarding visa issuance rests entirely with the respective embassy or consulate. 
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>You are strictly responsible for ensuring you possess valid passports (with at least 6 months validity from the date of return) and required visas for your destination and transit points.</li>
              <li>Tesfa Travels is not liable for denied boarding or entry due to improper or insufficient documentation.</li>
            </ul>

            <h2>6. Limitation of Liability</h2>
            <p>
              Tesfa Travels, its directors, employees, and affiliates shall not be held liable for any direct, indirect, punitive, or consequential damages arising out of your use of our services, including but not limited to flight delays, baggage loss, personal injury, or acts of God (force majeure) during your travel.
            </p>

            <h2>7. Corporate Accounts</h2>
            <p>
              Entities engaging in corporate travel management with Tesfa Travels are subject to these general terms, supplemented by any specific Master Service Agreements (MSAs) or corporate travel policies established bilaterally between Tesfa Travels and the corporate entity.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the jurisdiction in which Tesfa Travels is officially registered, without regard to its conflict of law provisions.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
