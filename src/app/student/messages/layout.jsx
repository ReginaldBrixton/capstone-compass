"use client"

import React, { useState } from "react"
import Sidebar from "./components/Sidebar"

const MessagesLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div 
      className="flex flex-col md:flex-row h-screen w-full bg-white overflow-hidden" 
      id="messages-layout"
    >
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
        id="sidebar-toggle"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 
          transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-200 ease-in-out
          w-full md:w-80 lg:w-96 border-r border-gray-200 
          bg-white z-40 h-screen flex flex-col
        `}
        id="messages-sidebar"
      >
        <div className="flex-1 overflow-hidden">
          <Sidebar />
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className="flex-1 h-screen overflow-hidden bg-gray-50 relative" 
        id="messages-main"
      >
        <div className="h-full overflow-auto">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          id="mobile-overlay"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default MessagesLayout
