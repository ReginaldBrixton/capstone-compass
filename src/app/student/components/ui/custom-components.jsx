'use client';

import React from 'react';
import { motion } from 'framer-motion';
const generateUniqueId = (prefix) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

export function Card({ children, className = '', hover = false, ...props }) {
  const uniqueId = generateUniqueId('card');
  return (
    <motion.div
      id={uniqueId}
      whileHover={
        hover
          ? {
              y: -4,
              scale: 1.01,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
            }
          : {}
      }
      className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
        hover:shadow-md dark:border-gray-700 dark:bg-gray-800/95 dark:hover:border-gray-600 ${className}`}
      {...props}
      data-oid="vqgwvw2"
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
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 
    disabled:cursor-not-allowed active:scale-[0.98] dark:focus:ring-offset-gray-900`;
  
  const variants = {
    primary: `bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500/70 
      shadow-sm dark:bg-primary-700 dark:hover:bg-primary-600 dark:focus:ring-primary-400/50`,
    secondary: `bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-300 
      dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:focus:ring-gray-500/30`,
    outline: `border-2 border-primary-500 text-primary-600 hover:bg-primary-50/50 
      dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900/30 dark:focus:ring-primary-500/30`,
    ghost: `text-gray-700 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-gray-700/30 
      focus:ring-gray-300/30 dark:focus:ring-gray-500/30`,
    danger: `bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/70 
      dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-400/50`
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
      data-oid="2_2jxr0"
    >
      {isLoading ? (
        <div className="flex items-center gap-2" data-oid="fx8va:u">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {icon && <span className="h-5 w-5">{icon}</span>}
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
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-700 dark:text-gray-200">{label}</span>
          <span className="text-gray-500 dark:text-gray-400">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div
        id={uniqueId}
        className={`relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 ${className}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 
            transition-all duration-300 ease-out dark:from-primary-400 dark:to-primary-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function Badge({ children, variant = 'default', size = 'md', className = '', dot = false }) {
  const variants = {
    default: `bg-gray-100 text-gray-800 ring-gray-500/20 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-500/30`,
    success: `bg-green-100 text-green-800 ring-green-500/20 dark:bg-green-800/30 dark:text-green-300 dark:ring-green-500/30`,
    warning: `bg-yellow-100 text-yellow-800 ring-yellow-500/20 dark:bg-yellow-800/30 dark:text-yellow-300 dark:ring-yellow-500/30`,
    danger: `bg-red-100 text-red-800 ring-red-500/20 dark:bg-red-800/30 dark:text-red-300 dark:ring-red-500/30`,
    info: `bg-blue-100 text-blue-800 ring-blue-500/20 dark:bg-blue-800/30 dark:text-blue-300 dark:ring-blue-500/30`
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset transition-all ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span
          className={`h-2 w-2 rounded-full ${
            variant === 'default' ? 'bg-gray-500 dark:bg-gray-300' :
            variant === 'success' ? 'bg-green-500 dark:bg-green-300' :
            variant === 'warning' ? 'bg-yellow-500 dark:bg-yellow-300' :
            variant === 'danger' ? 'bg-red-500 dark:bg-red-300' : 'bg-blue-500 dark:bg-blue-300'
          }`}
        />
      )}
      {children}
    </span>
  );
}

export function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 
          transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 
          dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 
          dark:focus:border-primary-400 dark:focus:ring-primary-400/30 ${error ? 'border-red-500 focus:ring-red-500/30 dark:border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
