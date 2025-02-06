import React from 'react';
import { Avatar, AvatarFallback } from '../../../../components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { BellIcon, MessageSquareIcon, PackageIcon, UserIcon } from 'lucide-react';

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
const NotificationItem = ({ avatar, username, action, target, timestamp, type }) => {
  const iconMap = {
    mention: <MessageSquareIcon className="h-4 w-4 text-blue-500" data-oid="s-b2ywa" />,
    update: <PackageIcon className="h-4 w-4 text-emerald-500" data-oid="nlaggkj" />,
    message: <BellIcon className="h-4 w-4 text-violet-500" data-oid="kj-43i4" />,
  };
  return (
    <div
      className="group relative flex items-start space-x-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-all duration-200 hover:bg-accent/5 hover:shadow-md"
      id="notification-item"
      role="alert"
      data-oid="ncgziuw"
    >
      <Avatar
        className="h-10 w-10 ring-2 ring-background"
        id="notification-avatar"
        data-oid="dxcvef6"
      >
        <AvatarFallback
          className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600"
          id="notification-avatar-fallback"
          data-oid=":5:6ptq"
        >
          <UserIcon className="h-5 w-5" data-oid="jvs0w5o" />
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-1" id="notification-content" data-oid="19s4l4e">
        <div
          className="flex items-center justify-between"
          id="notification-header"
          data-oid="4194tev"
        >
          <div className="flex items-center space-x-2" data-oid="qnra72y">
            <div className="rounded-full bg-accent/10 p-1.5" data-oid="xzq:pr2">
              {iconMap[type]}
            </div>
            <p
              className="line-clamp-2 text-sm font-medium text-foreground sm:line-clamp-1"
              id="notification-text"
              data-oid="g6bidto"
            >
              <span
                className="font-semibold transition-colors duration-150 hover:text-primary"
                data-oid="tr.y3bf"
              >
                @{username}
              </span>{' '}
              <span className="text-muted-foreground" data-oid="i1vaw4b">
                {action}
              </span>{' '}
              <span
                className="cursor-pointer font-medium text-primary hover:underline"
                data-oid="zdxsxpw"
              >
                {target}
              </span>
            </p>
          </div>
        </div>

        <div
          className="flex items-center text-xs text-muted-foreground"
          id="notification-meta"
          data-oid="ngp-wwp"
        >
          <time
            dateTime={timestamp.toISOString()}
            className="flex items-center space-x-1"
            id="notification-timestamp"
            suppressHydrationWarning
            data-oid="kg3kix9"
          >
            <span suppressHydrationWarning data-oid="v8k2_4p">
              {formatDistanceToNow(timestamp, {
                addSuffix: true,
              })}
            </span>
          </time>
        </div>
      </div>

      <div
        className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        id="notification-type-indicator"
        data-oid="c5e1wp2"
      >
        {iconMap[type]}
      </div>
    </div>
  );
};
export default NotificationItem;
