'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import ReactionPicker from './ReactionPicker';
import chatData from '../data/chatData.json';
const Message = ({ message, onReply, onReaction }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const sender = chatData.users.find((user) => user.id === message.senderId);
  const isSentByMe = sender.id === 1; // Assuming current user's ID is 1

  const handleReaction = (reaction) => {
    onReaction?.(message.id, reaction);
    setShowReactions(false);
  };
  return (
    <div
      className={`
        group flex w-full px-2 sm:px-4 py-2
        ${isSentByMe ? 'justify-end' : 'justify-start'} 
        relative hover:bg-gray-50/50 transition-colors
      `}
      id="message-container"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      data-oid="wo96y8x"
    >
      {!isSentByMe && (
        <div className="flex-shrink-0 mr-2 sm:mr-3" data-oid=":ywh5sa">
          <Image
            src={sender.avatar || '/placeholder.svg'}
            alt={sender.name}
            width={28}
            height={28}
            className="rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            data-oid="opm4gen"
          />
        </div>
      )}

      <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[65%]" data-oid="q5cocd1">
        {/* Reply Preview */}
        {message.replyTo && (
          <div className="mb-1 ml-2 sm:ml-4" data-oid="4441ez_">
            <div
              className={`
              text-xs sm:text-sm p-1.5 sm:p-2 rounded-lg max-w-[200px] sm:max-w-[250px] truncate
              ${isSentByMe ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-800'}
              hover:max-w-full transition-all duration-300
            `}
              data-oid="6y2zxx_"
            >
              <span className="font-medium" data-oid="az_46mn">
                {message.replyTo.sender}:{' '}
              </span>
              {message.replyTo.content}
            </div>
          </div>
        )}

        {/* Message Content */}
        <div
          className={`
          relative rounded-2xl p-2.5 sm:p-3 shadow-sm
          ${isSentByMe ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}
          hover:shadow-md transition-shadow duration-200
        `}
          data-oid="r5p1c5."
        >
          {/* Message Type Content */}
          {message.type === 'text' && (
            <p
              className="whitespace-pre-wrap break-words text-sm sm:text-base mb-4"
              data-oid="zg550-s"
            >
              {message.content}
            </p>
          )}

          {message.type === 'image' && (
            <div className="relative rounded-lg overflow-hidden" data-oid="d39b-k5">
              <Image
                src={message.content}
                alt="Shared image"
                width={300}
                height={200}
                className="object-cover w-full h-auto max-h-[300px]"
                data-oid="dpcswg5"
              />
            </div>
          )}

          {message.type === 'file' && (
            <div className="flex items-center space-x-2 text-sm sm:text-base" data-oid="h-pbmzq">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="5uxn65y"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  data-oid="wpuvzhl"
                />
              </svg>
              <span
                className="underline truncate max-w-[150px] sm:max-w-[200px] hover:max-w-full transition-all duration-300"
                data-oid="ze-.vtz"
              >
                {message.content}
              </span>
            </div>
          )}

          {/* Timestamp */}
          <span
            className="absolute bottom-1.5 right-2.5 text-[10px] sm:text-xs opacity-70"
            data-oid="n13w5ui"
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </span>

          {/* Reactions */}
          {message.reactions?.length > 0 && (
            <div
              className={`
              absolute -bottom-3 ${isSentByMe ? 'right-2' : 'left-2'}
              flex -space-x-1 bg-white rounded-full px-2 py-0.5 sm:py-1 
              shadow-md border border-gray-100 hover:scale-105 transition-transform
            `}
              data-oid="pj:q5.9"
            >
              {message.reactions.slice(0, 3).map((reaction, index) => (
                <span key={index} className="text-xs sm:text-sm" data-oid="nzuibbf">
                  {reaction.emoji}
                </span>
              ))}
              {message.reactions.length > 3 && (
                <span className="text-[10px] sm:text-xs text-gray-500 ml-1" data-oid="pqneelw">
                  +{message.reactions.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Message Options */}
      <AnimatePresence data-oid="1hwvv38">
        {showOptions && (
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
            className={`
              absolute -top-2 ${isSentByMe ? 'left-0 mr-2' : 'right-0 ml-2'}
              flex items-center space-x-0.5 sm:space-x-1 bg-white rounded-lg 
              shadow-lg p-0.5 sm:p-1 border border-gray-200
              backdrop-blur-sm bg-white/90
            `}
            data-oid="cnlgu38"
          >
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add reaction"
              data-oid="z5jxs59"
            >
              <span className="text-base sm:text-lg" data-oid="lse83ua">
                😊
              </span>
            </button>
            <button
              onClick={() => onReply?.(message)}
              className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Reply"
              data-oid="q0vmnep"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="lhcao_g"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  data-oid="nl6n5_."
                />
              </svg>
            </button>
            <button
              className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Forward"
              data-oid="i40erx4"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="ovxyxrr"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  data-oid="rnv-ghv"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reaction Picker */}
      <AnimatePresence data-oid=":5_r:da">
        {showReactions && (
          <div className="absolute -top-1 left-0 z-50" data-oid="ibc1pys">
            <ReactionPicker
              onSelect={handleReaction}
              onClose={() => setShowReactions(false)}
              position="bottom"
              data-oid="7eqtq.k"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Message;
