import sharp from "sharp";
import { writeFile } from "fs/promises";
import path from "path";

const W = 1584;
const H = 396;

// Brand: dark canvas, accent #e85d04, 4-cube mark with 1/0.7/0.5/0.3 opacities.
// Text sits center-right; LinkedIn overlays the profile photo bottom-left.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="#e85d04" opacity="0.05"/>
    </pattern>
    <radialGradient id="glow" cx="0.8" cy="0.15" r="0.6">
      <stop offset="0%" stop-color="#e85d04" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#e85d04" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#0a0a0a" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <!-- soft left fade so the photo overlay area stays clean -->
  <rect width="${W}" height="${H}" fill="url(#fade)"/>

  <!-- 4-cube brand mark -->
  <g transform="translate(372, 96)">
    <rect x="0"   y="0"   width="84" height="84" rx="18" fill="#e85d04" opacity="1"/>
    <rect x="100" y="0"   width="84" height="84" rx="18" fill="#e85d04" opacity="0.7"/>
    <rect x="0"   y="100" width="84" height="84" rx="18" fill="#e85d04" opacity="0.5"/>
    <rect x="100" y="100" width="84" height="84" rx="18" fill="#e85d04" opacity="0.3"/>
  </g>

  <!-- text block -->
  <g font-family="Segoe UI, Arial, sans-serif">
    <text x="640" y="128" fill="#737373" font-size="20" letter-spacing="6" font-family="Consolas, monospace">+10 AÑOS · REMOTO · ARGENTINA</text>
    <text x="640" y="200" fill="#ededed" font-size="62" font-weight="700">DesarrolloWeb-pdl</text>
    <text x="640" y="250" fill="#a1a1aa" font-size="27">Front-End · React &amp; Next.js · Integración de IA</text>
    <text x="640" y="302" fill="#e85d04" font-size="25" font-weight="600">desarrolloweb-pdl.vercel.app</text>
  </g>
</svg>`;

const outDir = path.resolve("public");
const svgPath = path.join(outDir, "linkedin-banner.svg");
const pngPath = path.join(outDir, "linkedin-banner.png");

await writeFile(svgPath, svg, "utf8");
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(pngPath);

console.log(`SVG: ${svgPath}`);
console.log(`PNG: ${pngPath} (${W}x${H})`);
