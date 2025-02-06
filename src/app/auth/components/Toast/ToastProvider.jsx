'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import Toast from './Toast';
import styles from './Toast.module.scss';
const ToastContext = createContext(null);
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        type,
        duration,
      },
    ]);
  }, []);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
      data-oid="hkqkb54"
    >
      {children}
      <div className={styles.toastContainer} data-oid="a46-npi">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
            data-oid="9mt-lzi"
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
