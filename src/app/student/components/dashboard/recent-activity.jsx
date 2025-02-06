import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar'; // Assuming this path is correct
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
    commit: <GitCommitIcon className="h-4 w-4 text-green-500" data-oid="f9ijd8k" />,
    file: <FileIcon className="h-4 w-4 text-blue-500" data-oid="q9mws:d" />,
    comment: <MessageSquareIcon className="h-4 w-4 text-yellow-500" data-oid="6v7iqef" />,
  };
  return (
    <div
      className="group relative flex items-start space-x-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm transition-shadow duration-200 hover:shadow-md"
      id="recent-activity-container"
      data-oid="6ahp6ai"
    >
      <Avatar className="h-10 w-10" id="activity-avatar" data-oid="ywillo4">
        {username ? (
          <AvatarImage
            src={`https://avatar.vercel.sh/${username}.png`}
            alt={username}
            id="activity-avatar-image"
            data-oid="atf93g."
          />
        ) : null}
        <AvatarFallback
          className="text-sm font-semibold"
          id="activity-avatar-fallback"
          data-oid="20cqyk-"
        >
          {username
            ?.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase() || '?'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2" id="activity-content" data-oid="ub29tk0">
        <div id="activity-description-container" data-oid="donkrzo">
          <p
            className="text-sm font-medium text-foreground"
            id="activity-description"
            data-oid="lb_6g.3"
          >
            <span
              className="cursor-pointer font-semibold transition-colors duration-150 hover:underline"
              id="activity-username"
              data-oid="tc-vza9"
            >
              {username}
            </span>{' '}
            <span className="text-muted-foreground" data-oid="fwl4rb6">
              {action}
            </span>{' '}
            <span
              className="cursor-pointer font-semibold transition-colors duration-150 hover:underline"
              id="activity-target"
              data-oid="_gmi9:6"
            >
              {target}
            </span>
          </p>
        </div>
        <div
          className="flex items-center text-xs text-muted-foreground"
          id="activity-timestamp-container"
          data-oid="hcwiiar"
        >
          <span className="mr-2" id="activity-icon" data-oid="-omt8je">
            {iconMap[type]}
          </span>
          <span id="activity-timestamp" data-oid="ug05h1v">
            {formatDistanceToNow(timestamp, {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
      <div
        className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        id="activity-type-icon-container"
        data-oid=":iczfmi"
      >
        {iconMap[type]}
      </div>
    </div>
  );
};
export default RecentActivity;
