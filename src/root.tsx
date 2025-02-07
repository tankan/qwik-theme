import { component$, useContextProvider, Resource, useResource$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { InstallPWA } from './components/InstallPWA';
import { I18nContext } from './contexts';
import { useI18n } from './hooks/useI18n';

import "./global.css";

interface MetaData {
  appName: string;
  description: string;
  ogTitle: string;
  ogDesc: string;
  twitterTitle: string;
  twitterDesc: string;
}

export default component$(() => {
  const { lang, t } = useI18n();
  const meta = useResource$(async () => {
    const [appName, description, ogTitle, ogDesc, twitterTitle, twitterDesc] = await Promise.all([
      t('common.meta.appName'),
      t('common.meta.description'),
      t('common.meta.ogTitle'),
      t('common.meta.ogDescription'),
      t('common.meta.twitterTitle'),
      t('common.meta.twitterDescription')
    ]);
    return { appName, description, ogTitle, ogDesc, twitterTitle, twitterDesc };
  });

  useContextProvider(I18nContext, { lang, t });

  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <Resource<MetaData>
      value={meta}
      onResolved={(m) => (
        <QwikCityProvider>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0" />
            
            {/* DNS 预解析和资源预连接，防止运营商劫持 */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//fonts.gstatic.com" />
            <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
            
            {/* 强制 HTTPS */}
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            
            {/* 防止浏览器厂商劫持 */}
            <meta name="renderer" content="webkit" />
            <meta name="force-rendering" content="webkit" />
            <meta name="wap-font-scale" content="no" />
            
            {/* 移动端优化 */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content={m.appName} />
            <meta name="theme-color" content="#0056D2" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
            
            {/* iOS 全屏优化 */}
            <meta name="apple-touch-fullscreen" content="yes" />
            <meta name="format-detection" content="telephone=no,email=no,address=no" />
            
            {/* 禁止翻译 */}
            <meta name="google" content="notranslate" />
            
            {/* 安全相关 meta 标签 */}
            <meta http-equiv="Content-Security-Policy" content="
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https:;
              font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
              connect-src 'self';
              manifest-src 'self';
              worker-src 'self';
              base-uri 'self';
              form-action 'self'
            " />
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
            
            {/* PWA 相关 */}
            <link rel="manifest" href="/manifest" />
            <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            <link 
              rel="mask-icon" 
              href="/icons/safari-pinned-tab.svg" 
              style={{ color: '#0056D2' }}
            />
            
            {/* 其他优化 */}
            <meta name="description" content={m.description} />
            <meta name="robots" content="index, follow" />
            
            {/* 结构化数据 */}
            <script type="application/ld+json" dangerouslySetInnerHTML={`
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "${m.appName}",
                "description": "${m.description}",
                "url": "https://yourdomain.com",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "All",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "author": {
                  "@type": "Person",
                  "name": "Your Name",
                  "url": "https://github.com/yourusername"
                },
                "browserRequirements": "Requires JavaScript. Requires HTML5.",
                "softwareVersion": "1.0.0",
                "screenshot": {
                  "@type": "ImageObject",
                  "url": "https://yourdomain.com/screenshots/light.png",
                  "caption": "Light theme screenshot"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "ratingCount": "1",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "featureList": [
                  "Theme switching",
                  "PWA support",
                  "Mobile optimized",
                  "Security enhanced"
                ],
                "keywords": "qwik, theme, pwa, web application",
                "thumbnailUrl": "https://yourdomain.com/icons/icon-512x512.png",
                "installUrl": "https://yourdomain.com",
                "requirements": "Modern web browser with JavaScript enabled"
              }
            `} />

            {/* 开放图谱协议标记 */}
            <meta property="og:title" content={m.ogTitle} />
            <meta property="og:description" content={m.ogDesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://yourdomain.com" />
            <meta property="og:image" content="https://yourdomain.com/screenshots/light.png" />
            
            {/* Twitter 卡片 */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={m.twitterTitle} />
            <meta name="twitter:description" content={m.twitterDesc} />
            <meta name="twitter:image" content="https://yourdomain.com/screenshots/light.png" />
            
            <RouterHead />
          </head>
          <body lang={lang} class="overscroll-none">
            <ThemeSwitcher />
            <RouterOutlet />
            <InstallPWA />
            <ServiceWorkerRegister />
          </body>
        </QwikCityProvider>
      )}
    />
  );
});
