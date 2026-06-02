'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight } from 'lucide-react';

import { authenticateAdmin } from '@/app/actions/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    const res = await authenticateAdmin(email, password);
    setIsLoading(false);
    
    if (res.success) {
      document.cookie = "adminAuth=true; path=/";
      document.cookie = `adminEmail=${email}; path=/`;
      router.push('/admin');
    } else {
      setErrorMsg(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left Panel: Cinematic Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#111111]">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent mix-blend-multiply" />
        <Image
          src="/assets/pexels-planespotter-geneva-1877406873-36897685.jpg"
          alt="Executive Travel"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-16 pb-24">
          <ShieldCheck size={48} className="text-[#6b7b65] mb-8" />
          <h2 className="text-white text-5xl font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
            Tesfa Travel<br />
            <span className="font-light italic" style={{ fontFamily: 'var(--font-serif)' }}>Management Hub</span>
          </h2>
          <p className="text-white/60 text-lg max-w-md font-light">
            Authorized personnel only. Access core B2B travel operations, CRM, and global analytics.
          </p>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-[#fafafa]">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#6b7b65] uppercase mb-4 block">Secure Portal</span>
            <h1 className="text-4xl font-medium text-[#111111] mb-2 tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
              Authenticate
            </h1>
            <p className="text-neutral-500 font-light text-sm">
              Sign in with your corporate admin credentials to proceed.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Corporate Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-neutral-300 py-3 text-lg text-[#111111] focus:outline-none focus:border-[#6b7b65] transition-colors placeholder:text-neutral-300 rounded-none"
                placeholder="admin@tesfatravels.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Access Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-neutral-300 py-3 text-lg text-[#111111] focus:outline-none focus:border-[#6b7b65] transition-colors placeholder:text-neutral-300 rounded-none"
                placeholder="••••••••"
              />
            </div>

            {errorMsg && (
              <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-100 px-4 py-3 rounded-md">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#111111] text-white h-14 mt-8 flex items-center justify-center gap-3 hover:bg-[#6b7b65] transition-colors group disabled:opacity-70 disabled:hover:bg-[#111111] rounded-none"
            >
              <span className="text-sm font-bold tracking-widest uppercase">
                {isLoading ? 'Verifying...' : 'Access Hub'}
              </span>
              {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-16 text-center">
            <p className="text-xs text-neutral-400 font-medium">
              &copy; {new Date().getFullYear()} Tesfa Travels. IT & Security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
