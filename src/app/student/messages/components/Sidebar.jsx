import React from "react"

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-16 lg:w-20 bg-white border-r border-gray-200 py-4 px-2" id="chat-sidebar">
      <div className="flex flex-col items-center space-y-4">
        <button className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
          <span className="text-lg lg:text-xl">+</span>
        </button>
        
        {[1, 2, 3].map((index) => (
          <button 
            key={index}
            className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <span className="text-sm lg:text-base">{index}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar

