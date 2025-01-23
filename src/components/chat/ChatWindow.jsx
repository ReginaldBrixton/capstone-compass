'use client';

import React from 'react';
import styled from 'styled-components';

const WindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const MessageArea = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const InputArea = styled.div`
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

const ChatWindow = ({ className }) => {
  return (
    <WindowContainer className={`chat-window-container ${className || ''}`} id="chat-window-main">
      <MessageArea className="chat-window-message-area" id="chat-window-messages">
        {/* Messages will be rendered here */}
      </MessageArea>
      <InputArea className="chat-window-input-area" id="chat-window-input-section">
        <MessageInput
          type="text"
          placeholder="Type your message..."
          aria-label="Message input"
          className="chat-window-message-input"
          id="chat-window-message-input"
        />
        <SendButton
          aria-label="Send message"
          className="chat-window-send-button"
          id="chat-window-send-button"
        >
          Send
        </SendButton>
      </InputArea>
    </WindowContainer>
  );
};

export default ChatWindow;
