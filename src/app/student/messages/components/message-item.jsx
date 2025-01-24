import React from "react"

const MessageItem = ({ message }) => {
  const isUser = message.sender === "user"
  
  return (
    <div 
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
      id={`message-${message.id}`}
    >
      <div
        className={`
          max-w-[85%] md:max-w-[75%] px-3.5 py-2.5 rounded-2xl
          ${isUser 
            ? "bg-blue-600 text-white rounded-br-sm" 
            : "bg-gray-100 text-gray-900 rounded-bl-sm"
          }
        `}
      >
        <p className="text-[15px] leading-normal break-words">{message.content}</p>
        {message.timestamp && (
          <span className={`text-xs mt-1 block ${isUser ? "text-blue-100" : "text-gray-500"}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  )
}

export default MessageItem

