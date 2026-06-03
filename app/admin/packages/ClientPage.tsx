'use client';

import { useState } from 'react';
import { Package, BlogPost, Campaign } from '@prisma/client';
import { Search, Plus, MapPin, Pencil, Trash2, Image as ImageIcon, CheckCircle, Clock, ChevronDown, FileSpreadsheet, FileText } from 'lucide-react';
import { createPackage, updatePackage, updatePackageStatus, deletePackage } from '@/app/actions/packages';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToExcel, exportToPDF } from '@/lib/exportUtils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PackagesClientPage({ 
  initialPackages, 
  availableBlogPosts = [], 
  availableCampaigns = [] 
}: { 
  initialPackages: any[],
  availableBlogPosts?: BlogPost[],
  availableCampaigns?: Campaign[]
}) {
  const [packages, setPackages] = useState(initialPackages);
  const [isCreating, setIsCreating] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: string;
    image: string;
    capacity: string;
    blogPostIds: string[];
    campaignIds: string[];
  }>({ name: '', description: '', price: '', image: '', capacity: '', blogPostIds: [], campaignIds: [] });
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const res = await updatePackage(editingId, {
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
      });
      if (res.success && res.package) {
        setPackages(packages.map(p => p.id === editingId ? { ...p, ...res.package! } : p));
        setIsCreating(false);
        setEditingId(null);
        setFormData({ name: '', description: '', price: '', image: '', capacity: '', blogPostIds: [], campaignIds: [] });
        router.refresh();
      }
    } else {
      const res = await createPackage({
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
      });
      if (res.success && res.package) {
        setPackages([{ ...res.package, blogPosts: [], campaigns: [] }, ...packages]);
        setIsCreating(false);
        setFormData({ name: '', description: '', price: '', image: '', capacity: '', blogPostIds: [], campaignIds: [] });
        router.refresh();
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updatePackageStatus(id, newStatus);
    if (res.success) {
      setPackages(packages.map(p => p.id === id ? { ...p, status: newStatus } : p));
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      const res = await deletePackage(id);
      if (res.success) {
        setPackages(packages.filter(p => p.id !== id));
        router.refresh();
      }
    }
  };

  const handleEdit = (pkg: any) => {
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      image: pkg.image,
      capacity: pkg.capacity ? pkg.capacity.toString() : '',
      blogPostIds: pkg.blogPosts ? pkg.blogPosts.map((bp: any) => bp.id) : [],
      campaignIds: pkg.campaigns ? pkg.campaigns.map((c: any) => c.id) : [],
    });
    setEditingId(pkg.id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPackages = packages.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportExcel = () => {
    const dataToExport = filteredPackages.map((p: any) => ({
      Destination: p.name,
      Price: p.price,
      Capacity: p.capacity || 'Unlimited',
      Status: p.status,
      Description: p.description
    }));
    exportToExcel(dataToExport, `Tesfa_Packages_${new Date().toISOString().split('T')[0]}`);
    setIsExportMenuOpen(false);
  };

  const handleExportPDF = () => {
    const headers = ['Destination', 'Price', 'Capacity', 'Status'];
    const dataToExport = filteredPackages.map((p: any) => [
      p.name, p.price, p.capacity || 'Unlimited', p.status
    ]);
    exportToPDF(headers, dataToExport, `Tesfa_Packages_${new Date().toISOString().split('T')[0]}`, 'Tesfa Travel Packages Report');
    setIsExportMenuOpen(false);
  };

  return (
    <div className="space-y-12 pb-20 p-10 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">04 / TRAVEL OPERATIONS</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Destinations
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-4">Manage flight routes and global travel packages.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="FIND DESTINATION..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-neutral-200 pl-10 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-[#6b7b65] w-64 shadow-sm placeholder:text-neutral-300"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="bg-white text-[#111111] px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-50 transition-colors flex items-center gap-2 border border-neutral-200 shadow-sm"
            >
              Export <ChevronDown size={14} className={`transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isExportMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 shadow-xl z-50 flex flex-col"
                >
                  <button 
                    onClick={handleExportExcel}
                    className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-[#fafafa] hover:text-[#6b7b65] transition-colors text-left border-b border-neutral-100"
                  >
                    <FileSpreadsheet size={14} /> Excel
                  </button>
                  <button 
                    onClick={handleExportPDF}
                    className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-[#fafafa] hover:text-[#6b7b65] transition-colors text-left"
                  >
                    <FileText size={14} /> PDF
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={() => {
              setIsCreating(!isCreating);
              setEditingId(null);
              setFormData({ name: '', description: '', price: '', image: '', capacity: '', blogPostIds: [], campaignIds: [] });
            }}
            className="bg-[#111111] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#6b7b65] transition-colors flex items-center gap-2 border border-[#111111] shadow-sm"
          >
            <Plus size={14} /> Add Destination
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="mb-12 bg-white border border-neutral-200 p-8 shadow-sm">
          <h2 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-3">
            <MapPin className="text-[#6b7b65]" size={20} />
            {editingId ? 'Edit Destination' : 'Add Destination'}
          </h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-sm font-medium">
              <label className="text-neutral-500 text-xs tracking-widest uppercase">Destination Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-b border-neutral-200 py-2 outline-none focus:border-[#6b7b65] transition-colors bg-transparent" placeholder="e.g. Dubai Luxury Getaway" />
            </div>
            <div className="space-y-2 text-sm font-medium">
              <label className="text-neutral-500 text-xs tracking-widest uppercase">Price</label>
              <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border-b border-neutral-200 py-2 outline-none focus:border-[#6b7b65] transition-colors bg-transparent" placeholder="e.g. From $450" />
            </div>
            <div className="space-y-2 text-sm font-medium md:col-span-2">
              <label className="text-neutral-500 text-xs tracking-widest uppercase">Description</label>
              <input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border-b border-neutral-200 py-2 outline-none focus:border-[#6b7b65] transition-colors bg-transparent" placeholder="Short marketing description" />
            </div>
            <div className="space-y-2 text-sm font-medium">
              <label className="text-neutral-500 text-xs tracking-widest uppercase">Image Upload</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({...formData, image: reader.result as string});
                    };
                    reader.readAsDataURL(file);
                  }
                }} 
                className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
              />
              {formData.image && (
                <div className="mt-2 w-32 h-20 relative">
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>
            <div className="space-y-2 text-sm font-medium">
              <label className="text-neutral-500 text-xs tracking-widest uppercase">Capacity (Optional)</label>
              <input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="w-full border-b border-neutral-200 py-2 outline-none focus:border-[#6b7b65] transition-colors bg-transparent" placeholder="e.g. 10" />
            </div>

            {/* Relations */}
            <div className="space-y-2 text-sm font-medium">
              <label className="text-neutral-500 text-xs tracking-widest uppercase">Link Blog Posts</label>
              <select 
                multiple
                value={formData.blogPostIds}
                onChange={(e) => {
                  const options = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({...formData, blogPostIds: options});
                }}
                className="w-full border border-neutral-200 py-2 px-3 outline-none focus:border-[#6b7b65] transition-colors bg-transparent h-32"
              >
                {availableBlogPosts.map(bp => (
                  <option key={bp.id} value={bp.id}>{bp.title}</option>
                ))}
              </select>
              <p className="text-[10px] text-neutral-400">Hold Ctrl/Cmd to select multiple</p>
            </div>

            <div className="space-y-2 text-sm font-medium">
              <label className="text-neutral-500 text-xs tracking-widest uppercase">Link Campaigns</label>
              <select 
                multiple
                value={formData.campaignIds}
                onChange={(e) => {
                  const options = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({...formData, campaignIds: options});
                }}
                className="w-full border border-neutral-200 py-2 px-3 outline-none focus:border-[#6b7b65] transition-colors bg-transparent h-32"
              >
                {availableCampaigns.map(camp => (
                  <option key={camp.id} value={camp.id}>{camp.name} ({camp.discountCode})</option>
                ))}
              </select>
              <p className="text-[10px] text-neutral-400">Hold Ctrl/Cmd to select multiple</p>
            </div>
            {/* End Relations */}
          </form>
          <div className="mt-8 flex justify-end gap-4">
            <button 
              onClick={() => {
                setIsCreating(false);
                setFormData({ name: '', description: '', price: '', image: '', capacity: '', blogPostIds: [], campaignIds: [] });
              }}
              className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreate}
              className="bg-[#6b7b65] text-white px-8 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#5a6a54] transition-colors"
            >
              {editingId ? 'Save Changes' : 'Create Destination'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-[#6b7b65] border border-[#7a8a74] shadow-xl flex flex-col group overflow-hidden relative text-white">
            <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
              <Image 
                src={pkg.image} 
                alt={pkg.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className={`px-2 py-1 text-[9px] font-bold tracking-widest uppercase text-white ${pkg.status === 'PUBLISHED' ? 'bg-[#6b7b65]' : pkg.status === 'FULL' ? 'bg-red-900/80' : 'bg-neutral-800/80'}`}>
                  {pkg.status}
                </span>
                {pkg.capacity && (
                  <span className="px-2 py-1 text-[9px] font-bold tracking-widest uppercase text-white bg-black/50 backdrop-blur-sm">
                    {pkg.capacity} PAX
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-3xl font-bold tracking-tighter text-white leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>{pkg.name}</h3>
                </div>
                <p className="text-white/70 text-sm font-light mb-6 line-clamp-2">{pkg.description}</p>
              </div>
              
              <div>
                <div className="h-px w-full bg-white/10 mb-4"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-[#f3e5ab] uppercase">{pkg.price}</span>
                  
                  <div className="flex items-center gap-2">
                    <select 
                      value={pkg.status}
                      onChange={(e) => handleStatusChange(pkg.id, e.target.value)}
                      className="text-[9px] font-bold tracking-widest text-white/50 uppercase bg-transparent outline-none border-none cursor-pointer hover:text-white transition-colors"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="FULL">FULL</option>
                    </select>
                    
                    <div className="flex gap-2 ml-4 border-l border-white/10 pl-4">
                      <button onClick={() => handleEdit(pkg)} className="text-white/50 hover:text-white transition-colors" title="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(pkg.id)} className="text-white/50 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredPackages.length === 0 && (
          <div className="col-span-full py-20 text-center text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 font-light border border-dashed border-neutral-200">
            No destinations found. Add a new destination to get started.
          </div>
        )}
      </div>
    </div>
  );
}
