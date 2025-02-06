'use client';

import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';
import { motion, AnimatePresence } from 'framer-motion';
const MessageInput = ({ onSendMessage, onTypingStart, onTypingEnd, replyingTo, onCancelReply }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const typingTimeoutRef = useRef(null);
  useEffect(() => {
    if (message) {
      onTypingStart?.();
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        onTypingEnd?.();
      }, 1000);
    } else {
      onTypingEnd?.();
    }
    return () => clearTimeout(typingTimeoutRef.current);
  }, [message, onTypingStart, onTypingEnd]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };
  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSendMessage(null, file);
      fileInputRef.current.value = '';
    }
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/mp3',
        });
        onSendMessage(null, audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  return (
    <div
      className="sticky bottom-0 border-t border-gray-200 bg-white px-2 sm:px-4 py-2 sm:py-4 max-w-screen-2xl mx-auto"
      id="message-input-container"
      data-oid="78b-anq"
    >
      {replyingTo && (
        <div
          className="flex items-center bg-gray-50 p-2 rounded-lg mb-2 mx-2 max-w-full overflow-hidden"
          data-oid="u6td:.m"
        >
          <div className="flex-1 text-xs sm:text-sm text-gray-600 truncate" data-oid="8t7g_b3">
            <span className="font-medium" data-oid="kqevm5s">
              Replying to:{' '}
            </span>
            {replyingTo.content}
          </div>
          <button
            onClick={onCancelReply}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            aria-label="Cancel reply"
            id="cancel-reply-btn"
            data-oid="u7rncmj"
          >
            ✕
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-2 relative"
        data-oid="jjbn1e9"
      >
        <div
          className="flex items-center gap-1 w-full sm:w-auto order-2 sm:order-1"
          data-oid="3rm9qzy"
        >
          <div className="relative flex-shrink-0" data-oid="24bb1o2">
            <button
              type="button"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add attachment"
              id="attachment-btn"
              data-oid="sasfc48"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="7zx0i5p"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  data-oid="qp-.d50"
                />
              </svg>
            </button>

            <AnimatePresence data-oid="aqqk.:7">
              {showAttachMenu && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                  }}
                  className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[180px] z-50 max-h-[calc(100vh-200px)] overflow-y-auto"
                  id="attach-menu"
                  data-oid="60nfk6b"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    multiple
                    id="file-input"
                    data-oid="y8tbabe"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full text-left transition-colors"
                    id="upload-photo-btn"
                    data-oid="s5cdc9q"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      data-oid=":_563kk"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        data-oid="9676hu-"
                      />
                    </svg>
                    <span data-oid="ok4dnou">Photo/Video</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full text-left transition-colors"
                    id="upload-doc-btn"
                    data-oid="jnk:j.y"
                  >
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      data-oid="wyv0npn"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        data-oid="smqdtcl"
                      />
                    </svg>
                    <span data-oid="5dv05lx">Document</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full text-left transition-colors"
                    id="location-btn"
                    data-oid="fq7td.6"
                  >
                    <svg
                      className="w-5 h-5 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      data-oid="qnuu6kj"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        data-oid="m932t4k"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        data-oid="kanttbn"
                      />
                    </svg>
                    <span data-oid="8g6ikuw">Location</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Add emoji"
            id="emoji-btn"
            data-oid="li05vg0"
          >
            😊
          </button>
        </div>

        {!isRecording ? (
          <div
            className="flex flex-1 items-center gap-1 sm:gap-2 w-full sm:w-auto order-1 sm:order-2"
            data-oid="r6_.cg0"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm sm:text-base min-w-0"
              id="message-input"
              data-oid="huai4n6"
            />

            {message.trim() ? (
              <button
                type="submit"
                className="p-1.5 sm:p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
                aria-label="Send message"
                id="send-btn"
                data-oid="_9gtglt"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="585sq0s"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    data-oid="e4vbyc7"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                aria-label="Record voice message"
                id="record-btn"
                data-oid="n5et53g"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="qk-yopf"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    data-oid="wav9iq5"
                  />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex-1 flex items-center justify-between bg-red-50 rounded-full px-4 py-2 w-full order-1"
            data-oid="2.lltzn"
          >
            <div className="flex items-center space-x-2 text-red-600" data-oid="le.nzzu">
              <span className="animate-pulse" data-oid=":fztzgx">
                ●
              </span>
              <span className="text-xs sm:text-sm" data-oid="7p48-q:">
                {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <button
              type="button"
              onClick={stopRecording}
              className="text-red-600 hover:text-red-700 text-xs sm:text-sm transition-colors"
              id="stop-record-btn"
              data-oid="b3.e.35"
            >
              Send Voice Message
            </button>
          </div>
        )}
      </form>

      <AnimatePresence data-oid="3oqfgeh">
        {showEmojiPicker && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.1,
            }}
            className="fixed sm:absolute bottom-16 sm:bottom-full right-2 sm:right-0 mb-0 sm:mb-2 z-50 max-h-[40vh] sm:max-h-[50vh] w-[calc(100%-1rem)] sm:w-auto overflow-hidden rounded-lg shadow-xl border border-gray-200"
            id="emoji-picker"
            data-oid="g.0u.br"
          >
            <EmojiPicker onEmojiSelect={handleEmojiSelect} data-oid="4r89ncu" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MessageInput;
