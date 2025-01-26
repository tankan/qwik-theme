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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0056D2" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A theme system for Qwik" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QTheme" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <RouterHead />
      </head>
      <body lang="en">
        <ThemeSwitcher />
        <RouterOutlet />
        <InstallPWA />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
