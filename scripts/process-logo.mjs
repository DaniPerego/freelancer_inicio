import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, "../public/logo.png");
const outputDir = path.join(__dirname, "../public");

async function processLogo() {
  // Load image and remove white background
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Process pixels: make white/near-white transparent
  const pixels = Buffer.from(data);
  const threshold = 240; // Values above this are considered "white"

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // If pixel is close to white, make it transparent
    if (r > threshold && g > threshold && b > threshold) {
      pixels[i + 3] = 0; // Set alpha to 0
    }
  }

  // Save transparent logo
  const logoPath = path.join(outputDir, "logo-transparent.png");
  await sharp(pixels, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(logoPath);

  console.log("Created:", logoPath);

  // Create favicon (32x32)
  const faviconPath = path.join(outputDir, "favicon.ico");
  await sharp(logoPath)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outputDir, "favicon.png"));

  // Also create apple-touch-icon (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outputDir, "apple-touch-icon.png"));

  console.log("Created: favicon.png, apple-touch-icon.png");
}

processLogo().catch(console.error);
