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
    <div className="flex flex-col w-full h-full" id="chat-window">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-white border-b border-gray-200 shrink-0">
        {isMobile && (
          <button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back"
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
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {chat ? (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {chat.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-800">{chat.name}</h2>
              <p className="text-sm text-gray-500">{chat.status || "Active now"}</p>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Select a conversation to start messaging</div>
        )}
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div 
          className="h-full overflow-y-auto px-4 py-3 space-y-4"
          ref={messageListRef}
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
        <button
          className="absolute bottom-24 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          onClick={() => {
            messageListRef.current?.scrollTo({
              top: messageListRef.current.scrollHeight,
              behavior: "smooth"
            })
          }}
        >
          New messages ↓
        </button>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t border-gray-200 shrink-0">
        <ChatInput 
          onSendMessage={handleSendMessage}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
        />
      </div>
    </div>
  )
}

export default ChatWindow

