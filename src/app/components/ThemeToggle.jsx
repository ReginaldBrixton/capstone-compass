'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative h-6 w-12 rounded-full bg-gray-200 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-700"
        aria-label="Toggle theme"
      >
        <div className="absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white transition-transform duration-300" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative h-6 w-12 rounded-full bg-gray-200 transition-colors duration-300 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <div
        className={`absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'} `}
      >
        {theme === 'dark' ? (
          <svg
            className="h-3 w-3 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            className="h-3 w-3 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
