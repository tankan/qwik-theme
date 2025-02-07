import type { RequestHandler } from '@builder.io/qwik-city';
import { translations } from '~/i18n';
import { colors } from '~/theme';

export const onGet: RequestHandler = async ({ request, json }) => {
  const lang = request.headers.get('accept-language')?.split(',')[0].split('-')[0] ?? 'en';
  const t = translations[lang] ?? translations.en;

  // 设置正确的 Content-Type
  json(200, {
    $schema: "https://json.schemastore.org/web-manifest-combined.json",
    name: t.common.meta.title,
    short_name: t.common.meta.appName,
    description: t.common.meta.description,
    start_url: ".",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: colors.background.main,
    theme_color: colors.brand.main,
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ],
    screenshots: [
      {
        src: "/screenshots/light-mobile.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: "浅色主题 - 移动端"
      },
      {
        src: "/screenshots/dark-mobile.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: "深色主题 - 移动端"
      },
      {
        src: "/screenshots/light-desktop.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "浅色主题 - 桌面端"
      },
      {
        src: "/screenshots/dark-desktop.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "深色主题 - 桌面端"
      }
    ],
    shortcuts: [
      {
        "name": "切换主题",
        "url": "/",
        "icons": [{ "src": "icons/icon-96x96.png", "sizes": "96x96" }]
      }
    ],
    categories: ["productivity", "utilities"],
    launch_handler: {
      client_mode: "focus-existing"
    },
  });
}; 