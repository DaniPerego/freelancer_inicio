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
      // Slower: more of the hero needs to scroll before full progress
      const progress = Math.min(1, Math.max(0, -rect.top / (heroHeight * 1.2)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shrink instead of grow
  const scale = 1 - scrollProgress * 0.6; // shrinks from 1 to 0.4
  const opacity = 1 - scrollProgress * 0.85; // fades from 1 to 0.15
  const blur = scrollProgress * 12;
  const fixedOpacity = scrollProgress > 0.2 ? Math.min(0.2, (scrollProgress - 0.2) * 0.3) : 0;

  return (
    <>
      {/* Hero logo */}
      <div ref={heroRef} className="flex justify-center py-5 group/logo">
        <img
          src="/favicon.svg"
          alt="Logo"
          className="transition-none logo-hover"
          style={{
            width: "180px",
            opacity,
            filter: `blur(${blur}px)`,
            transform: `scale(${scale})`,
          }}
        />
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
