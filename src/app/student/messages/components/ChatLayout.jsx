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
    <div className="flex w-full h-full overflow-hidden" id="chat-layout">
      {/* Sidebar Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-3 left-3 z-50 p-2.5 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-50 border border-gray-200 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`absolute lg:relative w-[280px] h-full bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40`}
      >
        <div className="h-full overflow-hidden">
          <Sidebar />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 min-w-0 h-full">
        {/* Chat List */}
        <div
          className={`w-[320px] bg-white border-r border-gray-200 ${
            isMobile && selectedChat ? "hidden" : "flex flex-col"
          }`}
        >
          <div className="h-full overflow-hidden">
            <ChatList
              onSelectChat={(chat) => {
                setSelectedChat(chat)
                if (isMobile) setShowSidebar(false)
              }}
              selectedChat={selectedChat}
            />
          </div>
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
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  )
}

export default ChatLayout

