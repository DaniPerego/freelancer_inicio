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
const WATERMARK_SIZE = 180; // tamaño base del watermark en px
const FOOTER_ICON_SIZE = 16; // tamaño final del icono del footer en px

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function getOpacities(mx: number | null, my: number | null) {
  if (mx === null || my === null) return [1, 0.7, 0.5, 0.3];

  return CUBES.map(({ cx, cy }) => {
    const d = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
    const factor = Math.max(0, 1 - d / MAX_DIST);
    return 0.15 + factor * 0.85; // mínimo 0.15, máximo 1
  });
}

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LogoScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const watermarkSvgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(getReducedMotion());
  const [mouse, setMouse] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  const tick = useCallback(() => {
    rafRef.current = null;

    const hero = heroRef.current;
    const logo = logoRef.current;
    const watermarkSvg = watermarkSvgRef.current;
    if (!hero || !logo || !watermarkSvg) return;

    const heroRect = hero.getBoundingClientRect();
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(1, Math.max(0, -heroRect.top / (heroHeight * 1.2)));

    // Hero logo: scale / blur / fade driven by scroll
    const heroScale = 1 - progress * 0.6;
    const heroOpacity = 1 - progress * 0.85;
    const heroBlur = progress * 12;

    logo.style.opacity = String(heroOpacity);
    logo.style.filter = `blur(${heroBlur}px)`;
    logo.style.transform = `scale(${heroScale})`;

    // Watermark base state
    let watermarkOpacity = 0;
    let watermarkTransform = "translate(-50%, -50%)";
    const reducedMotion = reducedMotionRef.current;

    if (progress > 0.2) {
      watermarkOpacity = Math.min(0.2, (progress - 0.2) * 0.3);
    }

    // Footer-targeted travel animation: progress driven by scroll-to-end so the
    // journey completes even when the footer icon never reaches mid-viewport.
    // Runs over the last 35% of the page so the landing feels slow and deliberate.
    let footerProgress = 0;
    const footerIcon = document.getElementById("footer-cube-icon");
    if (footerIcon) {
      const footerRect = footerIcon.getBoundingClientRect();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollToEnd = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      footerProgress = clamp((scrollToEnd - 0.65) / 0.35, 0, 1);

      if (footerProgress > 0) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const targetX = footerRect.left + footerRect.width / 2;
        const targetY = footerRect.top + footerRect.height / 2;

        if (!reducedMotion) {
          const deltaX = (targetX - centerX) * footerProgress;
          const deltaY = (targetY - centerY) * footerProgress;
          const endScale = FOOTER_ICON_SIZE / WATERMARK_SIZE;
          const scale = 1 - (1 - endScale) * footerProgress;
          watermarkTransform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
        }

        watermarkOpacity = 0.2 * (1 - footerProgress);

        // Footer icon "receive": grows and turns accent as the watermark lands,
        // and STAYS that way — the cubes arrived home.
        if (!reducedMotion) {
          footerIcon.style.setProperty("--cube-pop", String(1 + footerProgress * 0.4));
          footerIcon.style.color = footerProgress > 0.15 ? "var(--accent)" : "";
        }
      } else {
        footerIcon.style.setProperty("--cube-pop", "1");
        footerIcon.style.color = "";
      }
    }

    watermarkSvg.style.transform = watermarkTransform;
    watermarkSvg.style.opacity = String(watermarkOpacity);

    // Suppress ambient background blinks while the watermark is on screen —
    // a bright blink behind the translucent watermark looks dirty.
    // blinkOpacity: 1 (no watermark) -> 0 (full watermark), back to 1 after landing.
    const blinkOpacity = 1 - Math.min(1, watermarkOpacity / 0.2);
    document.documentElement.style.setProperty("--ambient-blink-opacity", String(blinkOpacity));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleResize = () => {
      // invalidate any cached layout assumptions on resize
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    mediaQuery.addEventListener("change", handleMotionChange);

    // Initial tick
    tick();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      document.documentElement.style.removeProperty("--ambient-blink-opacity");
    };
  }, [tick]);

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

  const opacities = getOpacities(mouse.x, mouse.y);

  return (
    <>
      {/* Hero logo */}
      <div ref={heroRef} className="flex justify-center py-5">
        <div
          ref={logoRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ width: 180 }}
          className="cursor-pointer will-change-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="180" height="180">
            <rect x="4" y="4" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[0]} style={{ transition: "opacity 0.25s ease-out" }} />
            <rect x="17" y="4" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[1]} style={{ transition: "opacity 0.25s ease-out" }} />
            <rect x="4" y="17" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[2]} style={{ transition: "opacity 0.25s ease-out" }} />
            <rect x="17" y="17" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[3]} style={{ transition: "opacity 0.25s ease-out" }} />
          </svg>
        </div>
      </div>

      {/* Fixed watermark - inline SVG so we can transform it precisely */}
      <div ref={watermarkRef} className="fixed inset-0 pointer-events-none -z-10">
        <svg
          ref={watermarkSvgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width={WATERMARK_SIZE}
          height={WATERMARK_SIZE}
          className="absolute left-1/2 top-1/2 text-accent will-change-transform"
          style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
        >
          <rect x="4" y="4" width="11" height="11" rx="2" fill="currentColor" opacity={1} />
          <rect x="17" y="4" width="11" height="11" rx="2" fill="currentColor" opacity={0.7} />
          <rect x="4" y="17" width="11" height="11" rx="2" fill="currentColor" opacity={0.5} />
          <rect x="17" y="17" width="11" height="11" rx="2" fill="currentColor" opacity={0.3} />
        </svg>
      </div>
    </>
  );
}
