import React, { useRef, useEffect } from "react"

const ContextMenu = ({ x, y, onClose, onForward, onReply, onEdit, onDelete, onReport }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const menuItems = [
    { label: "Forward", onClick: onForward, icon: "→" },
    { label: "Reply", onClick: onReply, icon: "↩" },
    { label: "Edit", onClick: onEdit, icon: "✎" },
    { label: "Delete", onClick: onDelete, icon: "🗑" },
    { label: "Report", onClick: onReport, icon: "⚠" },
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[160px]"
      style={{ 
        top: y, 
        left: x,
        maxWidth: "calc(100vw - 24px)",
        maxHeight: "calc(100vh - 24px)"
      }}
      id="context-menu"
    >
      <ul className="text-[15px]">
        {menuItems.map(({ label, onClick, icon }) => (
          <li key={label}>
            <button 
              onClick={onClick}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span className="text-gray-400 text-base">{icon}</span>
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContextMenu

