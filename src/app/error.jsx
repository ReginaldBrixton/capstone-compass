'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2.5rem;
  max-width: 36rem;
  width: 100%;
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${shake} 0.5s ease-in-out;
`;

const IconBackground = styled.div`
  background: linear-gradient(135deg, #fecaca 0%, #fee2e2 100%);
  border-radius: 9999px;
  padding: 1rem;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
  animation: ${pulse} 2s infinite;
`;

const Title = styled.h1`
  margin-top: 1.5rem;
  font-size: 1.875rem;
  font-weight: 800;
  text-align: center;
  color: #1f2937;
  background: linear-gradient(to right, #1f2937, #4b5563);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ErrorMessage = styled.div`
  margin-top: 1.5rem;
  background: rgba(249, 250, 251, 0.8);
  border-radius: 0.5rem;
  padding: 1.25rem;
  border: 1px solid rgba(209, 213, 219, 0.5);

  p {
    color: #4b5563;
    word-break: break-word;
    line-height: 1.6;
    font-size: 1rem;
  }
`;

const StackTraceToggle = styled.button`
  background: none;
  border: none;
  color: #4b5563;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 0.25rem;
  }
`;

const StackTraceContent = styled.div`
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid #e5e7eb;
  font-family: monospace;
  font-size: 0.875rem;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  max-height: ${(props) => (props.$isVisible ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1.5rem;
  }
`;

const TryAgainButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -1px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CopyButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #374151;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const SupportText = styled.p`
  margin-top: 2rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.9375rem;
  line-height: 1.5;
  font-weight: 500;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`;

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error:', {
      message: error?.message,
      stack: error?.stack,
      cause: error?.cause,
      name: error?.name,
      fileName: error?.fileName,
      lineNumber: error?.lineNumber,
      columnNumber: error?.columnNumber,
    });
  }, [error]);

  const [copied, setCopied] = useState(false);
  const [showStackTrace, setShowStackTrace] = useState(false);

  const copyErrorToClipboard = async () => {
    try {
      const errorDetails = `
Error: ${error?.message || error?.toString()}
Location: ${error?.fileName || 'Unknown file'}:${error?.lineNumber || '?'}:${error?.columnNumber || '?'}
Stack trace:
${error?.stack || 'No stack trace available'}
            `.trim();

      await navigator.clipboard.writeText(errorDetails);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy error:', err);
    }
  };

  return (
    <Container>
      <Card>
        <IconWrapper>
          <IconBackground>
            <svg width="40" height="40" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </IconBackground>
        </IconWrapper>

        <Title>Oops! Something went wrong</Title>

        <ErrorMessage>
          <p>
            <strong>Error:</strong> {error?.message || error?.toString()}
            {error?.fileName && (
              <>
                <br />
                <strong>File:</strong> {error.fileName}
              </>
            )}
            {error?.lineNumber && (
              <>
                <br />
                <strong>Line:</strong> {error.lineNumber}
              </>
            )}
            {error?.stack && (
              <>
                <br />
                <br />
                <StackTraceToggle onClick={() => setShowStackTrace(!showStackTrace)}>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{
                      transform: showStackTrace ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Stack Trace
                </StackTraceToggle>
                <StackTraceContent $isVisible={showStackTrace}>
                  {error.stack.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </StackTraceContent>
              </>
            )}
          </p>
        </ErrorMessage>

        <ButtonGroup>
          <TryAgainButton onClick={() => reset()}>Try Again</TryAgainButton>

          <CopyButton onClick={copyErrorToClipboard}>
            {copied ? (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Copy Full Error Details
              </>
            )}
          </CopyButton>
        </ButtonGroup>

        <SupportText>If this problem persists, please contact our support team</SupportText>
      </Card>
    </Container>
  );
}
