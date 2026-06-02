'use client';

import { useState } from 'react';
import { ShieldCheck, User, Mail, Lock, Save } from 'lucide-react';
import { updateAdminSettings } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function SettingsClientPage({ admin }: { admin: any }) {
  const [email, setEmail] = useState(admin.email);
  const [password, setPassword] = useState(admin.password);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    const res = await updateAdminSettings(admin.email, {
      newEmail: email,
      newPassword: password,
    });

    if (res.success) {
      setMessage('Profile updated successfully.');
      if (email !== admin.email) {
        document.cookie = `adminEmail=${email}; path=/`;
      }
      router.refresh();
    } else {
      setMessage(res.error || 'Failed to update profile.');
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-12 pb-20 p-10 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">05 / SYSTEM</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Profile Settings
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-4">Manage your administrative access and credentials.</p>
        </div>
      </div>

      <div className="max-w-2xl bg-white border border-neutral-200 shadow-xl p-10">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-neutral-100">
          <div className="w-16 h-16 bg-[#111111] flex items-center justify-center text-white text-xl font-bold tracking-tighter rounded-none">
            {email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tighter text-[#111111]" style={{ fontFamily: 'var(--font-sans)' }}>Admin Profile</h2>
            <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Role: <span className="text-[#6b7b65]">{admin.role}</span></p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 flex items-center gap-2">
              <Mail size={12} /> Email Address
            </label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-transparent border-b border-neutral-200 py-3 text-lg text-[#111111] focus:outline-none focus:border-[#6b7b65] transition-colors placeholder:text-neutral-300 rounded-none" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 flex items-center gap-2">
              <Lock size={12} /> Access Key (Password)
            </label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-transparent border-b border-neutral-200 py-3 text-lg text-[#111111] focus:outline-none focus:border-[#6b7b65] transition-colors placeholder:text-neutral-300 rounded-none" 
            />
          </div>

          {message && (
            <div className={`p-4 text-[10px] font-bold tracking-widest uppercase ${message.includes('successfully') ? 'text-[#6b7b65] bg-[#6b7b65]/10' : 'text-red-500 bg-red-500/10'}`}>
              {message}
            </div>
          )}

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-[#111111] text-white px-8 py-4 text-[10px] font-bold tracking-widest uppercase hover:bg-[#6b7b65] transition-colors flex items-center gap-3 border border-[#111111] shadow-sm disabled:opacity-70 disabled:hover:bg-[#111111]"
            >
              <Save size={14} /> {isSaving ? 'Saving...' : 'Update Settings'}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-2xl mt-8 bg-neutral-50 border border-neutral-200 p-8 flex items-start gap-6">
        <ShieldCheck size={24} className="text-[#6b7b65] shrink-0" />
        <div>
          <h3 className="text-sm font-bold tracking-tighter text-[#111111] uppercase mb-2">Security Notice</h3>
          <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 leading-relaxed">
            Changing your email address will update your login credentials. You will need to use your new email address to log in to the Tesfa Travel Management Hub the next time you exit your session.
          </p>
        </div>
      </div>
    </div>
  );
}
