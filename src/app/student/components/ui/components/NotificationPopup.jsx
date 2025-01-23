'use client';

import React, { useEffect, useState } from 'react';

export function NotificationPopup({ message, type = 'info', duration = 3000, onClose }) {
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
    info: 'border-l-4 border-blue-500'
  };

  return (
    <div
      id="notification-popup"
      className={`notification-popup fixed top-5 right-5 w-[clamp(280px,90vw,400px)] p-4 rounded-lg bg-white shadow-lg flex items-center justify-between z-50 ${notificationStyles[type]} ${
        isExiting ? 'animate-slide-out' : 'animate-slide-in'
      } md:top-5 md:right-5 md:transform-none sm:bottom-5 sm:right-1/2 sm:translate-x-1/2`}
      role="alert"
      aria-live="polite"
    >
      <div id="notification-content" className="notification-content flex items-center gap-3 text-[0.95rem]">
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
        className="notification-close-btn bg-transparent border-none text-2xl cursor-pointer p-0 text-gray-500 hover:text-gray-700 transition-colors duration-200"
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
