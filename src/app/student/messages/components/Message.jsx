"use client"

import React, { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import ReactionPicker from "./ReactionPicker"
import chatData from "../data/chatData.json"

const Message = ({ message, onReply, onReaction }) => {
  const [showReactions, setShowReactions] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const sender = chatData.users.find((user) => user.id === message.senderId)
  const isSentByMe = sender.id === 1 // Assuming current user's ID is 1

  const handleReaction = (reaction) => {
    onReaction?.(message.id, reaction)
    setShowReactions(false)
  }

  return (
    <div 
      className={`group flex ${isSentByMe ? "justify-end" : "justify-start"} relative`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {!isSentByMe && (
        <div className="flex-shrink-0 mr-2">
          <Image
            src={sender.avatar || "/placeholder.svg"}
            alt={sender.name}
            width={28}
            height={28}
            className="rounded-full"
          />
        </div>
      )}

      <div className="max-w-[70%]">
        {/* Reply Preview */}
        {message.replyTo && (
          <div className="mb-1 ml-4">
            <div className={`
              text-xs p-2 rounded-lg max-w-[200px] truncate
              ${isSentByMe ? "bg-blue-50 text-blue-800" : "bg-gray-50 text-gray-800"}
            `}>
              <span className="font-medium">{message.replyTo.sender}: </span>
              {message.replyTo.content}
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className={`
          relative rounded-lg p-3 shadow-sm
          ${isSentByMe ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"}
        `}>
          {/* Message Type Content */}
          {message.type === "text" && (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}

          {message.type === "image" && (
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={message.content}
                alt="Shared image"
                width={300}
                height={200}
                className="object-cover"
              />
            </div>
          )}

          {message.type === "file" && (
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="underline">{message.content}</span>
            </div>
          )}

          {/* Timestamp */}
          <span className="absolute bottom-1 right-2 text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: "numeric",
              minute: "2-digit",
              hour12: true 
            })}
          </span>

          {/* Reactions */}
          {message.reactions?.length > 0 && (
            <div className={`
              absolute -bottom-3 ${isSentByMe ? "right-2" : "left-2"}
              flex -space-x-1 bg-white rounded-full px-2 py-1 shadow-md border border-gray-100
            `}>
              {message.reactions.map((reaction, index) => (
                <span key={index} className="text-sm">{reaction.emoji}</span>
              ))}
              {message.reactions.length > 3 && (
                <span className="text-xs text-gray-500 ml-1">+{message.reactions.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Message Options */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`
              absolute top-0 ${isSentByMe ? "left-0 mr-2" : "right-0 ml-2"}
              flex items-center space-x-1 bg-white rounded-lg shadow-lg p-1 border border-gray-200
            `}
          >
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add reaction"
            >
              <span className="text-lg">😊</span>
            </button>
            <button
              onClick={() => onReply?.(message)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Reply"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Forward"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reaction Picker */}
      <AnimatePresence>
        {showReactions && (
          <div className="absolute top-0 left-0">
            <ReactionPicker
              onSelect={handleReaction}
              onClose={() => setShowReactions(false)}
              position="bottom"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Message

