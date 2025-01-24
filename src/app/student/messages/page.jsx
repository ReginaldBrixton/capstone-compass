"use client"

import React from "react"
import ChatLayout from "./components/ChatLayout"

const MessagesPage = () => {
  return (
    <main 
      className="fixed inset-0 flex flex-col bg-gray-50 text-[15px] antialiased" 
      id="messages-page"
      style={{ height: '100dvh', WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="relative flex-1 flex">
        <ChatLayout />
      </div>
    </main>
  )
}

export default MessagesPage 