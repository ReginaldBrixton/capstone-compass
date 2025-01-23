import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

import { ChatUser } from '../../types/chat';

/**
 * @param {Object} props
 * @param {ChatUser} props.user
 * @param {boolean} props.isSelected
 * @param {() => void} props.onClick
 */
const ChatListItem = ({ user, isSelected, onClick }) => {
  const statusIcons = {
    online: <CheckCircle className="h-3 w-3 text-green-500" />,
    offline: <Circle className="h-3 w-3 text-gray-400" />,
    away: <Clock className="h-3 w-3 text-yellow-500" />,
  };

  const formatTime = (date) => {
    if (!date) return '';
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return new Date(date).toLocaleTimeString('en-US', options);
  };

  const getLastMessagePreview = () => {
    if (user.lastMessage) {
      return user.lastMessage.length > 30
        ? `${user.lastMessage.substring(0, 30)}...`
        : user.lastMessage;
    }
    return 'No messages yet';
  };

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center space-x-3 p-4 transition-colors duration-200 hover:bg-gray-50 ${
        isSelected ? 'bg-indigo-50 ring-2 ring-indigo-500' : ''
      }`}
      aria-label={`Chat with ${user.name}`}
    >
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-12 w-12 rounded-full object-cover shadow-sm"
        />
        <span className="absolute bottom-0 right-0 flex items-center justify-center">
          {statusIcons[user.status]}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {user.name}
          </h3>
          {user.lastSeen && (
            <span className="text-xs text-gray-400">
              {formatTime(user.lastSeen)}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="truncate text-sm text-gray-500">
            {getLastMessagePreview()}
          </span>
          {user.unreadCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white shadow-sm">
              {user.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;
