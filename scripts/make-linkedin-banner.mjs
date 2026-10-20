import sharp from "sharp";
import { writeFile } from "fs/promises";
import path from "path";

const W = 1584;
const H = 396;

// Banner v2: real isometric-cube logo (public/logo-transparent.png) composited
// on the dark brand canvas. Text block center-right; LinkedIn overlays the
// profile photo bottom-left (soft fade keeps that zone clean).
const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="#e85d04" opacity="0.05"/>
    </pattern>
    <radialGradient id="glow" cx="0.8" cy="0.15" r="0.6">
      <stop offset="0%" stop-color="#e85d04" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#e85d04" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.85"/>
      <stop offset="35%" stop-color="#0a0a0a" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <g font-family="Segoe UI, Arial, sans-serif">
    <text x="810" y="128" fill="#737373" font-size="20" letter-spacing="6" font-family="Consolas, monospace">+10 AÑOS · REMOTO · ARGENTINA</text>
    <text x="810" y="200" fill="#ededed" font-size="60" font-weight="700">DesarrolloWeb-pdl</text>
    <text x="810" y="250" fill="#a1a1aa" font-size="26">Front-End · React &amp; Next.js · Integración de IA</text>
    <text x="810" y="302" fill="#e85d04" font-size="24" font-weight="600">desarrolloweb-pdl.vercel.app</text>
  </g>
</svg>`;

const logoH = 200;
const logoW = Math.round((655 / 315) * logoH); // preserve aspect
const logoLeft = 320;
const logoTop = Math.round((H - logoH) / 2);

const outDir = path.resolve("public");
const svgPath = path.join(outDir, "linkedin-banner.svg");
const pngPath = path.join(outDir, "linkedin-banner.png");

await writeFile(svgPath, baseSvg, "utf8");

await sharp(Buffer.from(baseSvg))
  .composite([
    {
      input: await sharp(path.join(outDir, "logo-transparent.png"))
        .resize(logoW, logoH, { fit: "contain" })
        .png()
        .toBuffer(),
      left: logoLeft,
      top: logoTop,
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(pngPath);

console.log(`PNG: ${pngPath} (${W}x${H}, logo ${logoW}x${logoH} @ ${logoLeft},${logoTop})`);
