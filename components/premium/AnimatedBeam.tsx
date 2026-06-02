'use client';

import { motion } from 'motion/react';
import React, { RefObject, useEffect, useRef } from 'react';

export interface AnimatedBeamProps {
  containerRef: RefObject<HTMLDivElement>;
  fromRef: RefObject<HTMLDivElement>;
  toRef: RefObject<HTMLDivElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  dotted?: boolean;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startYOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 20,
  delay = 0,
  pathColor = 'rgb(148 163 184)',
  dotted = false,
  gradientStartColor,
  gradientStopColor,
  startYOffset = 0,
  endYOffset = 0,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pathD, setPathD] = React.useState('');
  const [svgDimensions, setSvgDimensions] = React.useState({ width: 0, height: 0 });

  const updatePath = () => {
    if (fromRef.current && toRef.current && containerRef.current && svgRef.current) {
      const container = containerRef.current;
      const fromElement = fromRef.current;
      const toElement = toRef.current;

      const containerRect = container.getBoundingClientRect();
      const fromRect = fromElement.getBoundingClientRect();
      const toRect = toElement.getBoundingClientRect();

      const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
      const fromY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;

      const toX = toRect.left - containerRect.left + toRect.width / 2;
      const toY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

      const mid = (fromY + toY) / 2;

      const pathData = `
        M ${fromX},${fromY}
        C ${fromX},${mid - curvature},
          ${toX},${mid + curvature},
          ${toX},${toY}
      `;

      setPathD(pathData);
      setSvgDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    }
  };

  useEffect(() => {
    updatePath();
    window.addEventListener('resize', updatePath);
    const timer = setInterval(updatePath, 100);

    return () => {
      window.removeEventListener('resize', updatePath);
      clearInterval(timer);
    };
  }, [fromRef, toRef, containerRef, curvature, startYOffset, endYOffset]);

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const hasGradient = gradientStartColor && gradientStopColor;

  return (
    <svg
      ref={svgRef}
      width={svgDimensions.width}
      height={svgDimensions.height}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>
        {hasGradient && (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStartColor} />
            <stop offset="100%" stopColor={gradientStopColor} />
          </linearGradient>
        )}
      </defs>
      {pathD && (
        <>
          <motion.path
            d={pathD}
            fill="none"
            stroke={hasGradient ? `url(#${gradientId})` : pathColor}
            strokeWidth="2"
            strokeDasharray={dotted ? '5,5' : 'none'}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
          <motion.circle
            r="3"
            fill={hasGradient ? gradientStopColor : pathColor}
            animate={
              reverse
                ? {
                    offsetDistance: ['0%', '-100%'],
                  }
                : {
                    offsetDistance: ['0%', '100%'],
                  }
            }
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{
              offsetPath: `path('${pathD}')`,
            } as any}
          />
        </>
      )}
    </svg>
  );
};
