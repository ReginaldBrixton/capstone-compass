'use client';

import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import chatData from '../data/chatData.json';
const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    setLoading(true);
    const foundChat = chatData.chats.find((c) => c.id === chatId);
    if (foundChat) {
      setChat(foundChat);
      setMessages(foundChat.messages);
    }
    setLoading(false);
  }, [chatId]);
  const handleSendMessage = (content, file) => {
    const newMessage = {
      id: Date.now(),
      senderId: 1,
      content: file ? URL.createObjectURL(file) : content,
      timestamp: new Date().toISOString(),
      type: file ? (file.type.startsWith('image/') ? 'image' : 'file') : 'text',
      replyTo: replyingTo,
    };
    setMessages((prev) => [...prev, newMessage]);
    setReplyingTo(null);
  };
  const handleReply = (message) => {
    setReplyingTo(message);
  };
  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen bg-gray-50"
        id="chat-window-loading"
        data-oid="jpapx7z"
      >
        <div className="flex flex-col items-center space-y-3" data-oid="cm3pd0x">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
            data-oid="-gcuear"
          ></div>
          <p className="text-gray-600 text-base" data-oid="po243sk">
            Loading messages...
          </p>
        </div>
      </div>
    );
  }
  if (!chat) {
    return (
      <div
        className="flex items-center justify-center h-screen bg-gray-50"
        id="chat-window-error"
        data-oid=":_2zd.9"
      >
        <p className="text-gray-600 text-base" data-oid="eda-a27">
          Chat not found
        </p>
      </div>
    );
  }
  const otherUser = chatData.users.find((user) => user.id !== 1);
  return (
    <div
      className="flex flex-col h-screen bg-white"
      id={`chat-window-${chatId}`}
      data-oid="jd.yya_"
    >
      <ChatHeader
        chatName={otherUser.name}
        avatar={otherUser.avatar}
        isOnline={otherUser.isOnline}
        isTyping={isTyping}
        isMobile={true}
        lastSeen={otherUser.lastSeen}
        data-oid="da26c8s"
      />

      <div
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-gray-50"
        id="messages-container"
        data-oid="o3l3_ox"
      >
        <div className="max-w-3xl mx-auto w-full space-y-6" data-oid="4yk1asu">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onReply={(msg) => setReplyingTo(msg)}
              onReaction={(msgId, reaction) => {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === msgId
                      ? {
                          ...m,
                          reactions: [
                            ...(m.reactions || []),
                            {
                              emoji: reaction,
                              userId: 1,
                            },
                          ],
                        }
                      : m
                  )
                );
              }}
              data-oid="w6bt-cn"
            />
          ))}
          <div ref={messagesEndRef} data-oid="h_ks5g0" />
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4" data-oid="k74cg6o">
        <MessageInput
          onSendMessage={handleSendMessage}
          onTypingStart={() => setIsTyping(true)}
          onTypingEnd={() => setIsTyping(false)}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
          data-oid="8cibod8"
        />
      </div>
    </div>
  );
};
export default ChatWindow;
