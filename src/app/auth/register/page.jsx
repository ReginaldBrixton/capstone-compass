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
    <AuthContainer data-oid="923kogi">
      <AuthTitle data-oid="bx0.2gt">Create Account</AuthTitle>
      {error && <ErrorMessage data-oid="bc9:75n">{error}</ErrorMessage>}
      <AuthForm onSubmit={handleSubmit} data-oid="4_18qhl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
          data-oid="8z5r5w:"
        >
          <InputField
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
            autoComplete="given-name"
            disabled={isLoading}
            data-oid="o.m-wk2"
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
            data-oid="pljadzn"
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
          data-oid="q4vx0fz"
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
          data-oid="c44e4.k"
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
          data-oid="9m2_hib"
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
          data-oid="uruh5uc"
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            data-oid="ufn84kt"
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
              data-oid="_69i:ic"
            />
            <span
              style={{
                marginLeft: '0.5rem',
                fontSize: '0.875rem',
                color: '#4B5563',
              }}
              data-oid="8gakcj1"
            >
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
                data-oid="9wdvf7h"
              >
                Terms and Conditions
              </button>
            </span>
          </label>
        </div>

        <AuthButton type="submit" disabled={isLoading} data-oid="m11jy.l">
          {isLoading ? 'Creating account...' : 'Create account'}
        </AuthButton>

        <div
          style={{
            textAlign: 'center',
          }}
          data-oid="g:af5sn"
        >
          <AuthLink href="/auth/login" data-oid="jncous.">
            Already have an account? Sign in
          </AuthLink>
        </div>
      </AuthForm>

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => {
          handleAcceptTerms();
          setIsTermsModalOpen(false);
        }}
        data-oid="58g8ahp"
      />
    </AuthContainer>
  );
}
export default function RegisterPage() {
  return (
    <ToastProvider data-oid="c3jioue">
      <RegisterForm data-oid="c7l:361" />
    </ToastProvider>
  );
}
