import { $, useStore, useTask$ } from '@builder.io/qwik';
import type { Theme } from '~/types';

const isValidTheme = (theme: string | null): theme is Theme => {
  return theme === 'light' || theme === 'dark';
};

export const useTheme = () => {
  const state = useStore({
    theme: 'light' as Theme,
    isLoading: false
  });

  // 初始化主题
  useTask$(() => {
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme');
    state.theme = isValidTheme(savedTheme) ? savedTheme : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
  });

  // 切换主题
  const toggleTheme = $((newTheme: Theme) => {
    if (state.isLoading) return;
    state.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  return {
    theme: state.theme,
    isLoading: state.isLoading,
    toggleTheme
  };
}; 