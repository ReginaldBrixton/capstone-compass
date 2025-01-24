import React, { useState, useRef, useEffect } from "react"
import { generateId } from "../../../../utils/helpers"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"

const ChatWindow = ({ chat, onBack, isMobile }) => {
  const [messages, setMessages] = useState([
    { id: "1", content: "Hey there!", sender: "user", timestamp: new Date() },
    { id: "2", content: "Hi! How are you?", sender: "other", timestamp: new Date() },
  ])
  const [replyingTo, setReplyingTo] = useState(null)
  const messageListRef = useRef(null)

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

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
  }

  const handleForward = (messageId) => {
    // Implement forward functionality
    console.log("Forward message:", messageId)
  }

  const handleReply = (messageId) => {
    const messageToReply = messages.find((m) => m.id === messageId)
    setReplyingTo(messageToReply)
  }

  const handleEdit = (messageId) => {
    const messageToEdit = messages.find((m) => m.id === messageId)
    if (messageToEdit) {
      // For simplicity, we'll just allow editing the last message sent by the user
      if (messageToEdit === messages[messages.length - 1] && messageToEdit.sender === "user") {
        const updatedMessages = [...messages]
        updatedMessages[updatedMessages.length - 1] = {
          ...messageToEdit,
          content: prompt("Edit your message:", messageToEdit.content) || messageToEdit.content,
        }
        setMessages(updatedMessages)
      } else {
        alert("You can only edit your last message.")
      }
    }
  }

  const handleDelete = (messageId) => {
    setMessages(messages.filter((m) => m.id !== messageId))
  }

  const handleReport = (messageId) => {
    // Implement report functionality
    console.log("Report message:", messageId)
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex items-center p-4 border-b border-gray-300">
        {isMobile && (
          <button onClick={onBack} className="mr-4 text-blue-500">
            Back
          </button>
        )}
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
        <h2 className="font-semibold">{chat ? chat.name : "Select a chat"}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4" ref={messageListRef}>
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
      <ChatInput onSendMessage={handleSendMessage} replyingTo={replyingTo} onCancelReply={() => setReplyingTo(null)} />
    </div>
  )
}

export default ChatWindow

