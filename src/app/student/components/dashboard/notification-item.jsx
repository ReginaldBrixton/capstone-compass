import { formatDistanceToNow } from 'date-fns';
import { BellIcon, MessageSquareIcon, PackageIcon, UserIcon } from 'lucide-react';

/**
 * NotificationItem component displays a notification with improved responsive layout
 * and simplified styling for better cross-device compatibility.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.username - The username of the person.
 * @param {string} props.action - The action performed.
 * @param {string} props.target - The target of the action.
 * @param {Date} props.timestamp - The timestamp of the notification.
 * @param {"mention" | "update" | "message"} props.type - The type of notification.
 * @returns {JSX.Element} The rendered NotificationItem component.
 */
const NotificationItem = ({ username, action, target, timestamp, type }) => {
  const iconMap = {
    mention: <MessageSquareIcon className="h-4 w-4 text-blue-500" />,
    update: <PackageIcon className="h-4 w-4 text-emerald-500" />,
    message: <BellIcon className="h-4 w-4 text-violet-500" />,
  };

  return (
    <div
      className="flex flex-col sm:flex-row gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
      role="alert"
    >
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
          <UserIcon className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 min-w-0 gap-2">
        {/* Top Row with Icon and Username */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded-full bg-gray-50 dark:bg-gray-800 px-2.5 py-1">
            {iconMap[type]}
          </div>
          
          <div className="flex flex-wrap items-center gap-1 text-sm">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              @{username}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {action}
            </span>
            <span className="font-medium text-blue-500">
              {target}
            </span>
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <time dateTime={timestamp.toISOString()} suppressHydrationWarning>
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </time>
        </div>
      </div>

      {/* Type Icon */}
      <div className="flex-shrink-0 self-start sm:self-center">
        {iconMap[type]}
      </div>
    </div>
  );
};

export default NotificationItem;
