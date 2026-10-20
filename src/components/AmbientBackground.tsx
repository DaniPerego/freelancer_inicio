"use client";

import { useEffect, useRef, useState } from "react";

// Grid tile geometry — must match the background pattern SVG exactly
const GRID = 24;
const CUBE_PAD = 3;
const CUBE_SIZE = 18;
const BLINK_COUNT = 12;
const SHUFFLE_MS = 8000;

interface LiveCube {
  left: number;
  top: number;
  delay: string;
  duration: string;
}

// Deterministic PRNG (mulberry32) — seeded per shuffle cycle so cell picks
// are random-looking but SSR-safe and stable within a cycle.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makePatternDataUri(fill: string, opacity: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="4" fill="${fill}" opacity="${opacity}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Light-theme tile: embossed ivory cubes — offset drop shadow + marfil face
// + top-left highlight arc and bottom-right shade arc for a relief feel.
const EMBOSSED_TILE =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">' +
  '<rect x="4" y="4" width="18" height="18" rx="4" fill="#c9bda0"/>' +
  '<rect x="3" y="3" width="18" height="18" rx="4" fill="#f1e9d6"/>' +
  '<path d="M3 7a4 4 0 0 1 4-4h10" fill="none" stroke="#fffdf5" stroke-width="1.2"/>' +
  '<path d="M21 17a4 4 0 0 1-4 4H7" fill="none" stroke="#b5a685" stroke-width="1.2"/>' +
  "</svg>";
const lightPattern = `url("data:image/svg+xml,${encodeURIComponent(EMBOSSED_TILE)}")`;
const darkPattern = makePatternDataUri("#ededed", 1);

// Pick BLINK_COUNT unique grid cells for a given shuffle seed.
function gridCubes(seed: number): LiveCube[] {
  const cols = Math.max(1, Math.ceil(window.innerWidth / GRID));
  const rows = Math.max(1, Math.ceil(window.innerHeight / GRID));
  const rand = mulberry32(seed * 7919 + 17);
  const used = new Set<number>();
  const cubes: LiveCube[] = [];
  let guard = 0;
  while (cubes.length < BLINK_COUNT && guard++ < 400) {
    const col = Math.floor(rand() * cols);
    const row = Math.floor(rand() * rows);
    const key = row * cols + col;
    if (used.has(key)) continue;
    used.add(key);
    cubes.push({
      left: col * GRID + CUBE_PAD,
      top: row * GRID + CUBE_PAD,
      delay: `${(rand() * 8).toFixed(1)}s`,
      duration: `${(5 + rand() * 4).toFixed(1)}s`,
    });
  }
  return cubes;
}

export function AmbientBackground() {
  // Empty on SSR + first client render — populated in useEffect to keep
  // grid math client-only and avoid hydration mismatch.
  const [cubes, setCubes] = useState<LiveCube[]>([]);
  const seedRef = useRef(1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => setCubes(gridCubes(seedRef.current));
    update();

    // Rotate the blinking cells to fresh grid positions periodically —
    // they snap instantly (no glide), like random lights turning on elsewhere.
    let shuffle: number | undefined;
    if (!reduced) {
      shuffle = window.setInterval(() => {
        seedRef.current += 1;
        setCubes(gridCubes(seedRef.current));
      }, SHUFFLE_MS);
    }

    window.addEventListener("resize", update);
    return () => {
      if (shuffle !== undefined) window.clearInterval(shuffle);
      window.removeEventListener("resize", update);
    };
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
      {/* Blinking cubes — two nested mask layers, written directly by
          LogoScroll per frame:
          #blink-column-mask dims blinks across the central text band so
          titles/copy stay readable; #blink-hole-mask cuts a soft hole under
          the traveling logo. Cells reshuffle to random positions every 8s. */}
      <div id="blink-column-mask" className="absolute inset-0">
        <div id="blink-hole-mask" className="absolute inset-0">
          {cubes.map((cube, i) => (
            <div
              key={i}
              className="ambient-cube absolute rounded"
              style={{
                left: cube.left,
                top: cube.top,
                width: CUBE_SIZE,
                height: CUBE_SIZE,
                background: "var(--ambient-blink-color)",
                animationDelay: cube.delay,
                animationDuration: cube.duration,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
