'use client';

import { motion, useInView } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down' | 'none';
  delay?: number;
  className?: string;
  viewport?: {
    amount?: 'some' | 'all' | number;
    margin?: string;
  };
}

export function ScrollAnimation({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  viewport = { amount: 0.3, margin: '0px 0px -100px 0px' },
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);

  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -50, opacity: 0 };
      case 'right':
        return { x: 50, opacity: 0 };
      case 'up':
        return { y: 50, opacity: 0 };
      case 'down':
        return { y: -50, opacity: 0 };
      case 'none':
        return { opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const animate = isInView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition();

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={animate}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay,
        duration: 0.6,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
