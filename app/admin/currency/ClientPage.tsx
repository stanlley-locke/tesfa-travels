'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft, Globe } from 'lucide-react';

export default function CurrencyClientPage() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const commonCurrencies = ['USD', 'KES', 'EUR', 'GBP', 'AED', 'ZAR', 'CAD', 'AUD', 'CHF', 'JPY', 'CNY'];

  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdated(new Date().toLocaleString());
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const calculateConversion = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return '0.00';
    const amountNum = parseFloat(amount) || 0;
    
    // Convert to USD base first, then to target
    const usdAmount = amountNum / rates[fromCurrency];
    const targetAmount = usdAmount * rates[toCurrency];
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: toCurrency,
    }).format(targetAmount);
  };

  return (
    <div className="space-y-12 pb-20 p-10 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">04 / TRAVEL OPERATIONS</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Currency Tools
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-4">Live foreign exchange calculator for client quotes.</p>
        </div>
        <button 
          onClick={fetchRates}
          disabled={isLoading}
          className="bg-white border border-neutral-200 text-[#111111] px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-50 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> 
          {isLoading ? 'Fetching Rates...' : 'Sync Live Rates'}
        </button>
      </div>

      <div className="max-w-4xl bg-white border border-neutral-200 shadow-xl overflow-hidden">
        <div className="p-10 border-b border-neutral-100 bg-[#fafafa]/50 flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tighter text-[#111111] flex items-center gap-3" style={{ fontFamily: 'var(--font-sans)' }}>
            <Globe className="text-[#6b7b65]" size={20} />
            Global Converter
          </h2>
          {lastUpdated && (
             <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-400 bg-white px-3 py-1 border border-neutral-200 shadow-sm">
               Last Sync: {lastUpdated}
             </span>
          )}
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-7 gap-8 items-end relative">
          <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Amount</label>
            <input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              className="w-full bg-transparent border-b border-neutral-200 py-4 text-3xl font-light text-[#111111] focus:outline-none focus:border-[#6b7b65] transition-colors rounded-none" 
              placeholder="0.00"
            />
          </div>

          <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">From</label>
            <div className="relative">
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-white border border-neutral-200 py-4 px-4 text-sm font-bold tracking-widest uppercase text-[#111111] appearance-none outline-none focus:border-[#6b7b65] transition-colors shadow-sm cursor-pointer"
              >
                {commonCurrencies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option disabled>──────────</option>
                {Object.keys(rates).filter(c => !commonCurrencies.includes(c)).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-1 flex justify-center pb-4">
            <button 
              onClick={handleSwap}
              className="w-12 h-12 bg-[#111111] text-white rounded-full flex items-center justify-center hover:bg-[#6b7b65] transition-colors shadow-lg hover:scale-105"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">To</label>
            <div className="relative">
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-white border border-neutral-200 py-4 px-4 text-sm font-bold tracking-widest uppercase text-[#111111] appearance-none outline-none focus:border-[#6b7b65] transition-colors shadow-sm cursor-pointer"
              >
                {commonCurrencies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option disabled>──────────</option>
                {Object.keys(rates).filter(c => !commonCurrencies.includes(c)).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-10 bg-[#111111] text-white flex flex-col items-center justify-center py-16">
           <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase mb-4">Converted Value</span>
           <div className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
             {isLoading ? '...' : calculateConversion()}
           </div>
           {!isLoading && rates[fromCurrency] && rates[toCurrency] && (
             <div className="mt-8 text-[10px] font-bold tracking-widest uppercase text-[#6b7b65] bg-white/10 px-6 py-2 border border-white/10">
               Market Rate: 1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
