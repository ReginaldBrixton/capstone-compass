import React, { useEffect, useRef, useState } from 'react';

// FileUpload
const FileUpload = ({ onFileUpload, onPreview = () => {} }) => (
  <button
    type="button"
    className="chat-room-file-upload-button p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
    aria-label="Upload file"
    onClick={() => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        files.forEach(async (file) => {
          const fileId = Math.random().toString(36).substr(2, 9);
          onFileUpload(file);

          // Generate thumbnail for file preview
          let thumbnail;
          if (file.type.startsWith('image/')) {
            thumbnail = URL.createObjectURL(file);
          } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            await new Promise((resolve) => {
              video.onloadeddata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                thumbnail = canvas.toDataURL();
                resolve();
              };
            });
          } else if (file.type.startsWith('audio/')) {
            thumbnail = '/audio-icon.png';
          } else {
            thumbnail = '/file-icon.png';
          }

          onPreview((prev) => [
            ...(prev || []),
            {
              id: fileId,
              type: 'file',
              name: file.name,
              size: file.size,
              thumbnail,
              fileType: file.type,
              progress: 0,
              uploaded: false,
            },
          ]);

          // Simulate upload progress
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            onPreview((prev) =>
              prev.map((item) =>
                item.id === fileId ? { ...item, progress: Math.min(progress, 100) } : item
              )
            );
            if (progress >= 100) {
              clearInterval(interval);
              onPreview((prev) =>
                prev.map((item) => (item.id === fileId ? { ...item, uploaded: true } : item))
              );
            }
          }, 500);
        });
      };
      input.click();
    }}
  >
    <svg
      className="chat-room-file-upload-icon w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  </button>
);

const ImageUpload = ({ onImageUpload, onPreview = () => {} }) => (
  <button
    type="button"
    className="chat-room-image-upload-button p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
    aria-label="Upload image"
    onClick={() => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;
      input.onchange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
          const imageId = Math.random().toString(36).substr(2, 9);
          onImageUpload(file);
          const url = URL.createObjectURL(file);

          // Create thumbnail
          const img = new Image();
          img.src = url;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 100;
            const scale = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scale;
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL('image/jpeg', 0.8);

            onPreview((prev) => [
              ...(prev || []),
              {
                id: imageId,
                type: 'image',
                url,
                thumbnail,
                name: file.name,
                progress: 0,
                uploaded: false,
              },
            ]);

            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
              progress += 10;
              onPreview((prev) =>
                prev.map((item) =>
                  item.id === imageId ? { ...item, progress: Math.min(progress, 100) } : item
                )
              );
              if (progress >= 100) {
                clearInterval(interval);
                onPreview((prev) =>
                  prev.map((item) => (item.id === imageId ? { ...item, uploaded: true } : item))
                );
              }
            }, 500);
          };
        });
      };
      input.click();
    }}
  >
    <svg
      className="chat-room-image-upload-icon w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        fill="currentColor"
        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
      />
    </svg>
  </button>
);

