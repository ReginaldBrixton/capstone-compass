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
    <AnimatePresence data-oid="noee.sh">
      <ModalOverlay
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-oid="c3hhvr-"
      >
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
          }}
          data-oid="wr.58zo"
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
            data-oid="88vuu3f"
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
              data-oid="b.zuv6z"
            >
              <line x1="18" y1="6" x2="6" y2="18" data-oid="j_0pmvm" />
              <line x1="6" y1="6" x2="18" y2="18" data-oid="j8eb6:g" />
            </svg>
          </button>

          <CardTitle id="modal-title" data-oid="bb4g.l8">
            {announcement.title}
          </CardTitle>
          <CardMeta
            style={{
              marginTop: '8px',
              marginBottom: '24px',
            }}
            data-oid="d0o6xgq"
          >
            <span data-oid="vgh:mat">{announcement.author}</span>
            <span data-oid="z_f9ayr">•</span>
            <span data-oid="taiar_w">{announcement.date}</span>
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
              data-oid="a0rwd7y"
            >
              {announcement.type}
            </span>
          </CardMeta>

          <CardContent
            style={{
              whiteSpace: 'pre-wrap',
            }}
            data-oid="6vywyd3"
          >
            {announcement.content}
          </CardContent>

          {announcement.attachments?.length > 0 && (
            <div
              style={{
                marginTop: '24px',
              }}
              data-oid=":gk4:jc"
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  marginBottom: '16px',
                }}
                data-oid="u-90v1d"
              >
                Attachments
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
                data-oid="1a7l-3z"
              >
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
                    data-oid="i5l:2qo"
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
                      data-oid="..wef5w"
                    >
                      <path
                        d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                        data-oid="-_zyss-"
                      />
                      <polyline points="13 2 13 9 20 9" data-oid="hbcsyw9" />
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
