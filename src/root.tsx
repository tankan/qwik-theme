import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { InstallPWA } from './components/InstallPWA';

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
        
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
        <meta name="apple-mobile-web-app-title" content="QTheme" />
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link 
          rel="mask-icon" 
          href="/icons/safari-pinned-tab.svg" 
          style={{ color: '#0056D2' }}
        />
        
        {/* 其他优化 */}
        <meta name="description" content="A theme system for Qwik" />
        <meta name="robots" content="noindex, nofollow" />
        <RouterHead />
      </head>
      <body lang="en" class="overscroll-none">
        <ThemeSwitcher />
        <RouterOutlet />
        <InstallPWA />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