// Emoji
const Emoji = ({ onEmojiSelect, setMessage, message }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Expanded emoji categories
  const emojis = {
    smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😍'],
    gestures: ['👍', '👎', '👌', '✌️', '🤞', '🤝', '👊', '✋', '🤚', '🖐️'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💖', '💗', '💓'],
    activities: ['🎮', '🎲', '⚽', '🏀', '🎯', '🎨', '🎭', '🎪', '🎤', '🎧'],
    celebrations: ['🎉', '🎊', '🎈', '🎂', '🎁', '🎆', '✨', '🌟', '💫', '🎇'],
    nature: ['🌺', '🌸', '🌼', '🌻', '🌹', '🍀', '🌳', '🌴', '🌵', '🌿'],
  };

  const [activeCategory, setActiveCategory] = useState('smileys');

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji);
    setShowPicker(false);
  };

  return (
    <div className="chat-room-emoji-picker relative" ref={pickerRef}>
      <button
        type="button"
        className="chat-room-emoji-picker-button p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        aria-label="Add emoji"
        onClick={() => setShowPicker(!showPicker)}
      >
        <svg
          className="chat-room-emoji-picker-icon w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
          />
        </svg>
      </button>
      {showPicker && (
        <div className="chat-room-emoji-picker-categories absolute bottom-full mb-2 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg w-64">
          <div className="emoji-picker-category-buttons flex gap-1 mb-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-600">
            {Object.keys(emojis).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`emoji-picker-category-button px-2 py-1 text-sm rounded-md whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="emoji-picker-emojis grid grid-cols-6 gap-1 max-h-48 overflow-y-auto">
            {emojis[activeCategory].map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="emoji-picker-emoji text-xl hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded transition-colors"
                title={`Emoji ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// TextField
const TextField = ({ value, onChange, onKeyDown, preview, onClearPreview }) => {
  const textareaRef = useRef(null);
  const MAX_HEIGHT = 150;
  const MIN_ROWS = 1;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resizeTextarea = () => {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
      textarea.style.height = `${newHeight}px`;
    };

    resizeTextarea();

    const resizeObserver = new ResizeObserver(resizeTextarea);
    resizeObserver.observe(textarea);

    return () => resizeObserver.disconnect();
  }, [value]);

  return (
    <div className="chat-room-text-field flex-1 mx-4 relative">
      {preview && preview.length > 0 && (
        <div className="chat-room-text-field-preview absolute top-0 transform -translate-y-full bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex flex-wrap items-center gap-2 max-w-full">
          {preview.map((item, index) => (
            <div
              key={index}
              className="chat-room-text-field-preview-item flex items-center gap-2 bg-white dark:bg-gray-600 p-1 rounded"
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt=""
                  className="chat-room-text-field-preview-image h-12 w-12 object-cover rounded"
                />
              ) : (
                <svg
                  className="chat-room-text-field-preview-icon w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}
              <button
                onClick={() => onClearPreview(item.id)}
                className="chat-room-text-field-preview-clear-button ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <textarea
        ref={textareaRef}
        id="chat-input"
        rows={MIN_ROWS}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="chat-room-text-field-input w-full p-2.5 text-sm text-gray-900 bg-white rounded-lg 
          border border-gray-300 
          focus:outline-none focus:border-blue-500
          dark:bg-gray-800 dark:border-gray-600 dark:text-white
          dark:focus:border-blue-500
          dark:placeholder-gray-400
          transition-colors duration-200
          resize-none overflow-hidden"
        placeholder={
          preview && preview.length > 0 ? 'Add a message (optional)...' : 'Type a message...'
        }
        aria-label="Message input"
        spellCheck="true"
      />
    </div>
  );
};

const SendButton = ({ onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleClick = (e) => {
    setIsAnimating(true);
    onClick?.(e);

    // Create particles
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i * Math.PI * 2) / 8,
    }));
    setParticles(newParticles);

    // Reset animations after completion
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  return (
    <button
      type="submit"
      className={`chat-room-send-button relative p-2 text-blue-600 rounded-full hover:bg-blue-100 
        dark:text-blue-500 dark:hover:bg-gray-600 transition-all duration-300
        ${isAnimating ? 'scale-95' : 'scale-100'}`}
      aria-label="Send message"
      onClick={handleClick}
    >
      {/* Main send icon */}
      <svg
        className={`chat-room-send-button-icon w-5 h-5 transition-all duration-500 ease-in-out transform
          ${isAnimating ? 'rotate-[720deg] scale-0' : 'rotate-0 scale-100'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>

      {/* Particle effects */}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="chat-room-send-button-particle absolute inset-0 w-1 h-1 bg-blue-500 rounded-full"
          style={{
            animation: 'particle 0.8s ease-out forwards',
            transform: `rotate(${particle.angle}rad)`,
          }}
        />
      ))}

      {/* Success indicator */}
      <span
        className={`chat-room-send-button-success-indicator absolute inset-0 flex items-center justify-center transition-all duration-300
          ${isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
      >
        <svg
          className="w-4 h-4 animate-[ping_1s_ease-in-out_infinite]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>

      <style jsx>{`
        @keyframes particle {
          0% {
            transform: rotate(${0}deg) translateY(0);
            opacity: 1;
          }
          100% {
            transform: rotate(${360}deg) translateY(20px);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

const ChatRoomInput = ({ onSendMessage, children }) => {
  const [message, setMessage] = useState('');
  const [previews, setPreviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() || previews.length > 0) {
      onSendMessage(message, previews);
      setMessage('');
      setPreviews([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClearPreview = (id) => {
    setPreviews((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="chat-room-input fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg"
    >
      <div className="flex items-center px-4 py-2">
        {React.Children.map(children, (child) => {
          if (!child) return null;

          if (child.type === TextField) {
            return React.cloneElement(child, {
              value: message,
              onChange: (e) => setMessage(e.target.value),
              onKeyDown: handleKeyDown,
              preview: previews,
              onClearPreview: handleClearPreview,
            });
          }

          if (child.type === SendButton) {
            return React.cloneElement(child, {
              onClick: handleSubmit,
            });
          }

          if (child.type === FileUpload || child.type === ImageUpload) {
            return React.cloneElement(child, {
              onPreview: setPreviews,
            });
          }

          if (child.type === Emoji) {
            return React.cloneElement(child, {
              setMessage: setMessage,
              message: message,
            });
          }

          return child;
        })}
      </div>
    </form>
  );
};

export { ChatRoomInput, FileUpload, ImageUpload, Emoji, TextField, SendButton };
