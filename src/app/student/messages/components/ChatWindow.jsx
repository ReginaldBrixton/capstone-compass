"use client"

import React, { useState, useEffect } from "react"
import Message from "./Message"
import MessageInput from "./MessageInput"
import ChatHeader from "./ChatHeader"
import chatData from "../data/chatData.json"

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([])
  const [chat, setChat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setLoading(true)
    const foundChat = chatData.chats.find((c) => c.id === chatId)
    if (foundChat) {
      setChat(foundChat)
      setMessages(foundChat.messages)
    }
    setLoading(false)
  }, [chatId])

  const handleSendMessage = (content, file) => {
    const newMessage = {
      id: Date.now(),
      senderId: 1, // Assuming current user's ID is 1
      content: file ? URL.createObjectURL(file) : content,
      timestamp: new Date().toISOString(),
      type: file ? (file.type.startsWith("image/") ? "image" : "file") : "text",
    }
    setMessages((prev) => [...prev, newMessage])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full" id="chat-window-loading">
        <p className="text-gray-600">Loading messages...</p>
      </div>
    )
  }

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full" id="chat-window-error">
        <p className="text-gray-600">Chat not found</p>
      </div>
    )
  }

  const otherUser = chatData.users.find((user) => user.id !== 1)

  return (
    <div className="flex flex-col h-screen max-h-screen" id={`chat-window-${chatId}`}>
      <ChatHeader 
        chatName={otherUser.name}
        avatar={otherUser.avatar}
        isOnline={otherUser.isOnline}
        isTyping={isTyping}
        isMobile={window.innerWidth <= 768}
      />
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" 
        id="messages-container"
      >
        {messages.map((message) => (
          <Message 
            key={message.id} 
            message={message}
            onReply={(msg) => console.log("Reply to:", msg)}
            onReaction={(msgId, reaction) => console.log("React:", msgId, reaction)}
          />
        ))}
      </div>
      <MessageInput 
        onSendMessage={handleSendMessage}
        onTypingStart={() => setIsTyping(true)}
        onTypingEnd={() => setIsTyping(false)}
      />
    </div>
  )
}

export default ChatWindow

