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
    online: <CheckCircle className="w-3 h-3 text-green-500" />,
    offline: <Circle className="w-3 h-3 text-gray-400" />,
    away: <Clock className="w-3 h-3 text-yellow-500" />,
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
      className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-200 ${
        isSelected ? 'bg-indigo-50 ring-2 ring-indigo-500' : ''
      }`}
      aria-label={`Chat with ${user.name}`}
    >
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />
        <span className="absolute bottom-0 right-0 flex items-center justify-center">
          {statusIcons[user.status]}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h3>
          {user.lastSeen && (
            <span className="text-xs text-gray-400">{formatTime(user.lastSeen)}</span>
          )}
        </div>
        <div className="mt-1 flex justify-between items-center">
          <span className="text-sm text-gray-500 truncate">{getLastMessagePreview()}</span>
          {user.unreadCount > 0 && (
            <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
              {user.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;
