'use client';

import React from 'react';
import { motion } from 'framer-motion';

const generateUniqueId = (prefix) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

export function Card({ children, className = '', hover = false, ...props }) {
  const uniqueId = generateUniqueId('card');
  return (
    <motion.div
      id={uniqueId}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm 
        hover:shadow-lg border border-gray-100 dark:border-gray-700/50 
        transition-all duration-300 ease-out ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  disabled = false,
  icon,
  ...props 
}) {
  const baseStyles = `inline-flex items-center justify-center gap-2 rounded-lg font-medium 
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]`;
  
  const variants = {
    primary: `bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 
      shadow-sm hover:shadow disabled:hover:bg-primary-600`,
    secondary: `bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 
      dark:hover:bg-gray-700 dark:text-gray-100 focus:ring-gray-500`,
    outline: `border-2 border-primary-600 text-primary-600 hover:bg-primary-50 
      dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20 
      focus:ring-primary-500`,
    ghost: `text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 
      focus:ring-gray-500`,
    danger: `bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 
      shadow-sm hover:shadow`,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {icon && <span className="w-5 h-5">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
}

export function Progress({ value, max = 100, className, id, label }) {
  const uniqueId = id || generateUniqueId('progress');
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <span className="text-gray-500 dark:text-gray-400">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div
        id={uniqueId}
        className={`custom-progress relative w-full bg-gray-200 dark:bg-gray-700 
          rounded-full h-2.5 overflow-hidden ${className || ''}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
        data-component="progress"
      >
        <div
          className="progress-bar absolute top-0 left-0 h-full rounded-full 
            bg-gradient-to-r from-primary-500 to-primary-600 
            transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          data-value={value}
        />
      </div>
    </div>
  );
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  dot = false
}) {
  const variants = {
    default: `bg-gray-100 text-gray-800 ring-gray-500/10 
      dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-400/20`,
    success: `bg-green-100 text-green-800 ring-green-500/10 
      dark:bg-green-900/30 dark:text-green-400 dark:ring-green-400/20`,
    warning: `bg-yellow-100 text-yellow-800 ring-yellow-500/10 
      dark:bg-yellow-900/30 dark:text-yellow-400 dark:ring-yellow-400/20`,
    danger: `bg-red-100 text-red-800 ring-red-500/10 
      dark:bg-red-900/30 dark:text-red-400 dark:ring-red-400/20`,
    info: `bg-blue-100 text-blue-800 ring-blue-500/10 
      dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/20`,
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full ring-1 
        transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'default' ? 'bg-gray-500 dark:bg-gray-400' :
          variant === 'success' ? 'bg-green-500 dark:bg-green-400' :
          variant === 'warning' ? 'bg-yellow-500 dark:bg-yellow-400' :
          variant === 'danger' ? 'bg-red-500 dark:bg-red-400' :
          'bg-blue-500 dark:bg-blue-400'
        }`} />
      )}
      {children}
    </span>
  );
}

export function Input({
  label,
  error,
  className = '',
  id,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
