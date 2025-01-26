import { component$ } from '@builder.io/qwik';
import { useTheme } from '~/hooks/useTheme';

export const ThemeSwitcher = component$(() => {
  const { theme, isLoading, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      disabled={isLoading}
      class={[
        'p-2 text-sm font-medium border rounded',
        'bg-primary text-foreground',
        'hover:bg-hover active:bg-hover/90',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // 移动端优化
        'touch-manipulation select-none',
        'sm:text-base sm:px-4'
      ].join(' ')}
      onClick$={toggleTheme}
      aria-label={`切换到${theme === 'light' ? '深色' : '浅色'}主题`}
    >
      {isLoading ? '加载中...' : `切换到${theme === 'light' ? '深色' : '浅色'}主题`}
    </button>
  );
});
