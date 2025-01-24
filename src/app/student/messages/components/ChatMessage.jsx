import React, { useState, useRef, useEffect } from "react"
import { formatTime, formatFileSize, getContextMenuPosition } from "../utils/helpers"
import ContextMenu from "./ContextMenu"

const ChatMessage = React.memo(({ message, onForward, onReply, onEdit, onDelete, onReport }) => {
  const [contextMenu, setContextMenu] = useState(null)
  const messageRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setContextMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleContextMenu = (e) => {
    e.preventDefault()
    const rect = messageRef.current.getBoundingClientRect()
    const menuWidth = 150
    const menuHeight = 200
    const { x, y } = getContextMenuPosition(
      e.clientX,
      e.clientY,
      menuWidth,
      menuHeight,
      window.innerWidth,
      window.innerHeight,
    )
    setContextMenu({ x, y })
  }

  const handleAction = (action) => {
    action(message.id)
    setContextMenu(null)
  }

  return (
    <div
      ref={messageRef}
      className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
      onContextMenu={handleContextMenu}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
          message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        } shadow-md transition-all duration-200 ease-in-out hover:shadow-lg`}
      >
        {message.replyTo && (
          <div className="reply-container mb-2 text-sm">
            <p className="font-semibold">{message.replyTo.sender === "user" ? "You" : "Other"}</p>
            <p className="text-gray-600 dark:text-gray-300">{message.replyTo.content}</p>
          </div>
        )}
        {message.file ? (
          <div className="flex items-center">
            <svg
              className="w-8 h-8 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div>
              <p className="font-semibold">{message.file.name}</p>
              <p className="text-xs">{formatFileSize(message.file.size)}</p>
            </div>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
        <p className="text-xs mt-1 opacity-75">{formatTime(message.timestamp)}</p>
      </div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onForward={() => handleAction(onForward)}
          onReply={() => handleAction(onReply)}
          onEdit={() => handleAction(onEdit)}
          onDelete={() => handleAction(onDelete)}
          onReport={() => handleAction(onReport)}
        />
      )}
    </div>
  )
})

ChatMessage.displayName = "ChatMessage"

export default ChatMessage

