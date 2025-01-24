import React, { useState, useEffect } from "react"
import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"
import MessageInput from "./MessageInput"
import ContextMenu from "./ContextMenu"
import ChatHeader from "./ChatHeader"

const Chat = () => {
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [contextMenu, setContextMenu] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [showChatList, setShowChatList] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) setShowChatList(true)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Fetch chats from API
    const fetchedChats = [
      { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Hello there!" },
      { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=5", lastMessage: "How are you?" },
      { id: 3, name: "Bob Johnson", avatar: "https://i.pravatar.cc/150?img=8", lastMessage: "See you soon!" },
    ]
    setChats(fetchedChats)
  }, [])

  useEffect(() => {
    if (selectedChat) {
      // Fetch messages for selected chat from API
      const fetchedMessages = [
        { id: 1, content: "Hi there!", isSent: false, type: "text" },
        { id: 2, content: "Hello! How are you?", isSent: true, type: "text" },
        { id: 3, content: "I'm doing great, thanks for asking!", isSent: false, type: "text" },
        { id: 4, content: "That's wonderful to hear!", isSent: true, type: "text" },
      ]
      setMessages(fetchedMessages)
      if (isMobile) setShowChatList(false)
    }
  }, [selectedChat, isMobile])

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId)
  }

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      isSent: true,
      type: "text",
    }
    setMessages([...messages, newMessage])
  }

  const handleFileUpload = (file) => {
    const newMessage = {
      id: messages.length + 1,
      content: URL.createObjectURL(file),
      isSent: true,
      type: file.type.startsWith("image/") ? "image" : "file",
    }
    setMessages([...messages, newMessage])
  }

  const handleContextMenu = (e, message) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      message,
    })
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  const handleForward = () => {
    // Implement forward functionality
    console.log("Forward message:", contextMenu.message)
    handleCloseContextMenu()
  }

  const handleReply = () => {
    // Implement reply functionality
    console.log("Reply to message:", contextMenu.message)
    handleCloseContextMenu()
  }

  const handleEdit = () => {
    // Implement edit functionality
    console.log("Edit message:", contextMenu.message)
    handleCloseContextMenu()
  }

  const handleDelete = () => {
    setMessages(messages.filter((m) => m.id !== contextMenu.message.id))
    handleCloseContextMenu()
  }

  const handleReport = () => {
    // Implement report functionality
    console.log("Report message:", contextMenu.message)
    handleCloseContextMenu()
  }

  return (
    <div className="chat-container">
      <div className={`chat-list-container ${showChatList ? "visible" : ""}`}>
        <ChatList chats={chats} onSelectChat={handleSelectChat} selectedChat={selectedChat} />
      </div>
      {selectedChat && (
        <div className="chat-window-container">
          <ChatHeader
            chatName={chats.find((chat) => chat.id === selectedChat)?.name}
            onBackClick={() => setShowChatList(true)}
            isMobile={isMobile}
          />
          <ChatWindow messages={messages} onContextMenu={handleContextMenu} />
          <MessageInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
        </div>
      )}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          options={[
            { label: "Forward", action: handleForward },
            { label: "Reply", action: handleReply },
            { label: "Edit", action: handleEdit },
            { label: "Delete", action: handleDelete },
            { label: "Report", action: handleReport },
          ]}
        />
      )}
    </div>
  )
}

export default Chat

