import { component$, useSignal, useOnDocument, useVisibleTask$, $ } from '@builder.io/qwik';
import { useI18n } from '~/hooks/useI18n';

export const InstallPWA = component$(() => {
  const deferredPrompt = useSignal<any>(null);
  const showInstallPrompt = useSignal(false);
  const { t } = useI18n();

  // 检查 PWA 安装状态
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // 检查是否已经安装
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA 已经安装');
      return;
    }

    // 检查是否支持 PWA
    if ('serviceWorker' in navigator) {
      console.log('支持 Service Worker');
    } else {
      console.log('不支持 Service Worker');
    }

    // 检查清单文件
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      console.log('找到清单文件:', manifestLink.getAttribute('href'));
    } else {
      console.log('未找到清单文件');
    }
  });

  // 监听 beforeinstallprompt 事件
  useOnDocument('beforeinstallprompt', $((e: Event) => {
    console.log('捕获到 beforeinstallprompt 事件');
    e.preventDefault();
    deferredPrompt.value = e;
    showInstallPrompt.value = true;
  }));

  // 监听 appinstalled 事件
  useOnDocument('appinstalled', $(() => {
    console.log('PWA 已成功安装');
    showInstallPrompt.value = false;
  }));

  // 手动触发安装提示（用于测试）
  const triggerInstall = $(async () => {
    if (!showInstallPrompt.value) {
      console.log('尝试手动触发安装提示');
      showInstallPrompt.value = true;
    }
  });

  // 安装 PWA
  const installApp = $(async () => {
    // 检查是否在安全上下文中
    if (!window.isSecureContext) {
      console.error('需要安全上下文(HTTPS)才能安装 PWA');
      return;
    }

    // 检查是否在 iframe 中
    if (window.top !== window.self) {
      console.error('不能在 iframe 中安装 PWA');
      return;
    }

    if (!deferredPrompt.value) {
      console.log('没有可用的安装提示');
      return;
    }

    try {
      console.log('尝试显示安装提示');
      deferredPrompt.value.prompt();
      const { outcome } = await deferredPrompt.value.userChoice;
      console.log('安装结果:', outcome);
    } catch (error) {
      console.error('安装过程出错:', error);
    } finally {
      deferredPrompt.value = null;
      showInstallPrompt.value = false;
    }
  });

  return (
    <>
      {/* 调试按钮 */}
      <button
        onClick$={triggerInstall}
        class="fixed top-4 right-4 px-3 py-1.5 text-sm bg-primary text-foreground rounded hover:bg-primary/90 transition-colors"
      >
        {t('common.pwa.install')}
      </button>

      {/* 安装提示 */}
      {showInstallPrompt.value && (
        <div class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-foreground p-4 rounded-lg shadow-lg z-50">
          <div class="flex flex-col gap-3">
            <div class="text-text-primary">
              <h3 class="font-medium">{t('common.pwa.title')}</h3>
              <p class="text-sm text-text-secondary mt-1">
                {t('common.pwa.description')}
              </p>
            </div>
            <div class="flex justify-end gap-2">
              <button
                onClick$={() => showInstallPrompt.value = false}
                class="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {t('common.pwa.later')}
              </button>
              <button
                onClick$={installApp}
                class="px-3 py-1.5 text-sm bg-primary text-foreground rounded hover:bg-primary/90 transition-colors"
              >
                {t('common.pwa.install')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}); 