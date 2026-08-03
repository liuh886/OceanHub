import sharp from 'sharp';

async function recolorLogo() {
  const input = '/mnt/GitHub/OceanHub/src/assets/oceanhub-logo.png';
  const output = '/mnt/GitHub/OceanHub/src/assets/oceanhub-logo-v2.png';

  // The original color we found was #1a91ac (RGB: 26, 145, 172)
  // Target color is #1B365D (RGB: 27, 54, 93)
  
  // A simple way to recolor is using a tint or color matrix
  // For a precise map, we'll use tinting.
  await sharp(input)
    .tint('#1B365D')
    .toFile(output);

  console.log(`Successfully recolored logo to #1B365D and saved to ${output}`);
}

recolorLogo().catch(console.error);
