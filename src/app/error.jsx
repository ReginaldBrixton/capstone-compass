'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'error-container',
  id: 'error-container-static',
})`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Card = styled.div.attrs({
  className: 'error-card',
  id: 'error-card-static',
})`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 2.5rem;
  max-width: 36rem;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ErrorMessage = styled.div.attrs({
  className: 'error-message',
  id: 'error-message-static',
})`
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(254, 226, 226, 0.5);
  border-radius: 0.5rem;
  color: #dc2626;
`;

const Button = styled.button.attrs({
  className: 'retry-button',
  id: 'retry-button-static',
})`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -1px rgba(59, 130, 246, 0.3);
  }
`;

export default function Error({ error, reset }) {
  useEffect(() => {
    if (error) {
      console.error('Error:', error);
    }
  }, [error]);

  const errorMessage = error?.message || 'An unexpected error occurred';

  return (
    <Container>
      <Card>
        <h1 className="mb-4 text-2xl font-bold">Something went wrong!</h1>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button
          onClick={() => {
            if (typeof reset === 'function') {
              reset();
            }
          }}
          type="button"
        >
          Try again
        </Button>
      </Card>
    </Container>
  );
}
