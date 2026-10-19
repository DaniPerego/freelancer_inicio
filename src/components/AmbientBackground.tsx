"use client";

import { useEffect, useState } from "react";

// Grid tile geometry — must match the background pattern SVG exactly
const GRID = 24;
const CUBE_PAD = 3;
const CUBE_SIZE = 18;

interface BlinkSeed {
  fx: number;
  fy: number;
  delay: string;
  duration: string;
}

// Viewport fractions — snapped to exact grid cells after mount so the
// blinking cubes ARE grid cells of the background pattern, not floating dots.
const blinkSeeds: BlinkSeed[] = [
  { fx: 0.06, fy: 0.1, delay: "0s", duration: "6.2s" },
  { fx: 0.18, fy: 0.32, delay: "1.4s", duration: "7.5s" },
  { fx: 0.31, fy: 0.08, delay: "2.8s", duration: "5.3s" },
  { fx: 0.44, fy: 0.48, delay: "0.7s", duration: "8.1s" },
  { fx: 0.58, fy: 0.22, delay: "3.5s", duration: "6.7s" },
  { fx: 0.7, fy: 0.38, delay: "1.1s", duration: "4.9s" },
  { fx: 0.85, fy: 0.12, delay: "4.2s", duration: "7.8s" },
  { fx: 0.12, fy: 0.62, delay: "2.2s", duration: "5.6s" },
  { fx: 0.26, fy: 0.78, delay: "5s", duration: "8.4s" },
  { fx: 0.5, fy: 0.7, delay: "0.3s", duration: "6s" },
  { fx: 0.66, fy: 0.85, delay: "3.8s", duration: "7.2s" },
  { fx: 0.9, fy: 0.55, delay: "1.9s", duration: "5.9s" },
];

function makePatternDataUri(fill: string, opacity: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="4" fill="${fill}" opacity="${opacity}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const lightPattern = makePatternDataUri("#171717", 1);
const darkPattern = makePatternDataUri("#ededed", 1);

interface LiveCube {
  left: number;
  top: number;
  delay: string;
  duration: string;
}

function gridCubes(): LiveCube[] {
  const cols = Math.max(1, Math.ceil(window.innerWidth / GRID));
  const rows = Math.max(1, Math.ceil(window.innerHeight / GRID));
  return blinkSeeds.map((s) => {
    const col = Math.min(cols - 1, Math.round(s.fx * (cols - 1)));
    const row = Math.min(rows - 1, Math.round(s.fy * (rows - 1)));
    return {
      left: col * GRID + CUBE_PAD,
      top: row * GRID + CUBE_PAD,
      delay: s.delay,
      duration: s.duration,
    };
  });
}

export function AmbientBackground() {
  // Empty on SSR + first client render — populated in useEffect to keep
  // grid math client-only and avoid hydration mismatch.
  const [cubes, setCubes] = useState<LiveCube[]>([]);

  useEffect(() => {
    const update = () => setCubes(gridCubes());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* Light-theme subtle cube grid */}
      <div
        className="absolute inset-0 block dark:hidden"
        style={{
          backgroundImage: lightPattern,
          backgroundSize: `${GRID}px ${GRID}px`,
          opacity: "var(--ambient-pattern-opacity)",
        }}
      />
      {/* Dark-theme subtle cube grid */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: darkPattern,
          backgroundSize: `${GRID}px ${GRID}px`,
          opacity: "var(--ambient-pattern-opacity)",
        }}
      />
      {/* Soft accent glow for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 75% 15%, var(--accent) 0%, transparent 45%)",
          opacity: "var(--ambient-glow-opacity)",
        }}
      />
      {/* Blinking cubes — snapped to the exact cells of the pattern above.
          A radial mask follows the watermark (driven by LogoScroll via --wm-*
          vars) and cuts a soft hole under it, so blinks never shine through
          the translucent cubes — while staying alive everywhere else. */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(circle at var(--wm-vx, 50%) var(--wm-vy, 50%), transparent var(--wm-hole, 0px), black calc(var(--wm-hole, 0px) + 24px))",
          WebkitMaskImage:
            "radial-gradient(circle at var(--wm-vx, 50%) var(--wm-vy, 50%), transparent var(--wm-hole, 0px), black calc(var(--wm-hole, 0px) + 24px))",
        }}
      >
        {cubes.map((cube, i) => (
          <div
            key={i}
            className="ambient-cube absolute rounded"
            style={{
              left: cube.left,
              top: cube.top,
              width: CUBE_SIZE,
              height: CUBE_SIZE,
              background: "var(--accent)",
              animationDelay: cube.delay,
              animationDuration: cube.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
