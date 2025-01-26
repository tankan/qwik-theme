import sharp from 'sharp';

const SVG = `
<svg width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="128" fill="#0056D2" />
  <path
    d="M256 128v256M128 256h256"
    stroke="#FFF"
    stroke-width="48"
    stroke-linecap="round"
  />
</svg>`;

async function exportLogo() {
  await sharp(Buffer.from(SVG))
    .png()
    .toFile('src/assets/logo.png');
}

exportLogo().catch(console.error); 