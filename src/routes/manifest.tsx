import type { RequestHandler } from '@builder.io/qwik-city';
import { translations } from '~/i18n';

export const onGet: RequestHandler = ({ request, json }) => {
  const lang = request.headers.get('accept-language')?.split(',')[0].split('-')[0] ?? 'en';
  const t = translations[lang] ?? translations.en;

  json(200, {
    name: t.common.meta.title,
    short_name: t.common.meta.appName,
    description: t.common.meta.description,
    // ... 其他 manifest 配置
  });
}; 