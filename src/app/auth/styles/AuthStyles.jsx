'use client';

import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AuthLayout = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
`;

export const AuthBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8faff 0%, #f0f3ff 100%);
  z-index: -1;
  transition: background 0.3s ease;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.02) 100%);
  backdrop-filter: blur(80px);
  transition: all 0.3s ease;

  @media (prefers-color-scheme: dark) {
    background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  z-index: 1;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

export const AuthContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 1rem auto;
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  padding: 2.5rem;
  border-radius: 1.25rem;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 6px 12px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.05);

    &:hover {
      box-shadow:
        0 6px 12px rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    }
  }
`;

export const AuthTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1f2937;
  letter-spacing: -0.025em;
  transition: color 0.2s ease;

  @media (prefers-color-scheme: dark) {
    color: #f3f4f6;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(220, 38, 38, 0.1);
  border-radius: 0.5rem;
  animation: ${fadeIn} 0.3s ease;
`;

const StyledLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    color: #2563eb;
    background-color: rgba(59, 130, 246, 0.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;

    &:hover {
      color: #93c5fd;
      background-color: rgba(96, 165, 250, 0.1);
    }
  }
`;

export const AuthLink = ({ href, children, ...props }) => (
  <Link href={href} passHref legacyBehavior>
    <StyledLink {...props}>{children}</StyledLink>
  </Link>
);

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  color: #1f2937;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;

    &:hover {
      border-color: #6b7280;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

export const StyledButton = styled.button`
  padding: 0.75rem 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  transform-origin: center;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    background: #60a5fa;

    &:hover {
      background: #3b82f6;
    }
  }
`;
