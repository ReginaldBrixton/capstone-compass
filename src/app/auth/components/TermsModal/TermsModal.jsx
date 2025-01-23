import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0.75rem;
  animation: fadeIn 0.3s ease-out;
  transition: opacity 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.7);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 550px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: slideUp 0.3s ease-out;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 3px;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(17, 24, 39, 0.95);
    border-color: rgba(255, 255, 255, 0.05);
    scrollbar-color: #4b5563 transparent;

    &::-webkit-scrollbar-thumb {
      background-color: #4b5563;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #1a365d 0%, #2563eb 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
  }

  h3 {
    font-size: 1rem;
    margin: 1.5rem 0 0.75rem;
    color: #1a365d;

    @media (prefers-color-scheme: dark) {
      color: #e5e7eb;
    }
  }

  p {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
    line-height: 1.6;
    color: #4b5563;

    @media (prefers-color-scheme: dark) {
      color: #9ca3af;
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    border-top-color: #374151;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px #2563eb;
  }
`;

const DeclineButton = styled(Button)`
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #6b7280;

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #4b5563;
    color: #9ca3af;

    &:hover {
      background: rgba(75, 85, 99, 0.2);
    }
  }
`;

const AcceptButton = styled(Button)`
  background: #2563eb;
  border: none;
  color: white;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #6b7280;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #374151;
  }

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #e5e7eb;
    }
  }
`;

const TermsModal = dynamic(
  () =>
    Promise.resolve(({ isOpen, onClose, onAccept }) => {
      const [mounted, setMounted] = useState(false);

      useEffect(() => {
        setMounted(true);

        const handleEscape = (e) => {
          if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
          document.addEventListener('keydown', handleEscape);
          document.body.style.overflow = 'hidden';
        }

        return () => {
          document.removeEventListener('keydown', handleEscape);
          document.body.style.overflow = 'unset';
        };
      }, [isOpen, onClose]);

      if (!mounted || !isOpen) return null;

      return (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
          <ModalContent>
            <CloseButton onClick={onClose} aria-label="Close modal">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </CloseButton>
            <h2>Terms and Conditions</h2>
            <div>
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using this service, you accept and agree to be bound by the terms
                and provision of this agreement.
              </p>

              <h3>2. User Account</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account and
                password. You agree to accept responsibility for all activities that occur under
                your account.
              </p>

              <h3>3. Privacy Policy</h3>
              <p>
                Your use of the service is also governed by our Privacy Policy. Please review our
                Privacy Policy to understand our practices.
              </p>

              <h3>4. Service Modifications</h3>
              <p>
                We reserve the right to modify or discontinue the service with or without notice to
                you.
              </p>

              <h3>5. Governing Law</h3>
              <p>
                These terms shall be governed by and construed in accordance with the laws of your
                jurisdiction.
              </p>
            </div>

            <ModalActions>
              <DeclineButton onClick={onClose}>Decline</DeclineButton>
              <AcceptButton
                onClick={() => {
                  onAccept();
                  onClose();
                }}
              >
                Accept
              </AcceptButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      );
    }),
  { ssr: false }
);

export default TermsModal;
