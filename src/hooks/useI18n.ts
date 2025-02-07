import { $, useContextProvider, useSignal, useTask$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import { translations, defaultLang, supportedLangs } from '~/i18n';
import { I18nContext } from '~/contexts';
import type { TranslationKey } from '~/types';

export const useI18n = () => {
  const lang = useSignal(defaultLang);

  // 检测浏览器语言
  useTask$(() => {
    if (isBrowser) {
      const savedLang = localStorage.getItem('lang');
      const browserLang = navigator.language.split('-')[0];
      const newLang = savedLang || (supportedLangs.includes(browserLang as any) ? browserLang : defaultLang);
      lang.value = newLang;
    }
  });

  // 切换语言
  const setLang = $((newLang: string) => {
    if (supportedLangs.includes(newLang as any)) {
      lang.value = newLang;
      document.documentElement.lang = newLang;
      localStorage.setItem('lang', newLang);
    }
  });

  // 获取翻译
  const t = $((key: TranslationKey) => {
    const parts = key.split('.');
    let result: any = translations[lang.value];
    for (const part of parts) {
      result = result[part as keyof typeof result];
    }
    return result as string;
  });

  // 提供 Context
  useContextProvider(I18nContext, {
    lang: lang.value,
    t: t
  });

  return {
    lang: lang.value,
    setLang,
    t
  };
}; 