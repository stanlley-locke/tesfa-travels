'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';
import { useState } from 'react';

export default function VisaTrackingPage() {
  const [refNumber, setRefNumber] = useState('');
  const [showResults, setShowResults] = useState(false);

  const mockApplications: Record<string, any> = {
    'TSF-2024-001': {
      id: 'TSF-2024-001',
      country: 'Ethiopia',
      applicant: 'John Doe',
      status: 'approved',
      submittedDate: '2024-04-15',
      statusDate: '2024-05-01',
      nextStep: 'Ready for pickup',
    },
    'TSF-2024-002': {
      id: 'TSF-2024-002',
      country: 'United Arab Emirates',
      applicant: 'Jane Smith',
      status: 'processing',
      submittedDate: '2024-04-20',
      statusDate: '2024-05-08',
      nextStep: 'Awaiting embassy response',
    },
    'TSF-2024-003': {
      id: 'TSF-2024-003',
      country: 'United Kingdom',
      applicant: 'Mike Johnson',
      status: 'pending',
      submittedDate: '2024-05-05',
      statusDate: '2024-05-08',
      nextStep: 'Document verification in progress',
    },
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (refNumber.trim()) {
      setShowResults(true);
    }
  };

  const currentApp = mockApplications[refNumber];

  const getStatusIcon = (status: string) => {
    if (status === 'approved') return <CheckCircle2 size={24} className="text-green-500" />;
    if (status === 'processing') return <Clock size={24} className="text-blue-500" />;
    return <AlertCircle size={24} className="text-yellow-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'approved') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (status === 'processing') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary dark:text-white mb-4">
            Visa Tracking
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Track your visa application status in real-time
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSearch} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8">
            <label className="block text-primary dark:text-white font-semibold mb-4">
              Enter your booking reference number
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g., TSF-2024-001"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-4 py-3 text-primary dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-200 whitespace-nowrap"
              >
                Track
              </button>
            </div>
          </form>

          {/* Results */}
          {showResults && (
            <div className="mt-12">
              {currentApp ? (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                    <div>
                      <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">
                        {currentApp.country} Visa
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        Applicant: {currentApp.applicant}
                      </p>
                    </div>
                    {getStatusIcon(currentApp.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Current Status
                      </p>
                      <div
                        className={`px-4 py-2 rounded-full font-semibold text-center ${getStatusColor(
                          currentApp.status
                        )}`}
                      >
                        {currentApp.status.charAt(0).toUpperCase() + currentApp.status.slice(1)}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Submitted Date
                      </p>
                      <p className="text-lg font-semibold text-primary dark:text-white">
                        {currentApp.submittedDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Last Updated
                      </p>
                      <p className="text-lg font-semibold text-primary dark:text-white">
                        {currentApp.statusDate}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <h3 className="font-semibold text-primary dark:text-white mb-2">
                      Next Steps
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {currentApp.nextStep}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <AlertCircle size={48} className="text-yellow-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Reference number not found
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Please double-check your booking reference and try again.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Demo Section */}
      {!showResults && (
        <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-8 text-center">
              Demo References
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 mb-8">
              Try these reference numbers to see how tracking works:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(mockApplications).map((app: any) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setRefNumber(app.id);
                    setShowResults(true);
                  }}
                  className="p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-accent transition-colors text-left"
                >
                  <p className="font-mono font-bold text-primary dark:text-white mb-2">
                    {app.id}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {app.country} - {app.status}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
