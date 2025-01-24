import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"

const ChatLayout = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {!isMobile && <Sidebar />}
      <div className="flex-1 flex">
        {(!isMobile || !selectedChat) && <ChatList onSelectChat={setSelectedChat} />}
        {(!isMobile || selectedChat) && (
          <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} isMobile={isMobile} />
        )}
      </div>
    </div>
  )
}

export default ChatLayout

