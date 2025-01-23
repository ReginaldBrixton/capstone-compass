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
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased min-h-screen font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
