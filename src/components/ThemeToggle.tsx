import React, { useState, useCallback } from 'react';
import { Sun, Moon, Coffee, Snowflake, Droplet } from 'lucide-react';
import { useTheme, type Theme } from '../lib/theme';

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { value: 'sepia', label: 'Sepia', icon: <Coffee className="w-4 h-4" /> },
  { value: 'nord', label: 'Nord', icon: <Snowflake className="w-4 h-4" /> },
  { value: 'dracula', label: 'Dracula', icon: <Droplet className="w-4 h-4" /> },
  { value: 'system', label: 'System', icon: <Moon className="w-4 h-4" /> },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
      setTimeout(() => setIsOpen(false), 100);
    },
    [setTheme]
  );

  const currentThemeIcon = themes.find((t) => t.value === theme)?.icon;

  return (
    <div className="relative bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Toggle Button */}
      <button
        className="p-2 rounded-full  text-[var(--accent)]"
        onClick={handleToggleMenu}
        aria-expanded={isOpen}
        aria-label="Toggle Theme Menu"
      >
        {currentThemeIcon}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 py-2 text-[var(--accent)] bg-[var(--card-bg)] rounded-lg shadow-xl transition-opacity duration-200"
          onMouseLeave={handleMouseLeave}
        >
          {themes.map((t) => (
            <button
              key={t.value}
              className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === t.value
                  ? 'text-[var(--text-primary)] font-semibold'
                  : 'text-[var(--accent)]'
              }`}
              onClick={() => handleThemeChange(t.value)}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
