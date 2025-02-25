import { formatDistanceToNow } from 'date-fns';
import { BellIcon, MessageSquareIcon, PackageIcon, UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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
 * @param {boolean} [props.isRead=false] - Whether the notification has been read.
 * @returns {JSX.Element} The rendered NotificationItem component.
 */
const NotificationItem = ({ 
  username, 
  action, 
  target, 
  timestamp, 
  type,
  isRead = false 
}) => {
  const iconMap = {
    mention: <MessageSquareIcon className="h-3 w-3 xs:h-4 xs:w-4 text-blue-500" />,
    update: <PackageIcon className="h-3 w-3 xs:h-4 xs:w-4 text-emerald-500" />,
    message: <BellIcon className="h-3 w-3 xs:h-4 xs:w-4 text-violet-500" />,
  };

  const avatarUrl = `https://avatar.vercel.sh/${username}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 p-2.5 xs:p-3 rounded-lg border ${
        isRead 
          ? 'border-gray-100 dark:border-gray-800' 
          : 'border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10'
      } bg-white dark:bg-gray-900 w-full transition-all duration-200 hover:shadow-sm`}
      role="alert"
    >
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <div className="relative h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9">
          <img
            src={avatarUrl}
            alt={username}
            className="h-full w-full rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
          {!isRead && (
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-blue-500 border border-white dark:border-gray-900"></span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Message content */}
        <div className="flex items-start gap-1.5 text-xs xs:text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {username}
          </span>
          <span className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {action} <span className="font-medium text-blue-600 dark:text-blue-400">{target}</span>
          </span>
        </div>

        {/* Bottom row with icon and timestamp */}
        <div className="mt-1 flex items-center gap-1.5">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            {iconMap[type]}
          </span>
          <time 
            dateTime={timestamp.toISOString()} 
            className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400"
            suppressHydrationWarning
          >
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </time>
        </div>
      </div>

      {/* Action button - only visible on hover/mobile tap */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex-shrink-0 h-6 w-6 xs:h-7 xs:w-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={isRead ? "Mark as unread" : "Mark as read"}
      >
        <span className="sr-only">{isRead ? "Mark as unread" : "Mark as read"}</span>
        <div className={`h-1.5 w-1.5 rounded-full ${isRead ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
      </motion.button>
    </motion.div>
  );
};

export default NotificationItem;
