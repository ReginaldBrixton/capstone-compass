"use client"

import React from "react"

const MessagesPage = () => {
  return (
    <div 
      className="flex items-center justify-center h-full bg-gray-50 p-4" 
      id="messages-welcome"
    >
      <div className="text-center space-y-4 max-w-md mx-auto px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Welcome to Messages
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Select a chat from the sidebar to start messaging
        </p>
        <div className="block md:hidden text-sm text-gray-500 mt-4">
          Use the menu button in the top left to view your chats
        </div>
      </div>
    </div>
  )
}

export default MessagesPage 