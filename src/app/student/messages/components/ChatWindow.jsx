import React, { useState, useRef, useEffect } from "react"
import { generateId } from "../../../../utils/generateId"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"

const ChatWindow = ({ chat, onBack, isMobile }) => {
  const [messages, setMessages] = useState([
    { id: "1", content: "Hey there!", sender: "user", timestamp: new Date() },
    { id: "2", content: "Hi! How are you?", sender: "other", timestamp: new Date() },
  ])
  const [replyingTo, setReplyingTo] = useState(null)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const messageListRef = useRef(null)

  useEffect(() => {
    if (messageListRef.current && isScrolledToBottom) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages, isScrolledToBottom])

  useEffect(() => {
    const handleScroll = () => {
      if (messageListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messageListRef.current
        const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10
        setIsScrolledToBottom(isBottom)
      }
    }

    messageListRef.current?.addEventListener("scroll", handleScroll)
    return () => messageListRef.current?.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSendMessage = (content, file) => {
    const newMessage = {
      id: generateId(),
      content,
      sender: "user",
      timestamp: new Date(),
      file,
      replyTo: replyingTo,
    }
    setMessages([...messages, newMessage])
    setReplyingTo(null)
    setIsScrolledToBottom(true)
  }

  const handleForward = (messageId) => {
    console.log("Forward message:", messageId)
  }

  const handleReply = (messageId) => {
    const messageToReply = messages.find((m) => m.id === messageId)
    setReplyingTo(messageToReply)
  }

  const handleEdit = (messageId, newContent) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent, edited: true } : msg
    ))
  }

  const handleDelete = (messageId) => {
    setMessages(messages.filter((m) => m.id !== messageId))
  }

  const handleReport = (messageId) => {
    console.log("Report message:", messageId)
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-50" id="chat-window">
      {/* Header */}
      <header className="flex items-center h-14 md:h-16 px-3 md:px-6 bg-white border-b border-gray-200 shrink-0 sticky top-0 z-10" id="chat-header">
        {isMobile && (
          <button 
            onClick={onBack}
            className="mr-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back"
            id="back-button"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {chat ? (
          <div className="flex items-center min-w-0 flex-1 gap-3" id="chat-info">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-base" id="chat-avatar">
              {chat.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-medium text-gray-900 truncate">{chat.name}</h2>
              <p className="text-sm text-gray-500 truncate">{chat.status || "Active now"}</p>
            </div>
          </div>
        ) : (
          <div className="text-base text-gray-500 flex-1 truncate" id="empty-chat-message">
            Select a conversation to start messaging
          </div>
        )}
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden" id="messages-container">
        <div 
          ref={messageListRef}
          className="h-full overflow-y-auto px-3 md:px-6 py-4 space-y-4"
          id="message-list"
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onForward={handleForward}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReport={handleReport}
            />
          ))}
        </div>
      </div>

      {/* New Message Indicator */}
      {!isScrolledToBottom && messages.length > 0 && (
        <div className="fixed bottom-20 right-4 z-10" id="new-message-indicator">
          <button
            className="bg-white text-gray-700 px-4 py-1.5 rounded-full shadow-md hover:bg-gray-50 border border-gray-200 transition-colors text-sm font-medium"
            onClick={() => {
              messageListRef.current?.scrollTo({
                top: messageListRef.current.scrollHeight,
                behavior: "smooth"
              })
            }}
          >
            New messages ↓
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 shrink-0" id="input-area">
        <div className="max-w-screen-xl mx-auto px-3 md:px-6 py-3">
          <ChatInput 
            onSendMessage={handleSendMessage}
            replyingTo={replyingTo}
            onCancelReply={() => setReplyingTo(null)}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
