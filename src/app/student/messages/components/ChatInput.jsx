import React, { useState, useRef } from "react"
import EmojiPicker from "emoji-picker-react"
import { formatFileSize } from "../../../../utils/helpers"

const ChatInput = ({ onSendMessage, replyingTo, onCancelReply }) => {
  const [inputMessage, setInputMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputMessage.trim() || fileInputRef.current.files[0]) {
      onSendMessage(inputMessage, fileInputRef.current.files[0])
      setInputMessage("")
      fileInputRef.current.value = ""
    }
  }

  const handleEmojiClick = (emojiObject) => {
    setInputMessage((prevMessage) => prevMessage + emojiObject.emoji)
    setShowEmojiPicker(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setInputMessage(`File: ${file.name} (${formatFileSize(file.size)})`)
    }
  }

  return (
    <div className="w-full" id="chat-input-container">
      {replyingTo && (
        <div className="bg-gray-50 px-3 py-2 mb-2 rounded-lg flex justify-between items-center text-sm border border-gray-200">
          <div className="flex-1 truncate">
            <span className="font-medium text-gray-700">Replying to: </span>
            <span className="text-gray-600">{replyingTo.content}</span>
          </div>
          <button 
            onClick={onCancelReply} 
            className="ml-2 text-gray-400 hover:text-gray-600"
            aria-label="Cancel reply"
          >
            ✕
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Attach file"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,.pdf,.doc,.docx"
          />
          
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Add emoji"
          >
            😊
          </button>
        </div>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 py-2 px-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white border border-transparent focus:border-blue-500 transition-colors text-[15px]"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() && !fileInputRef.current?.files[0]}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[15px] font-medium"
        >
          Send
        </button>
      </form>

      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4 z-50">
          <div className="shadow-lg rounded-lg">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatInput

