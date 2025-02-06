'use client';

import React from 'react';
import ChatList from './ChatList';
import StoryList from './StoryList';
const Sidebar = () => {
  return (
    <div
      className="
        w-full md:w-80 lg:w-96
        border-r border-gray-200 
        h-full
        flex flex-col
        bg-white
        transition-all duration-200 ease-in-out
      "
      id="messages-sidebar"
      data-oid="nwyrqo."
    >
      <div
        className="
          p-3 sm:p-4
          border-b border-gray-200
          bg-white
          sticky top-0 z-10
          flex items-center justify-between
          shadow-sm
        "
        data-oid="9-vj89h"
      >
        <h1
          className="
            text-lg sm:text-xl 
            font-semibold 
            text-gray-900
          "
          data-oid="79ltbf6"
        >
          Messages
        </h1>
        <button
          className="
            p-2
            hover:bg-gray-100
            rounded-full
            transition-colors
            duration-200
          "
          aria-label="New Message"
          data-oid="6ylc:cx"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            data-oid="yv1y5pa"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
              data-oid="eg3ud4u"
            />
          </svg>
        </button>
      </div>

      <div
        className="
          flex-1
          overflow-hidden
          flex flex-col
          min-h-0
        "
        data-oid="s-86pam"
      >
        <div className="flex-shrink-0" data-oid="78pbeep">
          <StoryList data-oid="ugukwct" />
        </div>
        <div className="flex-1 min-h-0" data-oid="lwnm5y0">
          <ChatList data-oid="oxe9bxo" />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
