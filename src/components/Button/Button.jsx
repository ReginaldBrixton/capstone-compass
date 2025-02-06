'use client';

import React from 'react';
import PropTypes from 'prop-types';
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
  };
  const buttonClasses = `
    button-${variant}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    inline-flex
    items-center
    justify-center
    font-medium
    rounded-md
    shadow-sm
    transition-colors
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;
  return (
    <button className={buttonClasses} disabled={disabled} {...props} data-oid="5k93qg6">
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
export default Button;
