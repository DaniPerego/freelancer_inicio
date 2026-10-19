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

    const heroHeight = hero.offsetHeight;
    // Journey starts at the VERY first pixel of scroll (no dead zone) and
    // lasts at least 60% of the viewport so one wheel notch can't skip it.
    const journeyPx = Math.max(heroHeight * 1.2, window.innerHeight * 0.6);
    const progress = clamp(window.scrollY / journeyPx, 0, 1);

    // Phase 1 — hero logo -> watermark: instant seamless handoff, NO crossfade.
    // Start point FROZEN at the logo's scroll-zero position (document coords):
    // a clean monotonic glide start -> viewport center. Using the live logo
    // position instead creates a moving-target lerp that stalls mid-way
    // (up with the page, stop, then down to center) — the janky movement.
    const logoRect = logo.getBoundingClientRect();
    const startVx = logoRect.left + logoRect.width / 2 + window.scrollX;
    const startVy = logoRect.top + logoRect.height / 2 + window.scrollY;
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
      // Smoothstep easing over the FROZEN start -> center path.
      logo.style.opacity = "0";
      const eased = progress * progress * (3 - 2 * progress);
      wmVx = startVx + (vpCx - startVx) * eased;
      wmVy = startVy + (vpCy - startVy) * eased;
      watermarkOpacity = 1 - eased * 0.85; // settles at 0.15 — subtler
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

        // Footer icon "receive": armed only when the scroll hits the ABSOLUTE
        // document end. CSS transition (always on) animates BOTH directions —
        // grow + color on arrival, smooth return when scrolling back up.
        if (!reducedMotion) {
          const atEnd = maxScroll > 0 && window.scrollY >= maxScroll - 1;
          footerIcon.style.setProperty("--cube-pop", atEnd ? "1.45" : "1");
          footerIcon.style.color = atEnd ? "var(--accent)" : "";
        }
      } else {
        footerIcon.style.setProperty("--cube-pop", "1");
        footerIcon.style.color = "";
      }
    }

    watermarkSvg.style.transform = watermarkTransform;
    watermarkSvg.style.opacity = String(watermarkOpacity);

    // Publish the visible cubes' viewport position + size so AmbientBackground
    // can cut a soft hole in the blink layer exactly under them — blinks stay
    // alive everywhere else. Hole follows the real logo at rest, the watermark
    // during the journey. Negative hole = no hole.
    const logoAtRest = reducedMotion || progress <= 0;
    const holeR = logoAtRest
      ? WATERMARK_SIZE / 2 + 12
      : watermarkOpacity > 0.01
        ? (WATERMARK_SIZE * wmScale) / 2 + 12
        : -32;
    document.documentElement.style.setProperty("--wm-vx", `${logoAtRest ? heroCx : wmVx}px`);
    document.documentElement.style.setProperty("--wm-vy", `${logoAtRest ? heroCy : wmVy}px`);
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
