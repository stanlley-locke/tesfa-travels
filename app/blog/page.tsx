import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function BlogPage() {
  // Fetch published blog posts from Prisma, ordered by newest first
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111111]">
      <Header />
      
      {/* Hero Header */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20 overflow-hidden bg-black">
        <Image
          src="/assets/pexels-planespotter-geneva-1877406873-36897685.jpg"
          alt="Travel Journal"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-black/50" />
        <div className="relative z-10 text-center px-6">
          <span className="text-xs font-bold tracking-[0.3em] text-[#6b7b65] uppercase mb-4 block">Travel Journal</span>
          <h1 className="text-5xl md:text-7xl font-medium text-white mb-6 tracking-tight">
            Stories & Insights
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto font-light">
            Curated narratives from our expeditions, expert travel tips, and global industry updates.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 container mx-auto px-6 max-w-7xl min-h-[40vh]">
        {posts.length === 0 ? (
          <div className="text-center text-neutral-500 font-light text-lg">
            New travel journals are being curated. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group block cursor-pointer">
                <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden rounded-none bg-neutral-200">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#111111] flex items-center justify-center text-white/20 uppercase tracking-widest font-bold text-xs">No Image</div>
                  )}
                </div>
                <div className="flex gap-4 items-center text-xs text-neutral-500 font-bold tracking-widest uppercase mb-3">
                  <span className="text-[#6b7b65]">Editorial</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h3 className="text-2xl font-medium mb-3 leading-tight group-hover:text-[#6b7b65] transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutral-500 font-light line-clamp-3">
                  {post.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
