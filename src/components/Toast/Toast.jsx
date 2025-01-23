'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import PropTypes from 'prop-types';
import { Toaster as Sonner } from 'sonner';

import { themeConfig } from '@/app/styles/theme';

const Toast = ({ ...props }) => {
  const { theme = 'system', systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme =
    themeConfig[
      !mounted ? 'light' : theme === 'system' ? systemTheme || 'light' : theme
    ];

  if (!mounted) {
    return null; // Don't render anything during SSR
  }

  return (
    <Sonner
      theme={theme}
      className="toast-wrapper group"
      toastOptions={{
        classNames: {
          toast: `
            group toast
            group-[.toast-wrapper]:${currentTheme.background}
            group-[.toast-wrapper]:${currentTheme.text}
            group-[.toast-wrapper]:${currentTheme.border}
            group-[.toast-wrapper]:shadow-lg
            dark:group-[.toast-wrapper]:border-gray-800
          `,
          description: `
            group-[.toast]:text-gray-600
            dark:group-[.toast]:text-gray-300
          `,
          actionButton: `
            group-[.toast]:${currentTheme.primary.background}
            group-[.toast]:${currentTheme.primary.text}
            group-[.toast]:${currentTheme.primary.hover}
          `,
          cancelButton: `
            group-[.toast]:${currentTheme.secondary.background}
            group-[.toast]:${currentTheme.secondary.text}
            group-[.toast]:${currentTheme.secondary.hover}
          `,
          success: `
            group-[.toast]:${currentTheme.success.background}
            group-[.toast]:${currentTheme.success.text}
          `,
          error: `
            group-[.toast]:${currentTheme.error.background}
            group-[.toast]:${currentTheme.error.text}
          `,
          warning: `
            group-[.toast]:${currentTheme.warning.background}
            group-[.toast]:${currentTheme.warning.text}
          `,
        },
      }}
      {...props}
    />
  );
};

Toast.propTypes = {
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'top-center',
    'bottom-center',
  ]),
  expand: PropTypes.bool,
  duration: PropTypes.number,
  visibleToasts: PropTypes.number,
  closeButton: PropTypes.bool,
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Toast;
