import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FileIcon, GitCommitIcon, MessageSquareIcon } from 'lucide-react';

/**
 * RecentActivity component displays a user's recent activity with an icon,
 * username, action, target, and timestamp.
 *
 * @param {Object} props - Component properties.
 * @param {"commit" | "file" | "comment"} props.type - Type of activity.
 * @param {string} props.username - Username of the person who performed the action.
 * @param {string} props.action - Action performed by the user.
 * @param {string} props.target - Target of the action.
 * @param {Date} props.timestamp - Timestamp of when the action occurred.
 * @returns {JSX.Element} The RecentActivity component.
 */
const RecentActivity = ({ type, username, action, target, timestamp }) => {
  const iconMap = {
    commit: <GitCommitIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />,
    file: <FileIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />,
    comment: <MessageSquareIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />,
  };

  const initials = username
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <div
      className="flex items-start gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700"
      >
        {username ? (
          <img
            src={`https://avatar.vercel.sh/${username}.png`}
            alt={username}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span
            className="text-xs font-medium text-gray-600 dark:text-gray-300"
          >
            {initials}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <p
            className="text-sm text-gray-900 dark:text-gray-100 truncate"
          >
            <span
              className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
            >
              {username}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {' '}
              {action}
            </span>
            <span
              className="font-medium hover:text-blue-600 dark:hover:text-blue-400 truncate"
            >
              {target}
            </span>
          </p>
        </div>

        <div
          className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
        >
          {iconMap[type]}
          <span>
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
