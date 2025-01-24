import React from "react"
import MessageItem from "./message-item"

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-4 py-4 space-y-2" id="message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList

