"use client"

import React, { useState, useRef, useEffect } from "react"
import EmojiPicker from "emoji-picker-react"
import { motion, AnimatePresence } from "framer-motion"

const MessageInput = ({ onSendMessage, onTypingStart, onTypingEnd, replyingTo, onCancelReply }) => {
  const [message, setMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)
  const fileInputRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    if (message) {
      onTypingStart?.()
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        onTypingEnd?.()
      }, 1000)
    } else {
      onTypingEnd?.()
    }
    return () => clearTimeout(typingTimeoutRef.current)
  }, [message, onTypingStart, onTypingEnd])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() || previewFile) {
      onSendMessage(message.trim(), previewFile)
      setMessage("")
      setPreviewFile(null)
    }
  }

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviewFile(file)
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setMessage(`[Image: ${file.name}]`)
        }
        reader.readAsDataURL(file)
      } else {
        setMessage(`[File: ${file.name}]`)
      }
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" })
        onSendMessage("Voice message", audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
    } catch (err) {
      console.error("Error accessing microphone:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-2 sm:p-3 md:p-4 max-w-screen-xl mx-auto" id="message-input">
      <div className="max-w-4xl mx-auto">
        {replyingTo && (
          <div className="flex items-center bg-gray-50 p-2 rounded-lg mb-2 sm:mb-3 overflow-hidden">
            <div className="flex-1 min-w-0">
              <div className="text-sm sm:text-base text-gray-600 truncate">
                <span className="font-medium">Replying to: </span>
                {replyingTo.content}
              </div>
            </div>
            <button
              onClick={onCancelReply}
              className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Cancel reply"
            >
              ✕
            </button>
          </div>
        )}

        {previewFile && previewFile.type.startsWith("image/") && (
          <div className="relative mb-2 max-w-xs mx-auto sm:max-w-sm">
            <img
              src={URL.createObjectURL(previewFile)}
              alt="Preview"
              className="w-full h-auto rounded-lg object-cover"
            />
            <button
              onClick={() => {
                setPreviewFile(null)
                setMessage("")
              }}
              className="absolute top-1 right-1 bg-gray-800/50 text-white rounded-full p-1 hover:bg-gray-800"
              aria-label="Remove preview"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <div className="flex gap-1 w-full sm:w-auto order-1 sm:order-none">
            <button
              type="button"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add attachment"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add emoji"
            >
              <span className="text-xl">😊</span>
            </button>
          </div>

          {!isRecording ? (
            <>
              <div className="flex-1 min-w-0 order-3 sm:order-none">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full py-2 px-4 text-sm sm:text-base bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="order-2 sm:order-none">
                {message.trim() || previewFile ? (
                  <button
                    type="submit"
                    disabled={!message.trim() && !previewFile}
                    className={`p-2 rounded-full transition-colors ${
                      message.trim() || previewFile
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                    aria-label="Send message"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Record voice message"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-between bg-red-50 rounded-full px-4 py-2 order-3 sm:order-none">
              <div className="flex items-center space-x-2 text-red-600 text-xs sm:text-sm">
                <span className="animate-pulse">●</span>
                <span>{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}</span>
              </div>
              <button
                type="button"
                onClick={stopRecording}
                className="text-red-600 hover:text-red-700 text-xs sm:text-sm whitespace-nowrap"
              >
                Send Voice
              </button>
            </div>
          )}
        </form>

        <AnimatePresence>
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-full right-0 sm:right-4 mb-2 z-50 max-h-[50vh] overflow-auto"
            >
              <div className="shadow-lg rounded-lg border border-gray-200">
                <EmojiPicker 
                  onEmojiClick={(emojiObject) => {
                    setMessage((prev) => prev + emojiObject.emoji)
                    setShowEmojiPicker(false)
                  }}
                  width={window.innerWidth < 640 ? "100%" : "350px"}
                  height={window.innerWidth < 640 ? "300px" : "450px"}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MessageInput
