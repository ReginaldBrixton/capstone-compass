'use client';

import React from 'react';

const MessagesPage = () => {
  return (
    <div
      className="grid min-h-full place-items-center bg-gray-50 dark:bg-gray-900 p-4"
      id="messages-welcome"
      data-oid="vwfj.5z"
    >
      <div 
        className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 py-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-200"
        data-oid="7t2sm.6"
      >
        <div className="grid gap-6 text-center">
          <h1 
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
            data-oid="5ceq5ah"
          >
            Welcome to Messages
          </h1>
          
          <div className="space-y-4">
            <p 
              className="text-base md:text-lg text-gray-600 dark:text-gray-300"
              data-oid="v:0vkbl"
            >
              Select a chat from the sidebar to start messaging
            </p>

            <div 
              className="block md:hidden text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
              data-oid="rqif6wb"
            >
              Use the menu button in the top left to view your chats
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
