import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"

const ChatLayout = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setShowSidebar(width >= 1024)
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="flex h-full" id="chat-layout">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all"
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40`}
      >
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 min-w-0">
        {/* Chat List */}
        <div
          className={`w-80 bg-white border-r border-gray-200 ${
            isMobile && selectedChat ? "hidden" : "block"
          }`}
        >
          <ChatList
            onSelectChat={(chat) => {
              setSelectedChat(chat)
              if (isMobile) setShowSidebar(false)
            }}
            selectedChat={selectedChat}
          />
        </div>

        {/* Chat Window */}
        <div
          className={`flex-1 ${
            isMobile && !selectedChat ? "hidden" : "flex"
          }`}
        >
          <ChatWindow
            chat={selectedChat}
            onBack={() => {
              setSelectedChat(null)
              if (isMobile) setShowSidebar(true)
            }}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  )
}

export default ChatLayout

