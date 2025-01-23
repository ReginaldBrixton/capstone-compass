'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';

const MessagesContainer = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  padding: 1rem;
`;

const StyledChatSidebar = styled(ChatSidebar)`
  border-right: 1px solid #e5e7eb;
  background-color: white;
  border-radius: 8px;
`;

const StyledChatWindow = styled(ChatWindow)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export default function ChatPage() {
  const params = useParams();
  const chatId = parseInt(params.chatId);

  return (
    <MessagesContainer id="messages-container" className="messages-layout">
      <StyledChatSidebar activeChat={chatId} id="chat-sidebar" className="chat-sidebar-component" />
      <StyledChatWindow chat={chatId} id="chat-window" className="chat-window-component" />
    </MessagesContainer>
  );
}
