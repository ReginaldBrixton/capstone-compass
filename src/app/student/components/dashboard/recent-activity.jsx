import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar"; // Assuming this path is correct
import { formatDistanceToNow } from "date-fns";
import { FileIcon, GitCommitIcon, MessageSquareIcon } from "lucide-react";

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
    commit: <GitCommitIcon className="h-4 w-4 text-green-500" />,
    file: <FileIcon className="h-4 w-4 text-blue-500" />,
    comment: <MessageSquareIcon className="h-4 w-4 text-yellow-500" />,
  };

  return (
    <div
      className="group relative flex items-start space-x-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200"
      id="recent-activity-container"
    >
      <Avatar className="h-10 w-10" id="activity-avatar">
        {username ? (
          <AvatarImage
            src={`https://avatar.vercel.sh/${username}.png`}
            alt={username}
            id="activity-avatar-image"
          />
        ) : null}
        <AvatarFallback className="text-sm font-semibold" id="activity-avatar-fallback">
          {username
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || "?"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2" id="activity-content">
        <div id="activity-description-container">
          <p className="text-sm font-medium text-foreground" id="activity-description">
            <span className="font-semibold hover:underline transition-colors duration-150 cursor-pointer" id="activity-username">
              {username}
            </span>{" "}
            <span className="text-muted-foreground">{action}</span>{" "}
            <span className="font-semibold hover:underline transition-colors duration-150 cursor-pointer" id="activity-target">
              {target}
            </span>
          </p>
        </div>
        <div
          className="flex items-center text-xs text-muted-foreground"
          id="activity-timestamp-container"
        >
          <span className="mr-2" id="activity-icon">{iconMap[type]}</span>
          <span id="activity-timestamp">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
      <div
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        id="activity-type-icon-container"
      >
        {iconMap[type]}
      </div>
    </div>
  );
};

export default RecentActivity;