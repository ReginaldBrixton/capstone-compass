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
    <div className="border-t border-gray-300 p-4">
      {replyingTo && (
        <div className="bg-gray-100 p-2 mb-2 rounded-md flex justify-between items-center">
          <div>
            <span className="font-semibold">Replying to: </span>
            {replyingTo.content}
          </div>
          <button onClick={onCancelReply} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          😊
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  )
}

export default ChatInput

