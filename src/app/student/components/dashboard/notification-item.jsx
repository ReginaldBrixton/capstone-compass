import React from 'react';
import { Avatar, AvatarFallback } from '../../../../components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import {
  BellIcon,
  MessageSquareIcon,
  PackageIcon,
  UserIcon,
} from 'lucide-react';

/**
 * NotificationItem component displays a notification with an avatar, username,
 * action, target, timestamp, and type.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.avatar] - The URL of the avatar image.
 * @param {string} props.username - The username of the person.
 * @param {string} props.action - The action performed.
 * @param {string} props.target - The target of the action.
 * @param {Date} props.timestamp - The timestamp of the notification.
 * @param {"mention" | "update" | "message"} props.type - The type of notification.
 * @returns {JSX.Element} The rendered NotificationItem component.
 */
const NotificationItem = ({
  avatar,
  username,
  action,
  target,
  timestamp,
  type,
}) => {
  const iconMap = {
    mention: <MessageSquareIcon className="h-4 w-4 text-blue-500" />,
    update: <PackageIcon className="h-4 w-4 text-emerald-500" />,
    message: <BellIcon className="h-4 w-4 text-violet-500" />,
  };

  return (
    <div
      className="group relative flex items-start space-x-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-all duration-200 hover:bg-accent/5 hover:shadow-md"
      id="notification-item"
      role="alert"
    >
      <Avatar
        className="h-10 w-10 ring-2 ring-background"
        id="notification-avatar"
      >
        <AvatarFallback
          className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600"
          id="notification-avatar-fallback"
        >
          <UserIcon className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-1" id="notification-content">
        <div
          className="flex items-center justify-between"
          id="notification-header"
        >
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-accent/10 p-1.5">
              {iconMap[type]}
            </div>
            <p
              className="line-clamp-2 text-sm font-medium text-foreground sm:line-clamp-1"
              id="notification-text"
            >
              <span className="font-semibold transition-colors duration-150 hover:text-primary">
                @{username}
              </span>{' '}
              <span className="text-muted-foreground">{action}</span>{' '}
              <span className="cursor-pointer font-medium text-primary hover:underline">
                {target}
              </span>
            </p>
          </div>
        </div>

        <div
          className="flex items-center text-xs text-muted-foreground"
          id="notification-meta"
        >
          <time
            dateTime={timestamp.toISOString()}
            className="flex items-center space-x-1"
            id="notification-timestamp"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          </time>
        </div>
      </div>

      <div
        className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        id="notification-type-indicator"
      >
        {iconMap[type]}
      </div>
    </div>
  );
};

export default NotificationItem;
