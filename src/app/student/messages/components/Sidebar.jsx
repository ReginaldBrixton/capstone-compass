import React from "react"
import ChatList from "./ChatList"
import StoryList from "./StoryList"

const Sidebar = () => {
  return (
    <div className="w-64 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Chats</h1>
      </div>
      <div className="overflow-y-auto flex-1">
        <StoryList />
        <ChatList />
      </div>
    </div>
  )
}

export default Sidebar

