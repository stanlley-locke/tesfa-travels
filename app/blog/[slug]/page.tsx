import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111111] flex flex-col selection:bg-[#6b7b65] selection:text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full bg-black flex items-end pb-24 pt-32">
        {post.image && (
          <div className="absolute inset-0 z-0 opacity-50">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#fafafa] via-black/60 to-black/20" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors mb-12 border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 backdrop-blur">
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          <div className="flex items-center justify-center gap-6 mb-8">
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-[#6b7b65] text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <User size={12} /> {post.authorName}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            {post.title}
          </h1>
        </div>
      </section>

      <main className="flex-1 pb-32 -mt-10 relative z-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <article className="prose prose-lg md:prose-xl prose-neutral max-w-none bg-white p-8 md:p-20 border border-neutral-200 shadow-2xl font-serif">
            {/* Very basic markdown rendering for the moment. Real markdown parsing can be added later. */}
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-3xl font-bold mt-12 mb-6 tracking-tight text-[#111111]">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-2xl font-bold mt-10 mb-4 tracking-tight text-[#111111]">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc pl-6 mb-6 space-y-2">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="text-neutral-600 leading-relaxed font-light">{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-neutral-600 leading-relaxed font-light mb-6 whitespace-pre-wrap">
                  {paragraph}
                </p>
              );
            })}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
