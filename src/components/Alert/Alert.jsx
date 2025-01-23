import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AlertIcon } from './AlertIcon';

const VARIANT_STYLES = {
  info: {
    base: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 shadow-sm shadow-blue-100 dark:shadow-none',
    border: 'border-2 border-blue-300 dark:border-blue-800',
    borderAccent: 'border-l-4 border-blue-500 dark:border-blue-600',
    button: {
      base: 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600 transition-colors duration-200',
      link: 'text-blue-700 dark:text-blue-400 font-medium underline decoration-2 hover:text-blue-800 hover:decoration-blue-800 dark:hover:text-blue-300 transition-all duration-200',
    },
  },
  danger: {
    base: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400 shadow-sm shadow-red-100 dark:shadow-none',
    border: 'border-2 border-red-300 dark:border-red-800',
    borderAccent: 'border-l-4 border-red-500 dark:border-red-600',
    button: {
      base: 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600 transition-colors duration-200',
      link: 'text-red-700 dark:text-red-400 font-medium underline decoration-2 hover:text-red-800 hover:decoration-red-800 dark:hover:text-red-300 transition-all duration-200',
    },
  },
  success: {
    base: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400 shadow-sm shadow-green-100 dark:shadow-none',
    border: 'border-2 border-green-300 dark:border-green-800',
    borderAccent: 'border-l-4 border-green-500 dark:border-green-600',
    button: {
      base: 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-green-400 dark:hover:bg-gray-600 transition-colors duration-200',
      link: 'text-green-700 dark:text-green-400 font-medium underline decoration-2 hover:text-green-800 hover:decoration-green-800 dark:hover:text-green-300 transition-all duration-200',
    },
  },
  warning: {
    base: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 shadow-sm shadow-yellow-100 dark:shadow-none',
    border: 'border-2 border-yellow-300 dark:border-yellow-800',
    borderAccent: 'border-l-4 border-yellow-500 dark:border-yellow-600',
    button: {
      base: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-yellow-400 dark:hover:bg-gray-600 transition-colors duration-200',
      link: 'text-yellow-700 dark:text-yellow-400 font-medium underline decoration-2 hover:text-yellow-800 hover:decoration-yellow-800 dark:hover:text-yellow-300 transition-all duration-200',
    },
  },
  dark: {
    base: 'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 shadow-sm shadow-gray-100 dark:shadow-none',
    border: 'border-2 border-gray-300 dark:border-gray-600',
    borderAccent: 'border-l-4 border-gray-500 dark:border-gray-500',
    button: {
      base: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200',
      link: 'text-gray-700 dark:text-gray-300 font-medium underline decoration-2 hover:text-gray-800 hover:decoration-gray-800 dark:hover:text-gray-200 transition-all duration-200',
    },
  },
};

const Alert = ({
  id,
  variant = 'info',
  title,
  message,
  onViewMore,
  onDismiss,
  viewMoreText = 'View more',
  dismissText = 'Dismiss',
  className = '',
  bordered = false,
  borderAccent = false,
  link,
  linkText,
  list,
  size = 'base',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = VARIANT_STYLES[variant];

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleViewMore = () => {
    setIsExpanded(!isExpanded);
    if (onViewMore) {
      onViewMore();
    }
  };

  if (!isVisible) return null;

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const getBorderClasses = () => {
    if (borderAccent) return styles.borderAccent;
    if (bordered) return `border ${styles.border}`;
    return '';
  };

  return (
    <div
      id={id}
      className={`p-4 mb-4 rounded-lg backdrop-blur-sm backdrop-filter ${styles.base} ${getBorderClasses()} ${sizeClasses[size]} ${className} transition-all duration-300 ease-in-out transform`}
      role="alert"
    >
      <div className="flex items-center">
        <AlertIcon variant={variant} className="flex-shrink-0 w-5 h-5 me-3 animate-pulse" />
        {title && (
          <>
            <span className="sr-only">{variant}</span>
            <span className="font-semibold tracking-wide">{title}</span>
          </>
        )}
      </div>

      {message && (
        <div
          className={`mt-3 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''} transition-all duration-300`}
        >
          {message}
          {link && (
            <a href={link} className={`${styles.button.link} ml-1`}>
              {linkText}
            </a>
          )}
        </div>
      )}

      {list && (
        <ul className="mt-2 space-y-1 list-disc list-inside marker:text-current">
          {list.map((item, index) => (
            <li key={index} className="transition-colors duration-200 hover:opacity-80">
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="flex mt-4 gap-2">
        {onViewMore && (
          <button
            type="button"
            onClick={handleViewMore}
            className={`${styles.button.base} rounded-md text-sm px-4 py-2 font-medium inline-flex items-center`}
          >
            <svg
              className="me-2 h-4 w-4 transition-transform duration-200"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            {isExpanded ? 'View less' : viewMoreText}
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            className={`${styles.button.base} rounded-md p-2 inline-flex items-center justify-center hover:rotate-90 transition-transform duration-200`}
            aria-label={dismissText}
          >
            <span className="sr-only">{dismissText}</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['info', 'danger', 'success', 'warning', 'dark']),
  title: PropTypes.string,
  message: PropTypes.string,
  onViewMore: PropTypes.func,
  onDismiss: PropTypes.func,
  viewMoreText: PropTypes.string,
  dismissText: PropTypes.string,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  borderAccent: PropTypes.bool,
  link: PropTypes.string,
  linkText: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(['sm', 'base', 'lg']),
};

export default Alert;
