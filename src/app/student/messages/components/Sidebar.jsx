"use client"

import React from "react"
import ChatList from "./ChatList"
import StoryList from "./StoryList"

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
      >
        <h1 
          className="
            text-lg sm:text-xl 
            font-semibold 
            text-gray-900
          "
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
        >
          <svg 
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
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
      >
        <div className="flex-shrink-0">
          <StoryList />
        </div>
        <div className="flex-1 min-h-0">
          <ChatList />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
