'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
export function Providers({ children }) {
  return (
    <SessionProvider data-oid="2qezb0x">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem data-oid="u2g_xvb">
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
