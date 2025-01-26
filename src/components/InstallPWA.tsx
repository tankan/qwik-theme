import { component$, useSignal, useOnDocument, $ } from '@builder.io/qwik';

export const InstallPWA = component$(() => {
  const deferredPrompt = useSignal<any>(null);
  const showInstallPrompt = useSignal(false);

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

  // 安装 PWA
  const installApp = $(async () => {
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
    showInstallPrompt.value && (
      <div class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-foreground p-4 rounded-lg shadow-lg z-50">
        <div class="flex flex-col gap-3">
          <div class="text-text-primary">
            <h3 class="font-medium">安装应用</h3>
            <p class="text-sm text-text-secondary mt-1">
              将此应用安装到您的设备，随时使用主题切换功能
            </p>
          </div>
          <div class="flex justify-end gap-2">
            <button
              onClick$={() => showInstallPrompt.value = false}
              class="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              稍后再说
            </button>
            <button
              onClick$={installApp}
              class="px-3 py-1.5 text-sm bg-primary text-foreground rounded hover:bg-primary/90 transition-colors"
            >
              立即安装
            </button>
          </div>
        </div>
      </div>
    )
  );
}); 