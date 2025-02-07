import { component$, useResource$, Resource } from '@builder.io/qwik';
import { useTheme } from '~/hooks/useTheme';
import { useI18n } from '~/hooks/useI18n';
import type { Theme } from '~/types';

export const ThemeSwitcher = component$(() => {
  const { theme, isLoading, toggleTheme } = useTheme();
  const { t } = useI18n();

  const translations = useResource$(async () => {
    const [light, dark, system] = await Promise.all([
      t('common.theme.light'),
      t('common.theme.dark'),
      t('common.theme.system')
    ]);
    return { light, dark, system };
  });

  return (
    <select
      value={theme}
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
      onChange$={(e) => {
        const selectedTheme = (e.target as HTMLSelectElement).value as Theme;
        toggleTheme(selectedTheme);
      }}
      aria-label={`切换主题 (当前: ${theme})`}
    >
      <Resource
        value={translations}
        onResolved={(trans) => (
          <>
            <option value="light">{trans.light}</option>
            <option value="dark">{trans.dark}</option>
            <option value="system">{trans.system}</option>
          </>
        )}
      />
    </select>
  );
});
