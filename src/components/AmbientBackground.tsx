"use client";

interface Cube {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
}

function makePatternDataUri(fill: string, opacity: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="4" fill="${fill}" opacity="${opacity}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const lightPattern = makePatternDataUri("#171717", 1);
const darkPattern = makePatternDataUri("#ededed", 1);

// Hardcoded positions — never Math.random() during render to avoid SSR hydration mismatch.
const liveCubes: Cube[] = [
  { left: "8%", top: "12%", size: 8, delay: "0s", duration: "6.2s" },
  { left: "22%", top: "28%", size: 10, delay: "1.4s", duration: "7.5s" },
  { left: "35%", top: "8%", size: 6, delay: "2.8s", duration: "5.3s" },
  { left: "48%", top: "42%", size: 12, delay: "0.7s", duration: "8.1s" },
  { left: "62%", top: "18%", size: 9, delay: "3.5s", duration: "6.7s" },
  { left: "75%", top: "33%", size: 7, delay: "1.1s", duration: "4.9s" },
  { left: "88%", top: "10%", size: 11, delay: "4.2s", duration: "7.8s" },
  { left: "14%", top: "55%", size: 8, delay: "2.2s", duration: "5.6s" },
  { left: "28%", top: "72%", size: 10, delay: "5.0s", duration: "8.4s" },
  { left: "55%", top: "68%", size: 6, delay: "0.3s", duration: "6.0s" },
  { left: "70%", top: "82%", size: 9, delay: "3.8s", duration: "7.2s" },
  { left: "92%", top: "60%", size: 8, delay: "1.9s", duration: "5.9s" },
];

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      {/* Light-theme subtle cube grid */}
      <div
        className="absolute inset-0 block dark:hidden"
        style={{
          backgroundImage: lightPattern,
          backgroundSize: "24px 24px",
          opacity: "var(--ambient-pattern-opacity)",
        }}
      />
      {/* Dark-theme subtle cube grid */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: darkPattern,
          backgroundSize: "24px 24px",
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
      {/* Live breathing accent cubes */}
      {liveCubes.map((cube, i) => (
        <div
          key={i}
          className="ambient-cube absolute rounded-sm"
          style={{
            left: cube.left,
            top: cube.top,
            width: cube.size,
            height: cube.size,
            background: "var(--accent)",
            animationDelay: cube.delay,
            animationDuration: cube.duration,
          }}
        />
      ))}
    </div>
  );
}
