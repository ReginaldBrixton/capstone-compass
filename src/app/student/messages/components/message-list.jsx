import React from "react"
import MessageItem from "./message-item"

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList

