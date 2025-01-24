import React from "react"

const ContextMenu = ({ x, y, onClose, options }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => {
            option.action()
            onClose()
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ContextMenu

