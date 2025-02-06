'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardMeta, CardTitle } from '../styles';
const AnnouncementCard = ({ announcement, onClick }) => {
  const { title, author, date, content, type, attachments } = announcement;
  return (
    <Card
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      whileHover={{
        scale: 1.02,
      }}
      role="article"
      aria-label={`Announcement: ${title}`}
      data-oid="l3dxqr1"
    >
      <CardHeader data-oid="pb0o7-b">
        <CardTitle data-oid="2oez:br">{title}</CardTitle>
        <CardMeta data-oid="t1px27t">
          <span data-oid="vp_cj.l">{author}</span>
          <span data-oid="0.vmjnu">•</span>
          <span data-oid=".d_z0yf">{date}</span>
          <span
            style={{
              textTransform: 'capitalize',
              color: type === 'urgent' ? '#E53E3E' : type === 'event' ? '#38A169' : '#4299E1',
            }}
            data-oid="sm.a3_u"
          >
            {type}
          </span>
        </CardMeta>
      </CardHeader>
      <CardContent data-oid="4y4uwom">
        {content.length > 200 ? `${content.substring(0, 200)}...` : content}
      </CardContent>
      {attachments?.length > 0 && (
        <CardContent data-oid="ub-gxh3">
          {attachments.map((attachment, index) => (
            <a
              key={index}
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: '#f8fafc',
                borderRadius: '8px',
                color: '#2d3748',
                textDecoration: 'none',
                fontSize: '0.875rem',
                marginRight: '10px',
                transition: 'all 0.2s ease',
              }}
              data-oid="kgbzpz0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="1wsrqpe"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  data-oid="slv5zr:"
                />
              </svg>
              {attachment.name}
            </a>
          ))}
        </CardContent>
      )}
    </Card>
  );
};
export default AnnouncementCard;
