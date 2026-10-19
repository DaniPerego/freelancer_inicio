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
const LOGO_SIZE = 180; // tamaño del logo en px
const FOOTER_ICON_SIZE = 16; // tamaño final del icono del footer en px

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

// Document-space position via the offset* chain — immune to CSS transforms.
// getBoundingClientRect would return the ALREADY-transformed box once the
// logo travels, which would corrupt the natural-position math.
function docPos(el: HTMLElement): { x: number; y: number } {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
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
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(getReducedMotion());
  // Layout snapshot (natural logo position, viewport size, hero height,
  // content text band for the blink dim). Refreshed only on mount/resize —
  // measuring every frame forces layout and makes the scroll start rough.
  const layoutRef = useRef<{
    natX: number;
    natY: number;
    vpW: number;
    vpH: number;
    heroH: number;
    bandX0: number;
    bandX1: number;
  } | null>(null);
  // Inertial smoothing: wheel/momentum scroll moves in discrete steps, which
  // makes the logo journey feel chunky at the start. The logo follows an
  // eased copy of scrollY instead — same destination, buttery path.
  const smoothYRef = useRef<number | null>(null);
  // Last written mask strings — skip style writes when unchanged.
  const holeMaskRef = useRef<string | null>(null);
  const columnMaskRef = useRef<string | null>(null);
  const [mouse, setMouse] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  const measure = useCallback(() => {
    const hero = heroRef.current;
    const logo = logoRef.current;
    if (!hero || !logo) return;
    const natural = docPos(logo);
    const vpW = document.documentElement.clientWidth;
    const vpH = document.documentElement.clientHeight;
    // Content text band (max-w-4xl centered + px-6 padding) — blinks dim
    // inside it so titles/copy stay readable, and stay strong in the margins.
    const band = Math.min(896, vpW - 48);
    layoutRef.current = {
      natX: natural.x + logo.offsetWidth / 2,
      natY: natural.y + logo.offsetHeight / 2,
      vpW,
      vpH,
      heroH: hero.offsetHeight,
      bandX0: Math.max(24, (vpW - band) / 2),
      bandX1: Math.min(vpW - 24, (vpW + band) / 2),
    };
    if (smoothYRef.current === null) smoothYRef.current = window.scrollY;
  }, []);

  const tick = useCallback(() => {
    rafRef.current = null;

    const layout = layoutRef.current;
    const logo = logoRef.current;
    if (!layout || !logo) return;

    const { natX: startCx0, natY: startCy0, vpW, vpH, heroH, bandX0, bandX1 } = layout;
    const targetY = window.scrollY;
    const reducedMotion = reducedMotionRef.current;

    // Inertial smoothing of the scroll position for the traveler only.
    let smoothY = smoothYRef.current ?? targetY;
    if (reducedMotion) {
      smoothY = targetY;
    } else {
      smoothY += (targetY - smoothY) * 0.22;
      if (Math.abs(targetY - smoothY) < 0.4) smoothY = targetY;
    }
    smoothYRef.current = smoothY;

    const vpCx = vpW / 2;
    const vpCy = vpH / 2;

    // Phase 1 — logo -> viewport center. Journey starts at the very first
    // pixel of scroll and lasts at least 60% of the viewport.
    const journeyPx = Math.max(heroH * 1.2, vpH * 0.6);
    const progress = clamp(smoothY / journeyPx, 0, 1);
    const eased = smoothstep(progress);

    // Phase 3 — footer travel, keyed to #contacto entering the viewport and
    // completing EXACTLY at the document end. Pure function of position, so
    // scrolling back up plays the exact reverse journey. Contact/footer
    // positions come from the offset chain (document coords, no viewport
    // reads): viewport Y = docY - scrollY.
    let footerProgress = 0;
    let maxScroll = 0;
    const footerIcon = document.getElementById("footer-cube-icon");
    const contact = document.getElementById("contacto");
    if (footerIcon && contact) {
      maxScroll = document.documentElement.scrollHeight - vpH;
      const contactDocTop = docPos(contact).y;
      if (maxScroll > 0 && contactDocTop - smoothY < vpH) {
        const scrollAtEnter = Math.max(0, contactDocTop - vpH);
        const range = maxScroll - scrollAtEnter;
        footerProgress = range > 0
          ? clamp((smoothY - scrollAtEnter) / range, 0, 1)
          : 1;
      }
    }

    // Compose the ONE traveler's transform.
    // Phases 1+2: pinned glide from the frozen start to viewport center.
    // Phase 3: center -> footer icon, shrinking to icon size, fading out.
    let tx = (vpCx - startCx0) * eased;
    let ty = smoothY + (vpCy - startCy0) * eased;
    let scale = 1;
    let opacity = 1 - eased * 0.85; // settles at 0.15

    if (footerProgress > 0 && !reducedMotion && footerIcon) {
      const footerPos = docPos(footerIcon);
      const targetX = footerPos.x + footerIcon.offsetWidth / 2;
      const targetYIcon = footerPos.y + footerIcon.offsetHeight / 2 - targetY;
      tx = (vpCx + (targetX - vpCx) * footerProgress) - startCx0;
      ty = smoothY + (vpCy + (targetYIcon - vpCy) * footerProgress) - startCy0;
      scale = 1 - (1 - FOOTER_ICON_SIZE / LOGO_SIZE) * footerProgress;
      opacity = (1 - eased * 0.85) * (1 - footerProgress);
    }

    if (reducedMotion) {
      logo.style.opacity = "1";
      logo.style.transform = "none";
      logo.style.pointerEvents = "";
    } else if (progress <= 0 && footerProgress <= 0) {
      // At rest: plain in-flow logo, hover works.
      logo.style.opacity = "1";
      logo.style.transform = "none";
      logo.style.pointerEvents = "";
    } else {
      logo.style.opacity = String(opacity);
      logo.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      logo.style.pointerEvents = "none";
    }

    // Footer icon "receive": armed only when the scroll hits the ABSOLUTE
    // document end. CSS transition (always on) animates BOTH directions —
    // grow + color on arrival, smooth return when scrolling back up.
    if (footerIcon && !reducedMotion) {
      const atEnd = maxScroll > 0 && targetY >= maxScroll - 1;
      footerIcon.style.setProperty("--cube-pop", atEnd ? "1.45" : "1");
      footerIcon.style.color = atEnd ? "var(--accent)" : "";
    }

    // Blink masks, written directly (no root CSS vars — cheaper per frame):
    // hole under the traveler + dim across the central text band.
    const viewCx = startCx0 + tx;
    const viewCy = startCy0 - targetY + ty;
    const holeR = opacity > 0.01 ? (LOGO_SIZE * scale) / 2 + 12 : -32;
    const holeMask = `radial-gradient(circle at ${viewCx}px ${viewCy}px, transparent ${holeR}px, black ${holeR + 24}px)`;
    if (holeMask !== holeMaskRef.current) {
      holeMaskRef.current = holeMask;
      const el = document.getElementById("blink-hole-mask");
      if (el) {
        el.style.setProperty("mask-image", holeMask);
        el.style.setProperty("-webkit-mask-image", holeMask);
      }
    }
    const columnKey = `${bandX0}|${bandX1}`;
    if (columnKey !== columnMaskRef.current) {
      columnMaskRef.current = columnKey;
      const feather = 48;
      const a = Math.max(0, bandX0 - feather);
      const b = Math.min(vpW, bandX1 + feather);
      const columnMask =
        `linear-gradient(90deg, #000 0px, #000 ${a}px, rgba(0,0,0,0.22) ${bandX0}px, rgba(0,0,0,0.22) ${bandX1}px, #000 ${b}px, #000 ${vpW}px)`;
      const el = document.getElementById("blink-column-mask");
      if (el) {
        el.style.setProperty("mask-image", columnMask);
        el.style.setProperty("-webkit-mask-image", columnMask);
      }
    }

    // Keep the rAF loop alive while the smoothed value catches up (wheel
    // steps / momentum bursts) so the logo never waits for the next event.
    if (smoothY !== targetY && rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleResize = () => {
      measure();
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

    // Initial layout snapshot + first tick
    measure();
    // Re-measure after fonts load (can shift the hero layout)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measure();
        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(tick);
        }
      });
    }
    tick();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [tick, measure]);

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
    <div ref={heroRef} className="flex justify-center py-5">
      <div
        ref={logoRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: LOGO_SIZE }}
        className="cursor-pointer will-change-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={LOGO_SIZE} height={LOGO_SIZE}>
          <rect x="4" y="4" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[0]} style={{ transition: "opacity 0.25s ease-out" }} />
          <rect x="17" y="4" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[1]} style={{ transition: "opacity 0.25s ease-out" }} />
          <rect x="4" y="17" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[2]} style={{ transition: "opacity 0.25s ease-out" }} />
          <rect x="17" y="17" width="11" height="11" rx="2" fill="#e85d04" opacity={opacities[3]} style={{ transition: "opacity 0.25s ease-out" }} />
        </svg>
      </div>
    </div>
  );
}
