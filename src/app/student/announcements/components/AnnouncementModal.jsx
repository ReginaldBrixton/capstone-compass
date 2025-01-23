'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { CardContent, CardMeta, CardTitle, ModalContent, ModalOverlay } from '../styles';

const AnnouncementModal = ({ announcement, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!announcement) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <CardTitle id="modal-title">{announcement.title}</CardTitle>
          <CardMeta style={{ marginTop: '8px', marginBottom: '24px' }}>
            <span>{announcement.author}</span>
            <span>•</span>
            <span>{announcement.date}</span>
            <span
              style={{
                textTransform: 'capitalize',
                color:
                  announcement.type === 'urgent'
                    ? '#E53E3E'
                    : announcement.type === 'event'
                      ? '#38A169'
                      : '#4299E1',
              }}
            >
              {announcement.type}
            </span>
          </CardMeta>

          <CardContent style={{ whiteSpace: 'pre-wrap' }}>{announcement.content}</CardContent>

          {announcement.attachments?.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '16px' }}>Attachments</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {announcement.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 16px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      color: '#2d3748',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <polyline points="13 2 13 9 20 9" />
                    </svg>
                    {attachment.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default AnnouncementModal;
