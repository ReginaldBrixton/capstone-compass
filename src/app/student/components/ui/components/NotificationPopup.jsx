'use client';

import React, { useEffect, useState } from 'react';

export function NotificationPopup({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const notificationStyles = {
    success: 'border-l-4 border-green-500',
    error: 'border-l-4 border-red-500',
    warning: 'border-l-4 border-yellow-500',
    info: 'border-l-4 border-blue-500',
  };

  return (
    <div
      id="notification-popup"
      className={`notification-popup fixed right-5 top-5 z-50 flex w-[clamp(280px,90vw,400px)] items-center justify-between rounded-lg bg-white p-4 shadow-lg ${notificationStyles[type]} ${
        isExiting ? 'animate-slide-out' : 'animate-slide-in'
      } sm:bottom-5 sm:right-1/2 sm:translate-x-1/2 md:right-5 md:top-5 md:transform-none`}
      role="alert"
      aria-live="polite"
    >
      <div
        id="notification-content"
        className="notification-content flex items-center gap-3 text-[0.95rem]"
      >
        <span id="notification-icon" className="text-xl">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </span>
        <span id="notification-message" className="notification-message">
          {message}
        </span>
      </div>
      <button
        id="notification-close"
        className="notification-close-btn cursor-pointer border-none bg-transparent p-0 text-2xl text-gray-500 transition-colors duration-200 hover:text-gray-700"
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            onClose?.();
          }, 300);
        }}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
