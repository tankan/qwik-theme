import type { Translation } from '~/types';

export const defaultLang = 'en';
export const supportedLangs = ['en', 'zh'] as const;

export const translations: Record<string, Translation> = {
  en: {
    common: {
      theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      },
      pwa: {
        install: 'Install App',
        later: 'Maybe Later',
        title: 'Install QTheme',
        description: 'Install this app on your device to access QTheme anytime'
      },
      meta: {
        title: 'QTheme - A theme system for Qwik',
        appName: 'QTheme',
        description: 'A theme system for Qwik',
        keywords: 'qwik, theme, pwa, web application',
        ogTitle: 'QTheme - A theme system for Qwik',
        ogDescription: 'A modern theme system built with Qwik framework',
        twitterTitle: 'QTheme - A theme system for Qwik',
        twitterDescription: 'A modern theme system built with Qwik framework'
      }
    },
    home: {
      welcome: 'Hi 👋',
      description: "Can't wait to see what you build with qwik!",
      happyCoding: 'Happy coding.'
    }
  },
  zh: {
    common: {
      theme: {
        light: '浅色',
        dark: '深色',
        system: '跟随系统'
      },
      pwa: {
        install: '安装应用',
        later: '稍后再说',
        title: '安装 QTheme',
        description: '将此应用安装到您的设备，随时使用 QTheme'
      },
      meta: {
        title: 'QTheme - Qwik 主题系统',
        appName: 'QTheme',
        description: 'Qwik 主题系统',
        keywords: 'qwik, 主题, pwa, web应用',
        ogTitle: 'QTheme - Qwik 主题系统',
        ogDescription: '使用 Qwik 构建的现代主题系统',
        twitterTitle: 'QTheme - Qwik 主题系统',
        twitterDescription: '使用 Qwik 构建的现代主题系统'
      }
    },
    home: {
      welcome: '你好 👋',
      description: '期待看到你用 Qwik 构建的作品！',
      happyCoding: '编码愉快。'
    }
  }
}; 