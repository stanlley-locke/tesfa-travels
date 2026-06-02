'use client';

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function Earth({
  className,
  mapBrightness = 6,
  dark = 1,
  baseColor = [1, 1, 1],
  glowColor = [1, 1, 1],
}: {
  className?: string;
  mapBrightness?: number;
  dark?: number;
  baseColor?: [number, number, number];
  glowColor?: [number, number, number];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  useEffect(() => {
    let phi = 0;
    let req: number;
    let isVisible = false;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cities (Lat, Lon)
    const nairobi: [number, number] = [-1.2921, 36.8219];
    const addis: [number, number] = [8.9806, 38.7578];
    const dubai: [number, number] = [25.2048, 55.2708];
    const paris: [number, number] = [48.8566, 2.3522];
    const london: [number, number] = [51.5074, -0.1278];
    const capeTown: [number, number] = [-33.9249, 18.4241];
    const newYork: [number, number] = [40.7128, -74.0060];
    const zanzibar: [number, number] = [-6.1659, 39.2026];

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: 1000,
      height: 1000,
      scale: 0.85,
      phi: 0,
      theta: 0.2,
      dark: dark,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: mapBrightness,
      baseColor: baseColor,
      markerColor: [0.1, 0.8, 1],
      glowColor: glowColor,
      markers: [
        { location: nairobi, size: 0.05 },
        { location: addis, size: 0.03 },
        { location: dubai, size: 0.04 },
        { location: paris, size: 0.04 },
        { location: london, size: 0.04 },
        { location: capeTown, size: 0.03 },
        { location: newYork, size: 0.03 },
        { location: zanzibar, size: 0.03 },
      ],
      arcs: [
        { from: nairobi, to: addis },
        { from: nairobi, to: dubai },
        { from: nairobi, to: paris },
        { from: nairobi, to: london },
        { from: nairobi, to: capeTown },
        { from: nairobi, to: zanzibar },
        { from: dubai, to: newYork },
        { from: paris, to: newYork },
      ],
      arcColor: [0.4, 0.47, 0.39], // matches #6b7b65 roughly
      arcWidth: 1.5,
      arcHeight: 0.4,
    });

    function animate() {
      if (!isVisible) return;
      if (pointerInteracting.current === null) {
        phi += 0.003;
      }
      globe.update({ phi });
      req = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(([e]) => {
      isVisible = e.isIntersecting;
      if (isVisible) {
        animate();
      } else {
        cancelAnimationFrame(req);
      }
    });

    observer.observe(canvas);

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX;
      canvas.style.cursor = 'grabbing';
    };
    const onPointerUp = () => {
      pointerInteracting.current = null;
      canvas.style.cursor = 'grab';
    };
    const onPointerOut = () => {
      pointerInteracting.current = null;
      canvas.style.cursor = 'grab';
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteracting.current = e.clientX;
        phi += delta * 0.005;
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerout', onPointerOut);
    canvas.addEventListener('pointermove', onPointerMove);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerout', onPointerOut);
      canvas.removeEventListener('pointermove', onPointerMove);
      observer.disconnect();
      cancelAnimationFrame(req);
      globe.destroy();
    };
  }, [mapBrightness, dark, baseColor, glowColor]);

  return (
    <div className={className} style={{ width: '100%', aspectRatio: 1 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: 1,
          transition: 'opacity 1s ease',
          cursor: 'grab',
        }}
      />
    </div>
  );
}
