import sharp from 'sharp';

async function getLogoColor() {
  const { data, info } = await sharp('/mnt/GitHub/OceanHub/src/assets/oceanhub-logo.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const colorCounts = {};
  
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = info.channels === 4 ? data[i + 3] : 255;

    // Skip transparent or very light (white/near-white) pixels
    if (a < 50 || (r > 240 && g > 240 && b > 240)) continue;

    const hex = `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    colorCounts[hex] = (colorCounts[hex] || 0) + 1;
  }

  const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
  
  console.log('Top colors (hex):');
  sortedColors.slice(0, 5).forEach(([hex, count]) => {
    console.log(`#${hex}: ${count} pixels`);
  });
}

getLogoColor().catch(console.error);
