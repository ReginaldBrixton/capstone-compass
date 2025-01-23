'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthButton from '../components/Button/AuthButton';
import InputField from '../components/Input/InputField';
import TermsModal from '../components/TermsModal';
import { ToastProvider, useToast } from '../components/Toast/ToastProvider';
import { AuthContainer, AuthForm, AuthLink, AuthTitle, ErrorMessage } from '../styles/AuthStyles';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../utils/validation';

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
  };

  const handleAcceptTerms = () => {
    setFormData((prev) => ({
      ...prev,
      acceptTerms: true,
    }));
  };

  const validateForm = () => {
    const firstNameError = validateName(formData.firstName);
    if (firstNameError) {
      setError(firstNameError);
      return false;
    }

    const lastNameError = validateName(formData.lastName);
    if (lastNameError) {
      setError(lastNameError);
      return false;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setError(emailError);
      return false;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return false;
    }

    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmPasswordError) {
      setError(confirmPasswordError);
      return false;
    }

    if (!formData.acceptTerms) {
      setError('You must accept the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulated registration
      console.log('Registration attempt:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addToast(
        'Registration successful! Please check your email to verify your account.',
        'success'
      );
      router.push('/auth/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>Create Account</AuthTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AuthForm onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <InputField
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
            autoComplete="given-name"
            disabled={isLoading}
          />
          <InputField
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
            autoComplete="family-name"
            disabled={isLoading}
          />
        </div>

        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          required
          autoComplete="email"
          disabled={isLoading}
        />

        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          autoComplete="new-password"
          disabled={isLoading}
        />

        <InputField
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          required
          autoComplete="new-password"
          disabled={isLoading}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              style={{
                width: '1rem',
                height: '1rem',
                borderColor: '#D1D5DB',
                borderRadius: '0.25rem',
              }}
              disabled={isLoading}
            />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#4B5563' }}>
              I accept the{' '}
              <button
                onClick={handleTermsClick}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#2563EB',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  font: 'inherit',
                }}
              >
                Terms and Conditions
              </button>
            </span>
          </label>
        </div>

        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </AuthButton>

        <div style={{ textAlign: 'center' }}>
          <AuthLink href="/auth/login">Already have an account? Sign in</AuthLink>
        </div>
      </AuthForm>

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => {
          handleAcceptTerms();
          setIsTermsModalOpen(false);
        }}
      />
    </AuthContainer>
  );
}

export default function RegisterPage() {
  return (
    <ToastProvider>
      <RegisterForm />
    </ToastProvider>
  );
}
