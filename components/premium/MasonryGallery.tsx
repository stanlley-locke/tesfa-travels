'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, ReactNode } from 'react';
import Image from 'next/image';

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  tags?: string[];
}

interface MasonryGalleryProps {
  items: GalleryItem[];
  columns?: number;
  showOverlay?: boolean;
}

export function MasonryGallery({
  items,
  columns = 3,
  showOverlay = true,
}: MasonryGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2 grid-cols-1',
    3: 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
    4: 'lg:grid-cols-4 md:grid-cols-2 grid-cols-1',
  };

  return (
    <div className={`grid ${gridColsClass[columns as keyof typeof gridColsClass]} gap-4`}>
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedId(item.id)}
            onMouseEnter={() => setSelectedId(item.id)}
            onMouseLeave={() => setSelectedId(null)}
          >
            <div className="relative h-64 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {showOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-200 text-sm mt-1">{item.description}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent/30 text-accent text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
