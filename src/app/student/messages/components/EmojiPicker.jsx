import React from "react"
import Picker from "emoji-picker-react"

const EmojiPicker = ({ onEmojiSelect }) => {
  const handleEmojiClick = (event, emojiObject) => {
    onEmojiSelect(emojiObject.emoji)
  }

  return (
    <div className="emoji-picker">
      <Picker onEmojiClick={handleEmojiClick} />
    </div>
  )
}

export default EmojiPicker

