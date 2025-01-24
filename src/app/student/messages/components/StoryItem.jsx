"use client"

import React, { useState } from "react"
import Image from "next/image"
import chatData from "../data/chatData.json"

const StoryItem = ({ story }) => {
  const [showPreview, setShowPreview] = useState(false)
  const user = chatData.users.find((user) => user.id === story.userId)
  const hasUnviewed = !story.viewed

  return (
    <>
      <div 
        className="flex flex-col items-center space-y-1 cursor-pointer"
        onClick={() => setShowPreview(true)}
      >
        <div className={`relative ${hasUnviewed ? "story-ring" : ""}`}>
          <div className={`
            w-16 h-16 rounded-full p-[2px]
            ${hasUnviewed ? "bg-gradient-to-tr from-yellow-400 to-fuchsia-600" : "border-2 border-gray-200"}
          `}>
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
              {story.isLive && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-[10px] text-center py-[2px]">
                  LIVE
                </div>
              )}
            </div>
          </div>
          {story.isPremium && (
            <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-900 font-medium truncate w-16 text-center">
          {user.name.split(" ")[0]}
        </span>
      </div>

      {/* Story Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full max-w-lg mx-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Story Content */}
            <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={story.media || user.avatar}
                alt="Story"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
              
              {/* Story Header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center space-x-2">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-white/70 text-sm">
                      {new Date(story.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Story Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Reply to story..."
                    className="flex-1 bg-white/10 text-white placeholder-white/70 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StoryItem

