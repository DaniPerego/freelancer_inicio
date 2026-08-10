import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, "../public/logo-transparent.png");
const outputDir = path.join(__dirname, "../public");

async function upscaleLogo() {
  // Create high-res version for watermark (800x800)
  await sharp(inputPath)
    .resize(800, 800, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: "lanczos3",
    })
    .png()
    .toFile(path.join(outputDir, "logo-watermark.png"));

  console.log("Created: logo-watermark.png (800x800)");
}

upscaleLogo().catch(console.error);
