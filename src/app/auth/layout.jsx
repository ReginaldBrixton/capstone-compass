'use client';

import React from 'react';
import { ToastProvider } from './components/Toast/ToastProvider';
import { AuthBackground, AuthLayout, GradientOverlay, MainContent } from './styles/AuthStyles';
export default function AuthPageLayout({ children }) {
  return (
    <ToastProvider data-oid="o96..6t">
      <AuthLayout data-oid="sai0mv5">
        <AuthBackground data-oid=":dieo2s">
          <GradientOverlay data-oid="y9yss6g" />
        </AuthBackground>
        <MainContent data-oid=":7pd9d3">{children}</MainContent>
      </AuthLayout>
    </ToastProvider>
  );
}
