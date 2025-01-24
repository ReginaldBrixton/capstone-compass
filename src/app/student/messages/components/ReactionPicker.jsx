"use client"

import React from "react"
import { motion } from "framer-motion"

const reactions = [
  { emoji: "👍", name: "thumbs up", color: "bg-blue-100" },
  { emoji: "❤️", name: "heart", color: "bg-red-100" },
  { emoji: "😂", name: "joy", color: "bg-yellow-100" },
  { emoji: "😮", name: "wow", color: "bg-purple-100" },
  { emoji: "😢", name: "sad", color: "bg-gray-100" },
  { emoji: "😡", name: "angry", color: "bg-orange-100" },
]

const ReactionPicker = ({ onSelect, onClose, position = "bottom" }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`
        absolute ${position === "bottom" ? "bottom-full mb-1" : "top-full mt-1"}
        left-0 bg-white rounded-md shadow-lg p-1 z-50 border border-gray-200
        max-w-[calc(100vw-2rem)] overflow-x-auto
      `}
      id="reaction-picker"
    >
      <div 
        className="flex items-center gap-0.5 sm:gap-1" 
        id="reactions-container"
      >
        {reactions.map((reaction) => (
          <motion.button
            key={reaction.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-1.5 sm:p-2 rounded-md transition-all duration-200
              ${reaction.color} hover:brightness-95
              flex items-center justify-center
              shadow-sm hover:shadow
              min-w-[2rem] sm:min-w-[2.5rem]
            `}
            onClick={() => {
              onSelect(reaction.emoji);
              onClose();
            }}
            aria-label={`React with ${reaction.name}`}
            id={`reaction-${reaction.name}`}
          >
            <span className="text-base sm:text-lg transform hover:scale-105 transition-transform">
              {reaction.emoji}
            </span>
          </motion.button>
        ))}
      </div>
      <div 
        className={`
          absolute ${position === "bottom" ? "-bottom-1" : "-top-1"}
          left-4 w-2 h-2 bg-white border border-gray-200
          transform rotate-45 -z-10
        `}
        id="reaction-picker-arrow"
      />
    </motion.div>
  )
}

export default ReactionPicker