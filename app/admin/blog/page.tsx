'use client';

import { useState, useEffect, useRef } from 'react';
import { getPosts, createPost, updatePost, togglePublishStatus, deletePost } from '@/app/actions/blog';
import { getCampaigns, createCampaign, updateCampaign, toggleCampaignStatus, deleteCampaign } from '@/app/actions/campaigns';
import { Plus, Archive, Trash2, Edit, RefreshCw, Image as ImageIcon, CheckCircle2, MessageCircle, Globe, Percent } from 'lucide-react';
import Image from 'next/image';

export default function ContentAndCampaignsAdmin() {
  const [activeTab, setActiveTab] = useState<'blog' | 'campaigns'>('blog');
  
  // Blog State
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    image: '',
    authorName: 'Tesfa Team',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Campaigns State
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isCampaignsLoading, setIsCampaignsLoading] = useState(true);
  const [isCampaignEditing, setIsCampaignEditing] = useState<string | null>(null);
  const [isCampaignFormOpen, setIsCampaignFormOpen] = useState(false);
  const campaignFileInputRef = useRef<HTMLInputElement>(null);
  
  const [campaignFormData, setCampaignFormData] = useState({
    name: '',
    description: '',
    image: '',
    discountCode: '',
    validUntil: '',
  });

  const [isCampaignSubmitting, setIsCampaignSubmitting] = useState(false);

  useEffect(() => {
    if (activeTab === 'blog') {
      fetchPosts();
    } else {
      fetchCampaigns();
    }
  }, [activeTab]);

  const fetchPosts = async () => {
    setIsLoading(true);
    const res = await getPosts();
    if (res.success) {
      setPosts(res.posts || []);
    }
    setIsLoading(false);
  };

  const fetchCampaigns = async () => {
    setIsCampaignsLoading(true);
    const res = await getCampaigns();
    if (res.success) {
      setCampaigns(res.campaigns || []);
    }
    setIsCampaignsLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
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

  const handleCampaignImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const result = await response.json();
      
      if (result.success) {
        setCampaignFormData(prev => ({ ...prev, image: result.url }));
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

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const slug = formData.slug || generateSlug(formData.title);
      
      if (isEditing) {
        await updatePost(isEditing, { ...formData, slug });
      } else {
        await createPost({ ...formData, slug });
      }
      setFormData({ title: '', slug: '', content: '', image: '', authorName: 'Tesfa Team' });
      setIsEditing(null);
      setIsFormOpen(false);
      await fetchPosts();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post: any) => {
    setIsEditing(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      image: post.image || '',
      authorName: post.authorName,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await deletePost(id);
      fetchPosts();
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    await togglePublishStatus(id, !currentStatus);
    fetchPosts();
  };

  const handleCampaignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCampaignSubmitting) return;
    setIsCampaignSubmitting(true);
    
    try {
      const dataToSubmit = {
        ...campaignFormData,
        validUntil: campaignFormData.validUntil ? new Date(campaignFormData.validUntil) : null
      };

      if (isCampaignEditing) {
        await updateCampaign(isCampaignEditing, dataToSubmit);
      } else {
        await createCampaign(dataToSubmit);
      }
      setCampaignFormData({ name: '', description: '', image: '', discountCode: '', validUntil: '' });
      setIsCampaignEditing(null);
      setIsCampaignFormOpen(false);
      await fetchCampaigns();
    } finally {
      setIsCampaignSubmitting(false);
    }
  };

  const handleCampaignEdit = (campaign: any) => {
    setIsCampaignEditing(campaign.id);
    setCampaignFormData({
      name: campaign.name,
      description: campaign.description,
      image: campaign.image || '',
      discountCode: campaign.discountCode,
      validUntil: campaign.validUntil ? new Date(campaign.validUntil).toISOString().split('T')[0] : '',
    });
    setIsCampaignFormOpen(true);
  };

  const handleCampaignDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      await deleteCampaign(id);
      fetchCampaigns();
    }
  };

  const handleCampaignToggle = async (id: string, currentStatus: boolean) => {
    await toggleCampaignStatus(id, !currentStatus);
    fetchCampaigns();
  };

  return (
    <div className="space-y-12 pb-20 p-10 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-12">
        <div>
          <span className="text-[#6b7b65] font-bold tracking-[0.4em] text-[8px] uppercase mb-6 block">04 / GROWTH & CRM</span>
          <h1 className="text-6xl md:text-7xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
            Content & Campaigns
          </h1>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-neutral-100 p-1">
          <button 
            onClick={() => { setActiveTab('blog'); setIsFormOpen(false); }}
            className={`px-8 py-3 text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${
              activeTab === 'blog' ? 'bg-white text-[#111111] shadow-sm' : 'text-neutral-500 hover:text-[#111111]'
            }`}
          >
            <MessageCircle size={14} /> Blog Editor
          </button>
          <button 
            onClick={() => { setActiveTab('campaigns'); setIsFormOpen(false); }}
            className={`px-8 py-3 text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${
              activeTab === 'campaigns' ? 'bg-white text-[#111111] shadow-sm' : 'text-neutral-500 hover:text-[#111111]'
            }`}
          >
            <Globe size={14} /> Campaigns
          </button>
        </div>
      </div>

      {activeTab === 'campaigns' ? (
        <>
          <div className="flex justify-end gap-4 mb-8">
            <button onClick={() => fetchCampaigns()} className="p-3 border border-neutral-200 bg-white text-[#111111] hover:bg-neutral-50 transition-colors shadow-sm">
              <RefreshCw size={14} />
            </button>
            <button 
              onClick={() => {
                setIsCampaignFormOpen(true);
                setIsCampaignEditing(null);
                setCampaignFormData({ name: '', description: '', image: '', discountCode: '', validUntil: '' });
              }}
              className="bg-[#111111] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#6b7b65] transition-colors flex items-center gap-2 border border-[#111111] shadow-sm"
            >
              <Plus size={14} /> New Campaign
            </button>
          </div>

          {isCampaignFormOpen && (
            <div className="bg-white border border-neutral-200 shadow-2xl p-10 mb-12 relative">
              <button onClick={() => setIsCampaignFormOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-black">
                <Archive size={20} />
              </button>
              <div className="mb-8 border-b border-neutral-100 pb-6">
                 <h3 className="text-3xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
                   {isCampaignEditing ? 'Edit Campaign' : 'Create Campaign'}
                 </h3>
                 <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-2">Publish a marketing campaign banner.</p>
              </div>
              
              <form onSubmit={handleCampaignSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Campaign Name</label>
                    <input required type="text" value={campaignFormData.name} onChange={e => setCampaignFormData({...campaignFormData, name: e.target.value})} className="w-full bg-transparent border-none text-2xl text-[#111111] font-medium outline-none placeholder:text-neutral-300" placeholder="e.g. Summer Safari Special" />
                  </div>
                  
                  <div className="border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Discount Code</label>
                    <input required type="text" value={campaignFormData.discountCode} onChange={e => setCampaignFormData({...campaignFormData, discountCode: e.target.value})} className="w-full bg-transparent border-none text-lg text-[#111111] font-mono outline-none placeholder:text-neutral-300 uppercase" placeholder="e.g. SUMMER24" />
                  </div>

                  <div className="border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Valid Until (Optional)</label>
                    <input type="date" value={campaignFormData.validUntil} onChange={e => setCampaignFormData({...campaignFormData, validUntil: e.target.value})} className="w-full bg-transparent border-none text-sm text-[#111111] outline-none placeholder:text-neutral-300" />
                  </div>

                  <div className="col-span-1 md:col-span-2 border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Banner Image</label>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <input type="text" value={campaignFormData.image} onChange={e => setCampaignFormData({...campaignFormData, image: e.target.value})} className="flex-1 bg-transparent border border-neutral-200 px-4 py-2 text-xs text-[#111111] font-mono outline-none placeholder:text-neutral-300" placeholder="Paste URL or upload local file..." />
                        <button type="button" disabled={isUploading} onClick={() => campaignFileInputRef.current?.click()} className="bg-neutral-100 px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors border border-neutral-200 disabled:opacity-50">
                          {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                        <input type="file" ref={campaignFileInputRef} className="hidden" accept="image/*" onChange={handleCampaignImageUpload} />
                      </div>
                      {campaignFormData.image && (
                        <div className="relative h-40 w-full md:w-1/2 border border-neutral-200 bg-neutral-50 overflow-hidden">
                          <Image src={campaignFormData.image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Marketing Copy / Description</label>
                    <textarea rows={3} value={campaignFormData.description} onChange={e => setCampaignFormData({...campaignFormData, description: e.target.value})} className="w-full bg-transparent border-none text-sm text-[#111111] leading-relaxed outline-none resize-y placeholder:text-neutral-300" placeholder="Book now and get 15% off your next adventure..." />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button type="submit" disabled={isCampaignSubmitting} className="bg-[#111111] hover:bg-[#6b7b65] text-white px-10 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-3 disabled:opacity-50">
                    {isCampaignSubmitting ? 'Saving...' : (isCampaignEditing ? 'Save Changes' : 'Create Campaign')} <CheckCircle2 size={14} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List */}
          <div className="bg-white border border-neutral-200 shadow-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Campaign</th>
                  <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Code / Expiry</th>
                  <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Status</th>
                  <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {isCampaignsLoading ? (
                  <tr><td colSpan={4} className="text-center py-12 text-[10px] font-bold tracking-widest uppercase text-neutral-400">Loading campaigns...</td></tr>
                ) : campaigns.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-12 text-[10px] font-bold tracking-widest uppercase text-neutral-400">No campaigns found.</td></tr>
                ) : (
                  campaigns.map((campaign) => (
                    <tr key={campaign.id} className="group hover:bg-[#fafafa] transition-colors">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-24 h-12 bg-neutral-100 flex items-center justify-center text-[#111111] relative overflow-hidden border border-neutral-200">
                            {campaign.image ? (
                              <Image src={campaign.image} alt={campaign.name} fill className="object-cover" />
                            ) : (
                              <Percent size={16} className="text-neutral-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#111111]">{campaign.name}</h4>
                            <p className="text-[10px] text-neutral-400 mt-1 truncate max-w-xs">{campaign.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-sm font-bold font-mono text-[#111111] block mb-1">{campaign.discountCode}</span>
                        {campaign.validUntil ? (
                          <span className="text-[9px] text-neutral-500 uppercase tracking-widest">Ends: {new Date(campaign.validUntil).toLocaleDateString()}</span>
                        ) : (
                          <span className="text-[9px] text-neutral-500 uppercase tracking-widest">No Expiry</span>
                        )}
                      </td>
                      <td className="px-10 py-6">
                        <button 
                          onClick={() => handleCampaignToggle(campaign.id, campaign.isActive)}
                          className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest px-3 py-1 border transition-colors ${
                            campaign.isActive ? 'text-[#6b7b65] border-[#6b7b65]/20 bg-[#6b7b65]/5 hover:bg-[#6b7b65]/10' : 'text-neutral-400 border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${campaign.isActive ? 'bg-[#6b7b65]' : 'bg-neutral-300'}`}></span>
                          {campaign.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleCampaignEdit(campaign)} className="p-3 hover:bg-neutral-100 text-neutral-400 hover:text-[#111111] transition-colors border border-transparent hover:border-neutral-200">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleCampaignDelete(campaign.id)} className="p-3 hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-100">
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
        </>
      ) : (
        <>
          {/* Blog Editor Actions */}
          <div className="flex justify-end gap-4 mb-8">
            <button onClick={() => fetchPosts()} className="p-3 border border-neutral-200 bg-white text-[#111111] hover:bg-neutral-50 transition-colors shadow-sm">
              <RefreshCw size={14} />
            </button>
            <button 
              onClick={() => {
                setIsFormOpen(true);
                setIsEditing(null);
                setFormData({ title: '', slug: '', content: '', image: '', authorName: 'Tesfa Team' });
              }}
              className="bg-[#111111] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#6b7b65] transition-colors flex items-center gap-2 border border-[#111111] shadow-sm"
            >
              <Plus size={14} /> New Post
            </button>
          </div>

          {isFormOpen && (
            <div className="bg-white border border-neutral-200 shadow-2xl p-10 mb-12 relative">
              <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-black">
                <Archive size={20} />
              </button>
              <div className="mb-8 border-b border-neutral-100 pb-6">
                 <h3 className="text-3xl font-bold text-[#111111] tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>
                   {isEditing ? 'Edit Blog Post' : 'Write New Post'}
                 </h3>
                 <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-2">Publish travel journals to the public site.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="col-span-1 md:col-span-2 border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Post Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-none text-2xl text-[#111111] font-medium outline-none placeholder:text-neutral-300" placeholder="e.g. A Guide to Exploring the Serengeti" />
                  </div>
                  
                  <div className="border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">URL Slug (Auto-generated if empty)</label>
                    <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-transparent border-none text-sm text-[#111111] font-mono outline-none placeholder:text-neutral-300" placeholder="e.g. exploring-the-serengeti" />
                  </div>

                  <div className="border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Author</label>
                    <input required type="text" value={formData.authorName} onChange={e => setFormData({...formData, authorName: e.target.value})} className="w-full bg-transparent border-none text-sm text-[#111111] outline-none placeholder:text-neutral-300" />
                  </div>

                  <div className="col-span-1 md:col-span-2 border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Cover Image</label>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="flex-1 bg-transparent border border-neutral-200 px-4 py-2 text-xs text-[#111111] font-mono outline-none placeholder:text-neutral-300" placeholder="Paste URL or upload local file..." />
                        <button type="button" disabled={isUploading} onClick={() => fileInputRef.current?.click()} className="bg-neutral-100 px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors border border-neutral-200 disabled:opacity-50">
                          {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </div>
                      {formData.image && (
                        <div className="relative h-40 w-64 border border-neutral-200 bg-neutral-50 overflow-hidden">
                          <Image src={formData.image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 border-b border-neutral-200 pb-2">
                    <label className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">Content (Markdown Supported)</label>
                    <textarea required rows={15} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-transparent border-none text-sm text-[#111111] leading-relaxed outline-none resize-y placeholder:text-neutral-300 font-mono" placeholder="Write your blog post here..." />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button type="submit" disabled={isSubmitting} className="bg-[#111111] hover:bg-[#6b7b65] text-white px-10 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-3 disabled:opacity-50">
                    {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Save Post')} <CheckCircle2 size={14} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List */}
          <div className="bg-white border border-neutral-200 shadow-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Post Details</th>
                  <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Author</th>
                  <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">Status</th>
                  <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {isLoading ? (
                  <tr><td colSpan={4} className="text-center py-12 text-[10px] font-bold tracking-widest uppercase text-neutral-400">Loading posts...</td></tr>
                ) : posts.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-12 text-[10px] font-bold tracking-widest uppercase text-neutral-400">No blog posts found.</td></tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="group hover:bg-[#fafafa] transition-colors">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-14 bg-neutral-100 flex items-center justify-center text-[#111111] relative overflow-hidden border border-neutral-200">
                            {post.image ? (
                              <Image src={post.image} alt={post.title} fill className="object-cover" />
                            ) : (
                              <ImageIcon size={16} className="text-neutral-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#111111] truncate max-w-xs">{post.title}</h4>
                            <p className="text-[9px] text-neutral-400 mt-1 font-mono">/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-sm font-light text-neutral-600">{post.authorName}</span>
                      </td>
                      <td className="px-10 py-6">
                        <button 
                          onClick={() => handleToggle(post.id, post.published)}
                          className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest px-3 py-1 border transition-colors ${
                            post.published ? 'text-[#6b7b65] border-[#6b7b65]/20 bg-[#6b7b65]/5 hover:bg-[#6b7b65]/10' : 'text-neutral-400 border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-[#6b7b65]' : 'bg-neutral-300'}`}></span>
                          {post.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(post)} className="p-3 hover:bg-neutral-100 text-neutral-400 hover:text-[#111111] transition-colors border border-transparent hover:border-neutral-200">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="p-3 hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-100">
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
        </>
      )}
    </div>
  );
}
