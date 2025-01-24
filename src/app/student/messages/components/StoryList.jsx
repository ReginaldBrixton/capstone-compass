"use client"

import React from "react"
import StoryItem from "./StoryItem"
import { motion } from "framer-motion"
import chatData from "../data/chatData.json"

const StoryList = () => {
  return (
    <div className="bg-white p-3" id="story-list-container">
      <motion.div 
        className="flex gap-3 overflow-x-auto scrollbar-none"
        drag="x"
        dragConstraints={{ right: 0, left: -300 }}
        id="story-list-scroll"
      >
        {/* Add Story Button */}
        <div className="flex-none" id="add-story-container">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 hover:border-blue-400 transition-all duration-200">
            <button 
              className="w-full h-full rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-all"
              aria-label="Create new story"
              id="add-story-button"
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Story Items */}
        {chatData.stories.map((story) => (
          <div key={story.id} className="flex-none" id={`story-item-${story.id}`}>
            <StoryItem story={story} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default StoryList
