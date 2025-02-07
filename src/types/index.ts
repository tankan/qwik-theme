export type Theme = 'light' | 'dark' | 'system';

export type TranslationKey = 
  | 'common.theme.light' 
  | 'common.theme.dark' 
  | 'common.theme.system'
  | 'common.pwa.install'
  | 'common.pwa.later'
  | 'common.pwa.title'
  | 'common.meta.title'
  | 'common.meta.appName'
  | 'common.meta.description'
  | 'common.meta.keywords'
  | 'common.meta.ogTitle'
  | 'common.meta.ogDescription'
  | 'common.meta.twitterTitle'
  | 'common.meta.twitterDescription'
  | 'home.welcome'
  | 'home.description'
  | 'home.happyCoding'
  | 'common.pwa.description';

export interface Translation {
  common: {
    theme: {
      light: string;
      dark: string;
      system: string;
    };
    pwa: {
      install: string;
      later: string;
      title: string;
      description: string;
    };
    meta: {
      title: string;
      appName: string;
      description: string;
      keywords: string;
      ogTitle: string;
      ogDescription: string;
      twitterTitle: string;
      twitterDescription: string;
    };
  };
  home: {
    welcome: string;
    description: string;
    happyCoding: string;
  };
} 