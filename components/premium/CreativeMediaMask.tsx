'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ReactNode } from 'react';

interface CreativeMediaMaskProps {
  src: string;
  alt: string;
  type?: 'image' | 'video';
  className?: string;
  maskSvg?: string;
  hoverable?: boolean;
}

export function CreativeMediaMask({
  src,
  alt,
  type = 'image',
  className = '',
  maskSvg,
  hoverable = true,
}: CreativeMediaMaskProps) {
  // Default SVG mask - modern asymmetric shape
  const defaultMask = `url("data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A")`;

  const maskStyle = {
    maskImage: maskSvg || defaultMask,
    WebkitMaskImage: maskSvg || defaultMask,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        style={maskStyle as any}
        className="relative overflow-hidden"
        whileHover={hoverable ? { scale: 1.05 } : {}}
        transition={{ duration: 0.4 }}
      >
        {type === 'image' ? (
          <Image
            src={src}
            alt={alt}
            width={500}
            height={400}
            className="w-full h-auto object-cover"
            quality={90}
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            className="w-full h-auto object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </motion.div>
    </motion.div>
  );
}
