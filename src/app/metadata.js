export const metadata = {
  title: 'Next.js PWA Template',
  description: 'A powerful Next.js PWA template',
  manifest: '/manifest.json',
  icons: {
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};
