"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import chatData from "../data/chatData.json"

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: "numeric",
    minute: "2-digit",
    hour12: true 
  })
}

const ChatListItem = ({ chat }) => {
  const router = useRouter()
  const [timeString, setTimeString] = useState("")
  const otherUser = chatData.users.find((user) => user.id !== chat.participants[0])
  const lastMessage = chat.messages[chat.messages.length - 1]

  useEffect(() => {
    setTimeString(formatTime(lastMessage.timestamp))
  }, [lastMessage.timestamp])

  return (
    <div
      className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
      id={`chat-item-${chat.id}`}
      onClick={() => router.push(`/student/messages/${chat.id}`)}
    >
      <img 
        src={otherUser.avatar || "/placeholder.svg"} 
        alt={otherUser.name} 
        className="w-12 h-12 rounded-full mr-3 object-cover" 
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{otherUser.name}</h3>
        <p className="text-sm text-gray-500 truncate">{lastMessage.content}</p>
      </div>
      <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
        {timeString}
      </span>
    </div>
  )
}

export default ChatListItem
