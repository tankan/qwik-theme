import type { RequestHandler } from '@builder.io/qwik-city';
import { translations } from '~/i18n';
import { colors } from '~/theme';

export const onGet: RequestHandler = ({ request, json }) => {
  const lang = request.headers.get('accept-language')?.split(',')[0].split('-')[0] ?? 'en';
  const t = translations[lang] ?? translations.en;

  json(200, {
    name: t.common.meta.title,
    short_name: t.common.meta.appName,
    description: t.common.meta.description,
    start_url: '/',
    display: 'standalone',
    background_color: colors.background.main,
    theme_color: colors.brand.main,
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  });
}; 