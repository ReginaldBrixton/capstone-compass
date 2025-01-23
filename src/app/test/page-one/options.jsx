'use client';

import React, { useState } from 'react';

import {
  ChatRoomInput,
  Emoji,
  FileUpload,
  ImageUpload,
  SendButton,
  TextField,
} from './components/ChatRoomInput';

export default function Page() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message, type: 'text' },
    ]);
  };

  const handleFileUpload = (file) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `File uploaded: ${file.name}`,
        type: 'file',
        file,
      },
    ]);
  };

  const handleImageUpload = (image) => {
    const url = URL.createObjectURL(image);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `Image uploaded: ${image.name}`,
        type: 'image',
        url,
      },
    ]);
  };

  const handleEmojiSelect = (emoji) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: emoji,
        type: 'emoji',
      },
    ]);
  };

  return (
    <div className="page-one-container min-h-screen bg-gray-50 p-4 dark:bg-gray-900">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Chat Room Input Demo
      </h1>

      <div className="mx-auto mb-20 max-w-3xl rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <div className="h-[400px] overflow-y-auto">
          <div className="space-y-4 p-4">
            {messages.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">
                Start a conversation...
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-lg bg-gray-100 p-2 dark:bg-gray-700"
                >
                  {message.type === 'text' && (
                    <p className="text-gray-800 dark:text-gray-200">
                      {message.text}
                    </p>
                  )}
                  {message.type === 'file' && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5"
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
                      <span className="text-gray-800 dark:text-gray-200">
                        {message.text}
                      </span>
                    </div>
                  )}
                  {message.type === 'image' && (
                    <div>
                      <img
                        src={message.url}
                        alt={message.text}
                        className="max-w-xs rounded-lg"
                      />
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {message.text}
                      </p>
                    </div>
                  )}
                  {message.type === 'emoji' && (
                    <span className="text-2xl">{message.text}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <ChatRoomInput onSendMessage={handleSendMessage}>
          <FileUpload onFileUpload={handleFileUpload} />
          <ImageUpload onImageUpload={handleImageUpload} />
          <Emoji onEmojiSelect={handleEmojiSelect} />
          <TextField />
          <SendButton />
        </ChatRoomInput>
      </div>
    </div>
  );
}
