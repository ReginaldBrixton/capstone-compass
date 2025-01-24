import React, { useState } from "react"
import ChatLayout from "./components/chat-layout"
import MessageList from "./components/message-list"
import InputArea from "./components/input-area"
import { generateId } from "./utils/generateId"

const App = () => {
  const [messages, setMessages] = useState([
    { id: generateId(), content: "Hello! How can I help you today?", sender: "bot" },
  ])

  const handleSendMessage = (content) => {
    const newMessage = { id: generateId(), content, sender: "user" }
    setMessages([...messages, newMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: generateId(),
        content: "Thank you for your message. How else can I assist you?",
        sender: "bot",
      }
      setMessages((prevMessages) => [...prevMessages, botResponse])
    }, 1000)
  }

  return (
    <ChatLayout>
      <MessageList messages={messages} />
      <InputArea onSendMessage={handleSendMessage} />
    </ChatLayout>
  )
}

export default App

