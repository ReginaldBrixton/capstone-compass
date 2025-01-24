import React from "react"

const ChatLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-full w-full bg-gray-50" id="chat-layout">
      {children}
    </div>
  )
}

export default ChatLayout

