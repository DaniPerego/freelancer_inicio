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

    // Phase 1 — hero logo -> watermark: instant seamless handoff, NO crossfade.
    // Only ONE of the two is visible at any moment (same position, size and
    // cube opacities on the swap frame), so there's no double-render shimmer.
    // The watermark then glides from the logo's live position to viewport
    // center while fading 1 -> 0.2. Scroll up plays it in reverse.
    const logoRect = logo.getBoundingClientRect();
    const heroCx = logoRect.left + logoRect.width / 2;
    const heroCy = logoRect.top + logoRect.height / 2;
    const vpCx = window.innerWidth / 2;
    const vpCy = window.innerHeight / 2;

    const reducedMotion = reducedMotionRef.current;

    let wmVx = vpCx;
    let wmVy = vpCy;
    let wmScale = 1;
    let watermarkOpacity = 0;
    let watermarkTransform = "translate(-50%, -50%)";

    if (reducedMotion) {
      // No travel: real logo stays put; watermark just fades in at center.
      logo.style.opacity = "1";
      logo.style.filter = "none";
      logo.style.transform = "none";
      watermarkOpacity = progress > 0.3 ? 0.2 : 0;
    } else if (progress <= 0) {
      // At rest: real logo only.
      logo.style.opacity = "1";
      logo.style.filter = "none";
      logo.style.transform = "none";
    } else {
      // Scrolling: the watermark IS the logo now — instant takeover on the
      // first frame (it spawns exactly over the real logo's position).
      logo.style.opacity = "0";
      wmVx = heroCx + (vpCx - heroCx) * progress;
      wmVy = heroCy + (vpCy - heroCy) * progress;
      watermarkOpacity = 1 - progress * 0.8;
      watermarkTransform = `translate(-50%, -50%) translate(${wmVx - vpCx}px, ${wmVy - vpCy}px)`;
    }

    let footerProgress = 0;
    const footerIcon = document.getElementById("footer-cube-icon");
    if (footerIcon) {
      const contact = document.getElementById("contacto");
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (contact && maxScroll > 0) {
        const vh = window.innerHeight;
        const contactRect = contact.getBoundingClientRect();
        // Journey starts when #contacto's top enters the viewport and
        // completes EXACTLY at the document end (bottom of the footer).
        if (contactRect.top < vh) {
          const scrollY = window.scrollY;
          const scrollAtEnter = Math.max(0, scrollY + contactRect.top - vh);
          const range = maxScroll - scrollAtEnter;
          footerProgress = range > 0
            ? clamp((scrollY - scrollAtEnter) / range, 0, 1)
            : 1;
        }
      }

      if (footerProgress > 0) {
        const footerRect = footerIcon.getBoundingClientRect();
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
          wmVx = centerX + deltaX;
          wmVy = centerY + deltaY;
          wmScale = scale;
        }

        watermarkOpacity = 0.2 * (1 - footerProgress);

        // Footer icon "receive": anchored to the ABSOLUTE document end —
        // starts within the last quarter-viewport of scroll and completes
        // exactly at maxScroll. You watch it transform as you hit the bottom.
        if (!reducedMotion) {
          const endReceive = maxScroll > 0
            ? clamp(1 - (maxScroll - window.scrollY) / (window.innerHeight * 0.25), 0, 1)
            : 0;
          footerIcon.style.setProperty("--cube-pop", String(1 + endReceive * 0.45));
          footerIcon.style.color = endReceive > 0 ? "var(--accent)" : "";
        }
      } else {
        footerIcon.style.setProperty("--cube-pop", "1");
        footerIcon.style.color = "";
      }
    }

    watermarkSvg.style.transform = watermarkTransform;
    watermarkSvg.style.opacity = String(watermarkOpacity);

    // Publish watermark viewport position + size so AmbientBackground can cut
    // a soft hole in the blink layer exactly under it — blinks stay alive
    // everywhere else instead of fading out globally. Negative hole = no hole.
    const wmVisible = watermarkOpacity > 0.01;
    const holeR = wmVisible ? (WATERMARK_SIZE * wmScale) / 2 + 12 : -32;
    document.documentElement.style.setProperty("--wm-vx", `${wmVx}px`);
    document.documentElement.style.setProperty("--wm-vy", `${wmVy}px`);
    document.documentElement.style.setProperty("--wm-hole", `${holeR}px`);
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
      document.documentElement.style.removeProperty("--wm-vx");
      document.documentElement.style.removeProperty("--wm-vy");
      document.documentElement.style.removeProperty("--wm-hole");
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
