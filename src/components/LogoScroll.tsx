"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Posiciones centrales de cada cubo (en coord del viewBox 32x32)
const CUBES = [
  { cx: 9.5, cy: 9.5 },   // arriba izq
  { cx: 22.5, cy: 9.5 },  // arriba der
  { cx: 9.5, cy: 22.5 },  // abajo izq
  { cx: 22.5, cy: 22.5 }, // abajo der
];

const MAX_DIST = 22; // distancia máx para atenuar

function getOpacities(mx: number | null, my: number | null) {
  if (mx === null || my === null) return [1, 0.7, 0.5, 0.3];

  return CUBES.map(({ cx, cy }) => {
    const d = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
    const factor = Math.max(0, 1 - d / MAX_DIST);
    return 0.15 + factor * 0.85; // mínimo 0.15, máximo 1
  });
}

export function LogoScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / (heroHeight * 1.2)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = logoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalizar a coordenadas del viewBox (32x32)
    const x = ((e.clientX - rect.left) / rect.width) * 32;
    const y = ((e.clientY - rect.top) / rect.height) * 32;
    setMouse({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: null, y: null });
  }, []);

  const scale = 1 - scrollProgress * 0.6;
  const opacity = 1 - scrollProgress * 0.85;
  const blur = scrollProgress * 12;
  const fixedOpacity = scrollProgress > 0.2 ? Math.min(0.2, (scrollProgress - 0.2) * 0.3) : 0;
  const opacities = getOpacities(mouse.x, mouse.y);

  return (
    <>
      {/* Hero logo */}
      <div ref={heroRef} className="flex justify-center py-5">
        <div
          ref={logoRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ width: 180, opacity, filter: `blur(${blur}px)`, transform: `scale(${scale})` }}
          className="cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="180" height="180">
            <rect width="32" height="32" rx="4" fill="#0a0a0a" />
            <rect x="4" y="4" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[0]} style={{ transition: "opacity 0.25s ease-out" }} />
            <rect x="17" y="4" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[1]} style={{ transition: "opacity 0.25s ease-out" }} />
            <rect x="4" y="17" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[2]} style={{ transition: "opacity 0.25s ease-out" }} />
            <rect x="17" y="17" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[3]} style={{ transition: "opacity 0.25s ease-out" }} />
          </svg>
        </div>
      </div>

      {/* Fixed watermark */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: fixedOpacity,
          backgroundImage: "url(/favicon.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "min(50vw, 500px)",
        }}
      />
    </>
  );
}
