"use client"

import React from "react"
import ChatListItem from "./ChatListItem"
import chatData from "../data/chatData.json"

const ChatList = ({ selectedChatId }) => {
  return (
    <div className="py-2 overflow-y-auto" id="chat-list">
      {chatData.chats.map((chat) => (
        <ChatListItem 
          key={chat.id} 
          chat={chat}
          isSelected={chat.id === selectedChatId}
        />
      ))}
    </div>
  )
}

export default ChatList
