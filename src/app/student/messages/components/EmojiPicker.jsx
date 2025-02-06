'use client';

import React from 'react';
import Picker from 'emoji-picker-react';
const EmojiPicker = ({ onEmojiSelect }) => {
  const handleEmojiClick = (emojiData) => {
    onEmojiSelect(emojiData.emoji);
  };
  return (
    <div
      className="emoji-picker fixed bottom-0 left-0 w-full md:w-auto md:relative overflow-hidden rounded-t-lg md:rounded-lg shadow-lg bg-white"
      id="emoji-picker-container"
      data-oid="ul.c_g3"
    >
      <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto" data-oid="b69:avg">
        <Picker
          onEmojiClick={handleEmojiClick}
          width="100%"
          height="100%"
          lazyLoadEmojis={true}
          data-oid="w8tek0g"
        />
      </div>
    </div>
  );
};
export default EmojiPicker;
