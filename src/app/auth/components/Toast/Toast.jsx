'use client';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import styles from './Toast.module.scss';
const ANIMATION_DURATION = 300;
const ToastIcon = memo(({ type }) => {
  const icons = {
    success: <CheckCircle className={styles.toastIcon} size={20} data-oid="73rtdzq" />,
    error: <XCircle className={styles.toastIcon} size={20} data-oid="r5wsf68" />,
    info: <Info className={styles.toastIcon} size={20} data-oid="nduq9qk" />,
    warning: <AlertTriangle className={styles.toastIcon} size={20} data-oid="n3:7l--" />,
  };
  return icons[type] || icons.info;
});
ToastIcon.displayName = 'ToastIcon';
ToastIcon.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
};
const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const progressRef = useRef(null);
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, ANIMATION_DURATION);
  }, [onClose]);
  useEffect(() => {
    if (duration && progressRef.current) {
      // Store ref value in a variable to avoid closure issues
      const progressElement = progressRef.current;
      progressElement.addEventListener('animationend', handleClose);
      return () => {
        // Use stored variable in cleanup
        progressElement.removeEventListener('animationend', handleClose);
      };
    }
  }, [duration, handleClose]);
  if (!shouldRender) return null;
  const toastClasses = [styles.toast, styles[type], isExiting ? styles.exit : '']
    .filter(Boolean)
    .join(' ');
  return (
    <div className={toastClasses} role="alert" aria-live="polite" data-oid="aqlpvk6">
      <div className={styles.toastContent} data-oid="rhe8f7r">
        <ToastIcon type={type} data-oid="zjdoko4" />
        <span data-oid="w2gk8.x">{message}</span>
      </div>
      <button
        onClick={handleClose}
        className={styles.toastClose}
        aria-label="Close notification"
        type="button"
        data-oid="rg682_o"
      >
        <X size={16} data-oid="_5zeo51" />
      </button>
      <div
        ref={progressRef}
        className={styles.toastProgress}
        style={{
          animationDuration: `${duration}ms`,
        }}
        data-oid="1zul3w4"
      />
    </div>
  );
};
Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};
Toast.displayName = 'Toast';
export default Toast;
