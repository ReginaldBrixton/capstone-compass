'use client';

import React from 'react';
import ChatListItem from './ChatListItem';
import chatData from '../data/chatData.json';
const ChatList = ({ selectedChatId }) => {
  return (
    <div
      className="
        flex flex-col
        min-h-0 max-h-[calc(100vh-4rem)]
        py-2 sm:py-3 md:py-4
        px-2 sm:px-3 md:px-4
        overflow-y-auto overflow-x-hidden
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
        bg-white sm:bg-gray-50
        border-r border-gray-100
        transition-all duration-200 ease-in-out
      "
      id="chat-list"
      role="list"
      aria-label="Chat conversations"
      data-oid="y27_kgu"
    >
      <div className="flex flex-col gap-1 sm:gap-2" data-oid="2b96al2">
        {chatData.chats.map((chat) => (
          <div
            key={chat.id}
            className={`
              rounded-lg
              transition-all duration-200
              ${chat.id === selectedChatId ? 'bg-blue-50/80 shadow-sm' : ''}
            `}
            data-oid="yr-s-ww"
          >
            <ChatListItem chat={chat} isSelected={chat.id === selectedChatId} data-oid="eir4bb7" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatList;
