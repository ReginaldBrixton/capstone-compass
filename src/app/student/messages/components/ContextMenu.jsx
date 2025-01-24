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

  return (
    <div
      ref={menuRef}
      className="absolute bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      style={{ top: y, left: x }}
    >
      <ul className="py-2">
        <li>
          <button onClick={onForward} className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Forward
          </button>
        </li>
        <li>
          <button onClick={onReply} className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Reply
          </button>
        </li>
        <li>
          <button onClick={onEdit} className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Edit
          </button>
        </li>
        <li>
          <button onClick={onDelete} className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Delete
          </button>
        </li>
        <li>
          <button onClick={onReport} className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Report
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ContextMenu

