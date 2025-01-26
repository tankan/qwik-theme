/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.dev/qwikcity/prefetching/overview/
 */
import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";

declare const self: ServiceWorkerGlobalScope;
declare const caches: CacheStorage;

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

// 添加安全检查
self.addEventListener('fetch', (event: FetchEvent) => {
  const request = event.request;
  const url = new URL(request.url);

  try {
    // 只处理同源请求
    if (url.origin !== self.location.origin) {
      return;
    }

    // 检查请求类型
    if (request.method !== 'GET') {
      return;
    }

    // 检查请求头
    if (request.headers.has('Authorization')) {
      return;
    }

    // 检查文件类型
    const extension = url.pathname.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['html', 'css', 'js', 'json', 'png', 'jpg', 'svg', 'ico', 'webp', 'woff2'];
    if (!allowedExtensions.includes(extension || '')) {
      return;
    }

    // 检查路径注入
    if (url.pathname.includes('..') || url.pathname.includes('//')) {
      return;
    }

    event.respondWith(
      caches.match(request).then(async (response) => {
        if (response) {
          // 验证缓存响应
          const headers = new Headers(response.headers);
          headers.set('X-Content-Type-Options', 'nosniff');
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers
          });
        }
        
        try {
          // 发起网络请求
          const networkResponse = await fetch(request);
          
          // 检查响应
          if (!networkResponse.ok) {
            return networkResponse;
          }

          // 克隆响应
          const responseToCache = networkResponse.clone();

          // 缓存响应
          const cache = await caches.open('v1');
          await cache.put(request, responseToCache);

          return networkResponse;
        } catch (error) {
          console.error('Fetch failed:', error);
          return new Response('Network error', { status: 503 });
        }
      })
    );
  } catch (error) {
    console.error('Service Worker error:', error);
  }
});
