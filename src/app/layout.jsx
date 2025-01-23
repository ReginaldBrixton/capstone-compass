import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Student Portal',
  description: 'A comprehensive student management system',
  applicationName: 'Next.js PWA Template',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Next.js PWA Template',
  },
  formatDetection: {
    telephone: false,
  },
  mobileWebApp: true,
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#111827',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased dark:bg-gray-900 dark:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
