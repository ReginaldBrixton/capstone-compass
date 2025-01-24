"use client"

import React from "react"
import { motion } from "framer-motion"

const reactions = [
  { emoji: "👍", name: "thumbs up" },
  { emoji: "❤️", name: "heart" },
  { emoji: "😂", name: "joy" },
  { emoji: "😮", name: "wow" },
  { emoji: "😢", name: "sad" },
  { emoji: "😡", name: "angry" },
]

const ReactionPicker = ({ onSelect, onClose, position = "bottom" }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`
        absolute ${position === "bottom" ? "bottom-full mb-2" : "top-full mt-2"} 
        left-0 bg-white rounded-full shadow-lg p-1 z-50 border border-gray-200
      `}
    >
      <div className="flex items-center space-x-1">
        {reactions.map((reaction) => (
          <motion.button
            key={reaction.name}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => {
              onSelect(reaction)
              onClose()
            }}
            aria-label={`React with ${reaction.name}`}
          >
            <span className="text-xl">{reaction.emoji}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default ReactionPicker 