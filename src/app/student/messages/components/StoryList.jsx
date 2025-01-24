"use client"

import React from "react"
import StoryItem from "./StoryItem"
import { motion } from "framer-motion"
import chatData from "../data/chatData.json"

const StoryList = () => {
  return (
    <div className="px-4 py-3 border-b border-gray-200" id="story-list">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Stories</h3>
      <motion.div 
        className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide"
        drag="x"
        dragConstraints={{ right: 0, left: -300 }}
      >
        {/* Add Story Button */}
        <div className="flex-shrink-0">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
              <button 
                className="w-full h-full rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Add story"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <span className="text-xs text-gray-600 font-medium">Add Story</span>
          </div>
        </div>

        {/* Story Items */}
        {chatData.stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <StoryItem story={story} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default StoryList

