import React, { useState, useEffect } from "react"
import { debounce } from "../utils/helpers"

const ChatList = ({ onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [chats, setChats] = useState([
    { id: "1", name: "John Doe", lastMessage: "Hey, how are you?", time: "2h", online: true },
    { id: "2", name: "Jane Smith", lastMessage: "See you later!", time: "1d", online: false },
    { id: "3", name: "Bob Johnson", lastMessage: "Thanks for the help!", time: "3d", online: true },
  ])

  const [filteredChats, setFilteredChats] = useState(chats)

  const debouncedSearch = debounce((term) => {
    const filtered = chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(term.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredChats(filtered)
  }, 300)

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm])

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-300 flex flex-col">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold mb-2">Chats</h2>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-y-auto flex-grow">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
            onClick={() => onSelectChat(chat)}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{chat.name}</h3>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-500">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList

