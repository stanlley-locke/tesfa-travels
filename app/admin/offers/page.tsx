'use client';

import { useState, useEffect, useRef } from 'react';
import { getOffers, createOffer, updateOffer, toggleOfferStatus, deleteOffer } from '@/app/actions/offers';
import { Search, Plus, MoreHorizontal, Archive, Trash2, Edit, RefreshCw, Image as ImageIcon, CheckCircle2, Target } from 'lucide-react';
import Image from 'next/image';

export default function OffersAdmin() {
  const [offers, setOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    validUntil: '',
    includedItemsText: '',
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setIsLoading(true);
    const res = await getOffers();
    if (res.success) {
      setOffers(res.offers || []);
    }
    setIsLoading(false);
  };

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        alert('Failed to upload image: ' + result.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const itemsArray = formData.includedItemsText
        .split('\n')
        .map(i => i.trim())
        .filter(i => i.length > 0);
        
      if (isEditing) {
        await updateOffer(isEditing, {
          ...formData,
          validUntil: formData.validUntil ? new Date(formData.validUntil) : null,
          includedItems: itemsArray
        });
      } else {
        await createOffer({
          ...formData,
          validUntil: formData.validUntil ? new Date(formData.validUntil) : null,
          includedItems: itemsArray
        });
      }
      setFormData({ title: '', description: '', price: '', image: '', validUntil: '', includedItemsText: '' });
      setIsEditing(null);
      setIsFormOpen(false);
      await fetchOffers();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (offer: any) => {
    setIsEditing(offer.id);
    setFormData({
      title: offer.title,
      description: offer.description,
      price: offer.price,
      image: offer.image,
      validUntil: offer.validUntil ? new Date(offer.validUntil).toISOString().split('T')[0] : '',
      includedItemsText: offer.includedItems ? offer.includedItems.join('\n') : '',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this offer/promotion?')) {
      await deleteOffer(id);
      fetchOffers();
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    await toggleOfferStatus(id, !currentStatus);
    fetchOffers();
  };

  return (
    <div className="space-y-12 pb-20 p-10 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">04 / MARKETING</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Offers & Promotions
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => fetchOffers()} className="p-3 border border-neutral-200 bg-white text-[#111111] hover:bg-neutral-50 transition-colors shadow-sm">
            <RefreshCw size={14} />
          </button>
          <button 
            onClick={() => {
              setIsFormOpen(true);
              setIsEditing(null);
              setFormData({ title: '', description: '', price: '', image: '', validUntil: '', includedItemsText: '' });
            }}
            className="bg-[#111111] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#6b7b65] transition-colors flex items-center gap-2 border border-[#111111] shadow-sm"
          >
            <Plus size={14} /> New Offer
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="bg-[#6b7b65] border border-[#7a8a74] shadow-2xl p-10 mb-12 relative text-white">
          <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white">
            <Archive size={20} />
          </button>
          <div className="mb-8 border-b border-white/10 pb-6">
             <h3 className="text-3xl font-bold text-white tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
               {isEditing ? 'Edit Promotion' : 'Create New Promotion'}
             </h3>
             <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold mt-2">Publish a new deal to the homepage and offers page.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="border-b border-white/10 pb-2">
                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-3">Offer Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-none text-lg text-white font-medium outline-none placeholder:text-white/30" placeholder="e.g. Dubai Summer Deal" />
              </div>
              <div className="border-b border-white/10 pb-2">
                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-3">Pricing Details</label>
                <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-transparent border-none text-lg text-white font-medium outline-none placeholder:text-white/30" placeholder="e.g. From $450/person" />
              </div>
              <div className="col-span-1 md:col-span-2 border-b border-white/10 pb-2">
                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-3">Validity Period (Optional)</label>
                <input type="date" value={formData.validUntil} onChange={e => setFormData({...formData, validUntil: e.target.value})} className="w-full md:w-1/2 bg-transparent border-none text-sm text-white font-medium outline-none placeholder:text-white/30" />
              </div>
              <div className="col-span-1 border-b border-white/10 pb-2">
                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-3">Image</label>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="flex-1 bg-transparent border border-neutral-200 px-4 py-2 text-xs text-[#111111] font-mono outline-none placeholder:text-neutral-300" placeholder="Paste URL or upload local file..." />
                    <button type="button" disabled={isUploading} onClick={() => fileInputRef.current?.click()} className="bg-neutral-100 px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors border border-neutral-200 disabled:opacity-50">
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </div>
                  {formData.image && (
                    <div className="relative h-24 w-40 border border-[#7a8a74] bg-[#5a6a54] overflow-hidden">
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-1 border-b border-white/10 pb-2">
                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-3">Description</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border-none text-sm text-white leading-relaxed outline-none resize-none placeholder:text-white/30" placeholder="Short description of the offer..." />
              </div>
              <div className="col-span-1 border-b border-white/10 pb-2">
                <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-3">Included Items (One per line)</label>
                <textarea rows={4} value={formData.includedItemsText} onChange={e => setFormData({...formData, includedItemsText: e.target.value})} className="w-full bg-transparent border-none text-sm text-white leading-relaxed outline-none resize-none placeholder:text-white/30" placeholder="Premium Accommodation&#10;Round-trip Airport Transfers" />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" disabled={isSubmitting} className="bg-[#111111] hover:bg-[#5a6a54] border border-[#111111] text-white px-10 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-3 disabled:opacity-50 shadow-md">
                {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Publish Offer')} <CheckCircle2 size={14} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-white border border-neutral-200 shadow-xl overflow-x-auto w-full">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-[#6b7b65] text-white border-b border-[#7a8a74]">
              <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/90">Offer Detail</th>
              <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/90">Price</th>
              <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/90">Status</th>
              <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/90 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {isLoading ? (
              <tr><td colSpan={4} className="text-center py-12 text-[10px] font-bold tracking-widest uppercase text-neutral-400">Loading offers...</td></tr>
            ) : offers.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-12 text-[10px] font-bold tracking-widest uppercase text-neutral-400">No active promotions found in database.</td></tr>
            ) : (
              offers.map((offer) => (
                <tr key={offer.id} className="group hover:bg-[#fafafa] transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-14 bg-neutral-100 flex items-center justify-center text-[#111111] relative overflow-hidden border border-neutral-200">
                        {offer.image ? (
                          <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                        ) : (
                          <ImageIcon size={16} className="text-neutral-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#111111]">{offer.title}</h4>
                        <p className="text-[10px] text-neutral-400 mt-1 max-w-xs truncate">{offer.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-bold text-[#111111] block">{offer.price}</span>
                    {offer.validUntil && (
                      <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-400 mt-1 block">Valid till: {new Date(offer.validUntil).toLocaleDateString()}</span>
                    )}
                  </td>
                  <td className="px-10 py-6">
                    <button 
                      onClick={() => handleToggle(offer.id, offer.isActive)}
                      className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest px-3 py-1 border transition-colors ${
                        offer.isActive ? 'text-[#6b7b65] border-[#6b7b65]/20 bg-[#6b7b65]/5 hover:bg-[#6b7b65]/10' : 'text-neutral-400 border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${offer.isActive ? 'bg-[#6b7b65]' : 'bg-neutral-300'}`}></span>
                      {offer.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(offer)} className="p-3 hover:bg-neutral-100 text-neutral-400 hover:text-[#111111] transition-colors border border-transparent hover:border-neutral-200">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(offer.id)} className="p-3 hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
