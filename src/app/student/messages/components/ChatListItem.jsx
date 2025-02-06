'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import chatData from '../data/chatData.json';
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
const ChatListItem = ({ chat }) => {
  const router = useRouter();
  const [timeString, setTimeString] = useState('');
  const otherUser = chatData.users.find((user) => user.id !== chat.participants[0]);
  const lastMessage = chat.messages[chat.messages.length - 1];
  useEffect(() => {
    setTimeString(formatTime(lastMessage.timestamp));
  }, [lastMessage.timestamp]);
  return (
    <div
      className="flex items-center gap-2 p-2 sm:p-3 md:p-4 hover:bg-gray-100/90 active:bg-gray-200/80 
        cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg
        hover:shadow-sm"
      id={`chat-item-${chat.id}`}
      onClick={() => router.push(`/student/messages/${chat.id}`)}
      role="button"
      tabIndex={0}
      data-oid="3k62o_w"
    >
      <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12" data-oid="9_c9mx1">
        <Image
          src={otherUser.avatar || '/placeholder.svg'}
          alt={otherUser.name}
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 640px) 40px, 48px"
          data-oid="sy61o57"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center" data-oid="3r43gni">
        <div className="flex items-center justify-between gap-2" data-oid="i54xa9w">
          <h3
            className="font-semibold text-sm sm:text-base text-gray-900 truncate"
            data-oid="ubyn3fe"
          >
            {otherUser.name}
          </h3>
          <span className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0" data-oid="8xpihu4">
            {timeString}
          </span>
        </div>

        <p
          className="text-xs sm:text-sm text-gray-500 truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]"
          data-oid="lc4ys4w"
        >
          {lastMessage.content}
        </p>
      </div>
    </div>
  );
};
export default ChatListItem;
