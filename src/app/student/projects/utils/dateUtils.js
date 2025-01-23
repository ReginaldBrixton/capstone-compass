'use client';

export const formatDate = (date) => {
  if (!date) return '';

  // Create a stable date format that will be consistent between server and client
  const d = new Date(date);

  // Use UTC methods to ensure consistency
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();

  return `${month}/${day}/${year}`;
};

export const formatTime = (date) => {
  if (!date) return '';

  const d = new Date(date);

  // Use UTC methods for consistency
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return `${formatDate(date)} ${formatTime(date)}`;
};
