'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { Card, CardContent, CardHeader, CardMeta, CardTitle } from '../styles';

const AnnouncementCard = ({ announcement, onClick }) => {
  const { title, author, date, content, type, attachments } = announcement;

  return (
    <Card
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      role="article"
      aria-label={`Announcement: ${title}`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardMeta>
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
          <span
            style={{
              textTransform: 'capitalize',
              color: type === 'urgent' ? '#E53E3E' : type === 'event' ? '#38A169' : '#4299E1',
            }}
          >
            {type}
          </span>
        </CardMeta>
      </CardHeader>
      <CardContent>
        {content.length > 200 ? `${content.substring(0, 200)}...` : content}
      </CardContent>
      {attachments?.length > 0 && (
        <CardContent>
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
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
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
