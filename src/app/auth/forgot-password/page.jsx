'use client';

import { useState } from 'react';

import AuthButton from '../components/Button/AuthButton';
import InputField from '../components/Input/InputField';
import { ToastProvider, useToast } from '../components/Toast/ToastProvider';
import { AuthContainer, AuthForm, AuthLink, AuthTitle, ErrorMessage } from '../styles/AuthStyles';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate password reset request
      console.log('Password reset requested for:', email);
      addToast('Password reset email sent. Please check your inbox.', 'success');
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>Forgot Password</AuthTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AuthForm onSubmit={handleSubmit}>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <AuthButton type="submit">Send Reset Link</AuthButton>
        <AuthLink href="/auth/login">Back to Login</AuthLink>
      </AuthForm>
    </AuthContainer>
  );
}

export default function ForgotPasswordPage() {
  return (
    <ToastProvider>
      <ForgotPasswordForm />
    </ToastProvider>
  );
}
