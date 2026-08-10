import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, "../public/logo-original.png");
const outputDir = path.join(__dirname, "../public");

async function processLogo() {
  // Use a more aggressive approach: replace near-white with transparent
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // Background is around #f0f0f0 - treat anything above 220 as background
    if (r > 220 && g > 220 && b > 220) {
      pixels[i + 3] = 0;
    }
  }

  const logoPath = path.join(outputDir, "logo-transparent.png");
  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(logoPath);

  console.log("Created:", logoPath, `(${info.width}x${info.height})`);

  // Watermark: high quality, centered in square canvas
  const watermarkSize = 1024;
  const targetH = 400;
  const scale = targetH / info.height;
  const newW = Math.round(info.width * scale);
  const newH = targetH;

  const resized = await sharp(logoPath)
    .resize(newW, newH, { kernel: "lanczos3" })
    .toBuffer();

  const watermarkPath = path.join(outputDir, "logo-watermark.png");
  await sharp({
    create: {
      width: watermarkSize,
      height: watermarkSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{
      input: resized,
      gravity: "center",
    }])
    .png({ quality: 100 })
    .toFile(watermarkPath);

  console.log("Created:", watermarkPath);

  // Favicon (sharp edges)
  await sharp(logoPath)
    .resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: "lanczos3" })
    .png()
    .toFile(path.join(outputDir, "favicon.png"));

  await sharp(logoPath)
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: "lanczos3" })
    .png()
    .toFile(path.join(outputDir, "apple-touch-icon.png"));

  console.log("Created: favicon.png, apple-touch-icon.png");
}

processLogo().catch(console.error);
