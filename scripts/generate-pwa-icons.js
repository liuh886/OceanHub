import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// Vector icon SVG with modern cyber-ocean aesthetic
function getIconSvg(size, isMaskable = false) {
  const iconScale = isMaskable ? size * 0.55 : size * 0.72;
  const offset = (size - iconScale) / 2;
  const cornerRadius = isMaskable ? 0 : Math.round(size * 0.22);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050B14"/>
        <stop offset="50%" stop-color="#0A1628"/>
        <stop offset="100%" stop-color="#032B44"/>
      </linearGradient>
      <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00F0FF"/>
        <stop offset="50%" stop-color="#0EA5E9"/>
        <stop offset="100%" stop-color="#3B82F6"/>
      </linearGradient>
      <linearGradient id="glowRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#0284C7" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.9"/>
      </linearGradient>
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="${size * 0.02}" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    
    <!-- Background Rectangle -->
    <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="url(#bgGrad)"/>
    
    <!-- Tech Accent Outer Ring -->
    <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.44}" fill="none" stroke="url(#glowRing)" stroke-width="${Math.max(1.5, size * 0.006)}" stroke-dasharray="${size * 0.04} ${size * 0.02}"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.39}" fill="none" stroke="#00F0FF" stroke-opacity="0.15" stroke-width="1"/>

    <!-- Subtle Radar Reticle -->
    <line x1="${size * 0.5}" y1="${size * 0.06}" x2="${size * 0.5}" y2="${size * 0.12}" stroke="#00F0FF" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="${size * 0.5}" y1="${size * 0.88}" x2="${size * 0.5}" y2="${size * 0.94}" stroke="#00F0FF" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="${size * 0.06}" y1="${size * 0.5}" x2="${size * 0.12}" y2="${size * 0.5}" stroke="#00F0FF" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="${size * 0.88}" y1="${size * 0.5}" x2="${size * 0.94}" y2="${size * 0.5}" stroke="#00F0FF" stroke-opacity="0.5" stroke-width="2"/>

    <!-- Main OceanHub Wave/Anchor Glyph with Glow -->
    <g transform="translate(${offset}, ${offset}) scale(${iconScale / 128})" filter="url(#neonGlow)">
      <path fill="url(#cyanGrad)" d="M50.4 78.5a75.1 75.1 0 0 0-28.5 6.9l24.2-65.7c.7-2 1.9-3.2 3.4-3.2h29c1.5 0 2.7 1.2 3.4 3.2l24.2 65.7s-11.6-7-28.5-7L67 45.5c-.4-1.7-1.6-2.8-2.9-2.8-1.3 0-2.5 1.1-2.9 2.7L50.4 78.5Zm-1.1 28.2Zm-4.2-20.2c-2 6.6-.6 15.8 4.2 20.2a17.5 17.5 0 0 1 .2-.7 5.5 5.5 0 0 1 5.7-4.5c2.8.1 4.3 1.5 4.7 4.7.2 1.1.2 2.3.2 3.5v.4c0 2.7.7 5.2 2.2 7.4a13 13 0 0 0 5.7 4.9v-.3l-.2-.3c-1.8-5.6-.5-9.5 4.4-12.8l1.5-1a73 73 0 0 0 3.2-2.2 16 16 0 0 0 6.8-11.4c.3-2 .1-4-.6-6l-.8.6-1.6 1a37 37 0 0 1-22.4 2.7c-5-.7-9.7-2-13.2-6.2Z" />
    </g>
  </svg>
  `;
}

async function generate() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Generate Favicon SVG
  const faviconSvg = getIconSvg(128, false);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg.trim());
  console.log('Generated public/favicon.svg');

  // 2. Generate 192x192 PNG
  const svg192 = Buffer.from(getIconSvg(192, false));
  await sharp(svg192).png().toFile(path.join(publicDir, 'icon-192.png'));
  console.log('Generated public/icon-192.png');

  // 3. Generate 512x512 PNG
  const svg512 = Buffer.from(getIconSvg(512, false));
  await sharp(svg512).png().toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Generated public/icon-512.png');

  // 4. Generate 512x512 Maskable PNG
  const svg512Maskable = Buffer.from(getIconSvg(512, true));
  await sharp(svg512Maskable).png().toFile(path.join(publicDir, 'icon-512-maskable.png'));
  console.log('Generated public/icon-512-maskable.png');

  // 5. Generate Apple Touch Icon 180x180 PNG
  const svg180 = Buffer.from(getIconSvg(180, false));
  await sharp(svg180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated public/apple-touch-icon.png');
}

generate().catch(console.error);
