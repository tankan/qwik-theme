import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 确保目录存在
const screenshotsDir = path.join(__dirname, '../public/screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function createScreenshot(width, height, isDark, isDesktop) {
  // 创建背景
  const background = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${isDark ? '#111827' : '#F9FAFB'}"/>
      <rect 
        x="${width - (isDesktop ? 68 : 56)}" 
        y="20" 
        width="${isDesktop ? 48 : 36}" 
        height="${isDesktop ? 48 : 36}" 
        fill="${isDark ? '#374151' : '#E5E7EB'}"
      />
      <text 
        x="40" 
        y="${isDesktop ? 80 : 60}" 
        font-family="Arial" 
        font-size="${isDesktop ? 48 : 32}" 
        font-weight="bold" 
        fill="${isDark ? '#F9FAFB' : '#111827'}"
      >QTheme</text>
      <text 
        x="40" 
        y="${isDesktop ? 120 : 90}" 
        font-family="Arial" 
        font-size="${isDesktop ? 24 : 18}" 
        fill="${isDark ? '#9CA3AF' : '#6B7280'}"
      >${isDesktop ? 'A modern theme system for Qwik' : 'Qwik 主题系统'}</text>
    </svg>`
  );

  return sharp(background)
    .resize(width, height)
    .png();
}

// 生成截图
async function generateScreenshots() {
  const [desktopLight, desktopDark, mobileLight, mobileDark] = await Promise.all([
    createScreenshot(1920, 1080, false, true),
    createScreenshot(1920, 1080, true, true),
    createScreenshot(1080, 1920, false, false),
    createScreenshot(1080, 1920, true, false)
  ]);

  await Promise.all([
    desktopLight.toFile(path.join(screenshotsDir, 'light-desktop.png')),
    desktopDark.toFile(path.join(screenshotsDir, 'dark-desktop.png')),
    mobileLight.toFile(path.join(screenshotsDir, 'light-mobile.png')),
    mobileDark.toFile(path.join(screenshotsDir, 'dark-mobile.png'))
  ]);

  console.log('Screenshots generated successfully!');
}

generateScreenshots().catch(console.error); 