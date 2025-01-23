import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const dialogVariants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
    y: 20,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.4,
      bounce: 0.3,
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const buttonVariants = {
  danger:
    'bg-red-500 hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700',
  warning:
    'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700',
  success:
    'bg-green-500 hover:bg-green-600 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700',
  secondary:
    'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100',
  default:
    'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700',
};

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  icon,
  variant = 'danger',
  className = '',
}) => {
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') onConfirm();
    },
    [onClose, onConfirm]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm dark:bg-black/80 md:p-8"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        id="confirm-dialog-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <motion.div
          className={`w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800 md:p-8 ${className}`}
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          id="confirm-dialog-container"
        >
          <h2
            className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white"
            id="dialog-title"
          >
            {icon && (
              <span className="text-3xl" role="img" aria-hidden="true">
                {icon}
              </span>
            )}
            {title}
          </h2>

          <p className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {message}
          </p>

          <div className="flex flex-col justify-end gap-3 sm:flex-row">
            <button
              className={`rounded-xl px-6 py-2.5 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-0 dark:focus:ring-offset-gray-800 ${buttonVariants.secondary} `}
              onClick={onClose}
              id="confirm-dialog-cancel"
            >
              {cancelText}
            </button>
            <button
              className={`rounded-xl px-6 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-0 dark:focus:ring-offset-gray-800 ${buttonVariants[variant] || buttonVariants.default} `}
              onClick={onConfirm}
              id="confirm-dialog-confirm"
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;
