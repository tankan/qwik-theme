import { component$, useStore, $, useTask$ } from '@builder.io/qwik';

export const ThemeSwitcher = component$(() => {
  const state = useStore({ theme: 'light' });

  useTask$(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      state.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  });

  const toggleTheme = $(() => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    state.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // 使用 service worker 发送通知
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('主题已切换', {
          body: `已切换到${newTheme === 'light' ? '浅色' : '深色'}主题`,
          icon: '/icons/icon-192x192.png',
          badge: '/icons/badge-72x72.png'
        });
      });
    }
  });

  return (
    <button
      type="button"
      class="p-2 text-sm font-medium border rounded bg-primary text-foreground hover:bg-hover"
      onClick$={toggleTheme}
    >
      切换到{state.theme === 'light' ? '深色' : '浅色'}主题
    </button>
  );
});
