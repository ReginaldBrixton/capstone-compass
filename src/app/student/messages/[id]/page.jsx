"use client"

import React from "react"
import { useParams } from "next/navigation"
import ChatWindow from "../components/ChatWindow"
import { useRouter } from "next/navigation"

const ChatPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = params?.id ? parseInt(params.id, 10) : null

  if (!id) {
    return (
      <div 
        className="flex items-center justify-center h-full bg-gray-50" 
        id="chat-error"
      >
        <div className="text-center p-4">
          <p className="text-xl text-gray-600 mb-4">Chat not found</p>
          <button
            onClick={() => router.push("/student/messages")}
            className="text-blue-500 hover:text-blue-600"
          >
            Return to Messages
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col" id={`chat-${id}`}>
      <ChatWindow chatId={id} />
    </div>
  )
}

export default ChatPage 