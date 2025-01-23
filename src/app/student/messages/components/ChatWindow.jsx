import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

import { ChatUser, Message } from '../../types/chat';
import MessageBubble from './MessageBubble';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9fafb;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const BackButton = styled.button`
  color: #4b5563;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

const UserName = styled.h3`
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const UserStatus = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const InputForm = styled.form`
  padding: 1rem;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const InputField = styled.input`
  flex: 1;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1.5rem;
  outline: none;
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const SendButton = styled.button`
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.2s;

  &:hover {
    background-color: #4f46e5;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ChatWindow = ({ user, messages, onSendMessage, onBack, isMobile }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <ChatWindowContainer>
      {/* Header */}
      <Header>
        {isMobile && (
          <BackButton onClick={onBack} aria-label="Back">
            <ArrowLeft size={24} />
          </BackButton>
        )}
        <Avatar src={user.avatar} alt={user.name} />
        <div>
          <UserName>{user.name}</UserName>
          <UserStatus>{user.status}</UserStatus>
        </div>
      </Header>

      {/* Messages */}
      <MessageContainer>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === 'currentUser'}
          />
        ))}
      </MessageContainer>

      {/* Input */}
      <InputForm onSubmit={handleSubmit}>
        <InputContainer>
          <InputField
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            aria-label="Type a message"
          />
          <SendButton type="submit" aria-label="Send message">
            <Send size={24} />
          </SendButton>
        </InputContainer>
      </InputForm>
    </ChatWindowContainer>
  );
};

export default ChatWindow;
