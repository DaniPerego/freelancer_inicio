import { chromium } from "playwright-core";
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

const projects = [
  { slug: "tiempomasamadre", url: "https://tiempomasamadre.vercel.app/" },
  { slug: "alqui-libres", url: "https://alqui-libres.vercel.app/" },
  { slug: "dividamos-la-cuenta", url: "https://dividamos-la-cuenta.vercel.app/" },
  { slug: "bendito-cross", url: "https://bendito-cross.vercel.app/" },
  { slug: "escrutinio-carnaval-2026", url: "https://escrutinio-carnaval-2026.vercel.app/" },
  { slug: "gestion-gimnasio-demo", url: "https://gestion-gimnasio-demo.vercel.app/" },
  { slug: "libresqr", url: "https://libresqr.vercel.app/" },
  { slug: "tvlibres", url: "https://tvlibres.vercel.app/" },
  { slug: "libres-cobros", url: "https://libres-cobros.vercel.app/" },
  { slug: "libres-pdf", url: "https://libres-pdf.vercel.app/" },
];

const outDir = path.resolve("public/projects");
await mkdir(outDir, { recursive: true });

let browser;
try {
  browser = await chromium.launch({ channel: "msedge", headless: true });
  console.log("Browser: msedge");
} catch {
  browser = await chromium.launch({ channel: "chrome", headless: true });
  console.log("Browser: chrome");
}

const results = [];

for (const { slug, url } of projects) {
  const outFile = path.join(outDir, `${slug}.webp`);
  try {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    // let animations settle
    await page.waitForTimeout(1500);
    const png = await page.screenshot({ type: "png" });
    await page.close();

    await sharp(png)
      .resize(1280, 800, { fit: "cover", position: "top" })
      .webp({ quality: 80 })
      .toFile(outFile);

    console.log(`OK  ${slug}`);
    results.push({ slug, ok: true });
  } catch (err) {
    console.error(`FAIL ${slug}: ${err.message}`);
    results.push({ slug, ok: false, error: err.message });
  }
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\nDone: ${results.length - failed.length}/${results.length} captured`);
if (failed.length > 0) {
  console.log("Failed:", failed.map((f) => f.slug).join(", "));
  process.exitCode = 1;
}
