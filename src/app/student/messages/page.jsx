"use client"

import React from "react"
import ChatLayout from "./components/ChatLayout"

const MessagesPage = () => {
  return (
    <main className="messages-page fixed inset-0 flex flex-col bg-gray-50" id="messages-page">
      <ChatLayout />
    </main>
  )
}

export default MessagesPage 