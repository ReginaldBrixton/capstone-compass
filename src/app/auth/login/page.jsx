'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthButton from '../components/Button/AuthButton';
import InputField from '../components/Input/InputField';
import { ToastProvider, useToast } from '../components/Toast/ToastProvider';
import {
  AuthContainer,
  AuthForm,
  AuthLink,
  AuthTitle,
  ErrorMessage,
} from '../styles/AuthStyles';
import { validateEmail } from '../utils/validation';

const RememberMeCheckbox = ({ checked, onChange, disabled }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.2rem',
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
        name="rememberMe"
        checked={checked}
        onChange={onChange}
        style={{
          width: '1rem',
          height: '1rem',
          borderColor: '#D1D5DB',
          borderRadius: '0.25rem',
        }}
        disabled={disabled}
      />
      <span
        style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#4B5563' }}
      >
        Remember me
      </span>
    </label>
  </div>
);

const AuthLinks = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '0.2rem',
      padding: '1rem 0',
      borderTop: '1px solid #E5E7EB',
    }}
  >
    <AuthLink
      href="/auth/forgot-password"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: '#6B7280',
        transition: 'all 0.2s ease',
        ':hover': {
          color: '#4B5563',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
      Forgot password?
    </AuthLink>
    <AuthLink
      href="/auth/register"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: '#2563EB',
        transition: 'all 0.2s ease',
        ':hover': {
          color: '#1D4ED8',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <line x1="20" y1="8" x2="20" y2="14"></line>
        <line x1="23" y1="11" x2="17" y2="11"></line>
      </svg>
      Create account
    </AuthLink>
  </div>
);

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);

    try {
      // Simulated login
      console.log('Login attempt with:', {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      addToast('Login successful!', 'success');
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>Welcome Back</AuthTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AuthForm onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          disabled={isLoading}
        />

        <RememberMeCheckbox
          checked={formData.rememberMe}
          onChange={handleChange}
          disabled={isLoading}
        />

        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </AuthButton>

        <AuthLinks />
      </AuthForm>
    </AuthContainer>
  );
};

const LoginPage = () => {
  return (
    <ToastProvider>
      <LoginForm />
    </ToastProvider>
  );
};

export default LoginPage;
