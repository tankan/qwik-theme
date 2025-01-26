import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const ICONS_DIR = 'public/icons';
const SOURCE_ICON = 'src/assets/11.png'; // 你的源图片

// 定义需要生成的图标尺寸
const ICON_SIZES = [
  { size: 96, name: 'icon-96x96.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
  { size: 72, name: 'badge-72x72.png' }
];

// 生成截图的尺寸
const SCREENSHOTS = [
  {
    name: 'light.png',
    width: 1280,
    height: 720,
    background: '#ffffff'
  },
  {
    name: 'dark.png',
    width: 1280,
    height: 720,
    background: '#111827'
  }
];

async function generateIcons() {
  // 确保目录存在
  await fs.mkdir(ICONS_DIR, { recursive: true });
  await fs.mkdir('public/screenshots', { recursive: true });

  // 生成不同尺寸的图标
  for (const { size, name } of ICON_SIZES) {
    await sharp(SOURCE_ICON)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(path.join(ICONS_DIR, name));
    
    console.log(`✓ 生成图标: ${name}`);
  }

  // 先调整源图片大小用于截图
  const resizedIcon = await sharp(SOURCE_ICON)
    .resize(200, 200, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  // 生成示例截图
  for (const screenshot of SCREENSHOTS) {
    await sharp({
      create: {
        width: screenshot.width,
        height: screenshot.height,
        channels: 4,
        background: screenshot.background
      }
    })
      .composite([
        {
          input: resizedIcon,
          gravity: 'center'
        }
      ])
      .toFile(path.join('public/screenshots', screenshot.name));
    
    console.log(`✓ 生成截图: ${screenshot.name}`);
  }
}

generateIcons().catch(console.error); 