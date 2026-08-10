"use client";

import { useEffect, useRef, useState } from "react";

export function LogoScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      // Progress: 0 at top of hero, 1 when hero is fully scrolled out
      const progress = Math.min(1, Math.max(0, -rect.top / (heroHeight * 0.6)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interpolate values based on scroll
  const scale = 1 + scrollProgress * 1.8; // grows from 1 to ~2.8
  const opacity = 1 - scrollProgress * 0.85; // fades from 1 to 0.15
  const blur = scrollProgress * 12; // 0 to 12px blur
  const fixedOpacity = scrollProgress > 0.1 ? Math.min(0.2, (scrollProgress - 0.1) * 0.25) : 0;

  return (
    <>
      {/* Hero logo - visible, transitions out on scroll */}
      <div ref={heroRef} className="flex justify-center -mb-4 mt-2">
        <img
          src="/logo-transparent.png"
          alt="Logo"
          className="transition-none"
          style={{
            width: "200px",
            opacity,
            filter: `blur(${blur}px)`,
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* Fixed watermark - fades in on scroll */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: fixedOpacity,
          backgroundImage: "url(/logo-watermark.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "min(50vw, 500px)",
        }}
      />
    </>
  );
}
