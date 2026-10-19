"use client";

function makePatternDataUri(fill: string, opacity: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="4" fill="${fill}" opacity="${opacity}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const lightPattern = makePatternDataUri("#171717", 1);
const darkPattern = makePatternDataUri("#ededed", 1);

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
    </div>
  );
}
