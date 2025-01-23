'use client';

import React from 'react';

import { ToastProvider } from './components/Toast/ToastProvider';
import { AuthBackground, AuthLayout, GradientOverlay, MainContent } from './styles/AuthStyles';

export default function AuthPageLayout({ children }) {
  return (
    <ToastProvider>
      <AuthLayout>
        <AuthBackground>
          <GradientOverlay />
        </AuthBackground>
        <MainContent>{children}</MainContent>
      </AuthLayout>
    </ToastProvider>
  );
}
