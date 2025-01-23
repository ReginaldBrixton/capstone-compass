'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from './styles/theme';

export default function FinalDefenseLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
