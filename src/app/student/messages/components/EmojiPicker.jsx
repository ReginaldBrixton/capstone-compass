import React from "react"
import Picker from "emoji-picker-react"

const EmojiPicker = ({ onEmojiSelect }) => {
  const handleEmojiClick = (event, emojiObject) => {
    onEmojiSelect(emojiObject.emoji)
  }

  return (
    <div className="emoji-picker fixed bottom-0 left-0 w-full md:w-auto md:relative overflow-hidden rounded-t-lg md:rounded-lg shadow-lg bg-white" id="emoji-picker-container">
      <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto">
        <Picker 
          onEmojiClick={handleEmojiClick}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}

export default EmojiPicker
