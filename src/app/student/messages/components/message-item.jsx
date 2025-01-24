import React from "react"

const MessageItem = ({ message }) => {
  const isUser = message.sender === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-3 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

export default MessageItem

