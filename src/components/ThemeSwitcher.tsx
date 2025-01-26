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
