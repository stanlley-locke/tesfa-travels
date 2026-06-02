import React from 'react';
import { cn } from '@/lib/utils';

export interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowIntensity?: 'sm' | 'md' | 'lg' | 'none';
  shadowIntensity?: 'sm' | 'md' | 'lg' | 'none';
  blurIntensity?: 'sm' | 'md' | 'lg' | 'none';
  borderRadius?: string | number;
  draggable?: boolean;
}

export function LiquidGlassCard({
  className,
  children,
  glowIntensity = 'sm',
  shadowIntensity = 'sm',
  blurIntensity = 'sm',
  borderRadius = '16px',
  draggable = false,
  style,
  ...props
}: LiquidGlassCardProps) {
  const blurMap = {
    none: 'backdrop-blur-none bg-transparent',
    sm: 'backdrop-blur-sm bg-white/10',
    md: 'backdrop-blur-md bg-white/20',
    lg: 'backdrop-blur-xl bg-white/30',
  };
  
  const shadowMap = {
    none: 'shadow-none',
    sm: 'shadow-sm shadow-black/5',
    md: 'shadow-lg shadow-black/10',
    lg: 'shadow-2xl shadow-black/20',
  };
  
  const glowMap = {
    none: 'border-transparent',
    sm: 'border-white/20',
    md: 'border-white/40',
    lg: 'border-white/60',
  };

  return (
    <div
      className={cn(
        "relative border",
        blurMap[blurIntensity],
        shadowMap[shadowIntensity],
        glowMap[glowIntensity],
        className
      )}
      style={{
        borderRadius,
        ...style,
      }}
      {...props}
    >
      {/* Liquid inner glow effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" 
        style={{ borderRadius }} 
      />
      {children}
    </div>
  );
}
