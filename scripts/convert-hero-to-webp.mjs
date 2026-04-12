import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../public/images/hero-mo-entryway-composite.png');
const outputPath = join(__dirname, '../public/images/hero-desktop.webp');

async function convertToWebP() {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log('Conversion successful!');
    console.log('Output:', outputPath);
    console.log('Size:', Math.round(info.size / 1024), 'KB');
    console.log('Dimensions:', info.width, 'x', info.height);
  } catch (error) {
    console.error('Error converting image:', error);
  }
}

convertToWebP();
