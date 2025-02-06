'use client';

import { safeFormat } from '../utils/date-format';
export function NotificationItem({ timestamp, username }) {
  const { iso, formatted } = safeFormat(timestamp);
  return (
    <div className="group relative" role="alert" id="notification-item" data-oid=".43f0xe">
      <time
        dateTime={iso}
        className="flex items-center space-x-1"
        id="notification-timestamp"
        suppressHydrationWarning
        data-oid="9iqs.9q"
      >
        {formatted}
      </time>
    </div>
  );
}
