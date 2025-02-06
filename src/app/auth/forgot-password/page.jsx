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
    <AuthContainer data-oid="60no_h6">
      <AuthTitle data-oid="qw72p-1">Forgot Password</AuthTitle>
      {error && <ErrorMessage data-oid="i:mq4jw">{error}</ErrorMessage>}
      <AuthForm onSubmit={handleSubmit} data-oid="ihi9plt">
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          data-oid="j8kpa5h"
        />
        <AuthButton type="submit" data-oid="iysrxzy">
          Send Reset Link
        </AuthButton>
        <AuthLink href="/auth/login" data-oid="o3_mzod">
          Back to Login
        </AuthLink>
      </AuthForm>
    </AuthContainer>
  );
}
export default function ForgotPasswordPage() {
  return (
    <ToastProvider data-oid="::ua3ey">
      <ForgotPasswordForm data-oid="xgz8h81" />
    </ToastProvider>
  );
}
