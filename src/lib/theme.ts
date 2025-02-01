import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'sepia' | 'nord' | 'dracula' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme });
        const root = document.documentElement;
        const themes = ['theme-light', 'theme-dark', 'theme-sepia', 'theme-nord', 'theme-dracula'];

        // Remove all previous theme classes
        themes.forEach((t) => root.classList.remove(t));

        // Apply new theme
        if (theme === 'system') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          root.classList.add(isDark ? 'theme-dark' : 'theme-light');
        } else {
          root.classList.add(`theme-${theme}`);
        }
      },
    }),
    {
      name: 'theme-storage', // Local storage key
    }
  )
);