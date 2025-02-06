'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/modal.module.css';
const Modal = ({ isOpen, onClose, title, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  const handleClose = () => {
    setIsMounted(false);
    setTimeout(onClose, 300); // Match transition duration
  };
  const handleOutsideClick = (e) => {
    // Check if the click is outside the modal content
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Add click event listener when modal is open
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);
  if (!isOpen && !isMounted) return null;
  return (
    <div
      className={`${styles.modalOverlay} ${isMounted ? styles.open : ''} schedule-modal-overlay`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      id="schedule-modal-overlay"
      data-oid="dsq:te5"
    >
      <div
        ref={modalRef}
        className={`${styles.modalContent} ${isMounted ? styles.open : ''} schedule-modal-content`}
        id="schedule-modal-content"
        data-oid="pi:cinu"
      >
        <div
          className={`${styles.modalHeader} schedule-modal-header`}
          id="schedule-modal-header"
          data-oid="301gcnd"
        >
          <h2
            className={`${styles.modalTitle} schedule-modal-title`}
            id="modal-title"
            data-oid="dakbvng"
          >
            {title}
          </h2>
          <button
            className={`${styles.closeBtn} schedule-modal-close`}
            onClick={handleClose}
            aria-label="Close modal"
            id="schedule-modal-close"
            data-oid="w21oe4-"
          >
            ×
          </button>
        </div>
        <div
          className={`${styles.modalBody} schedule-modal-body`}
          id="schedule-modal-body"
          data-oid="afgxpvz"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
