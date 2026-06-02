import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';

export const metadata = {
  title: 'Privacy Policy | Tesfa Travels',
  description: 'Learn how Tesfa Travels collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#6b7b65] selection:text-white flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 border-b border-neutral-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Privacy Background" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <span className="text-neutral-300 font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Legal</span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            Privacy <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Policy</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm uppercase tracking-widest">Last Updated: June 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 flex-grow">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 prose-p:text-neutral-500 prose-p:leading-relaxed prose-p:font-light prose-li:text-neutral-500 prose-li:font-light">
            
            <p className="text-xl text-neutral-600 mb-12">
              At Tesfa Travels, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our services, visit our website, or interact with our travel consultants.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect personal information that you provide directly to us, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and physical address.</li>
              <li><strong>Travel Details:</strong> Passport information, frequent flyer numbers, dietary requirements, and specific travel preferences.</li>
              <li><strong>Payment Information:</strong> Credit card details and billing addresses (processed securely through our accredited payment gateways).</li>
              <li><strong>Corporate Account Data:</strong> Company details, employee travel policies, and authorization protocols for bespoke corporate travel management.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We utilize the collected information for the following primary purposes:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>To facilitate global air ticketing, hotel reservations, and bespoke travel itineraries.</li>
              <li>To provide comprehensive support for visa documentation and applications.</li>
              <li>To communicate important updates regarding your bookings, flight changes, or travel advisories.</li>
              <li>To personalize your travel experience based on your documented preferences.</li>
              <li>To comply with international aviation regulations and IATA guidelines.</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>As an international travel agency, it is necessary to share certain information with third-party service providers to fulfill your bookings. We may share your data with:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Airlines, hotels, car rental agencies, and tour operators directly involved in your itinerary.</li>
              <li>Embassies and consulates (specifically for visa assistance services).</li>
              <li>Global Distribution Systems (GDS) and IATA regulatory bodies.</li>
            </ul>
            <p>We <strong>do not</strong> sell, rent, or lease your personal information to third parties for marketing purposes.</p>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures, including SSL encryption and secure server hosting, to protect your personal information against unauthorized access, alteration, or destruction. However, please note that no method of electronic transmission over the internet is 100% secure.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, or request the deletion of your personal data. If you have created an account with us, you can manage your preferences directly, or you may contact our 24/7 Global Support team for assistance.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
              Tesfa Travels reserves the right to update this Privacy Policy at any time. Any changes will be reflected on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact our data protection officer at:
            </p>
            <div className="bg-neutral-50 p-8 border border-neutral-100 mt-6">
              <p className="font-medium text-black m-0">Tesfa Travels Compliance</p>
              <p className="m-0 mt-2">Email: privacy@tesfatravels.com</p>
              <p className="m-0">Phone: +1 (800) 555-0199</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
