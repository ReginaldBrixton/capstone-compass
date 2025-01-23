'use client';

import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { ChatSidebar, ChatWindow } from '@/components/chat';

const MessagesContainer = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  width: 100%;
  height: calc(100vh - 4rem);
  background-color: #f8f9fa;
  padding: 1rem;
`;

const MessagesPage = () => {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load conversations for the student
    const loadConversations = async () => {
      try {
        const response = await fetch('/api/messages/conversations');
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    };

    if (session?.user) {
      loadConversations();
    }
  }, [session]);

  return (
    <MessagesContainer>
      <ChatSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
      />
      <ChatWindow
        conversation={selectedConversation}
        messages={messages}
        setMessages={setMessages}
      />
    </MessagesContainer>
  );
};

export default MessagesPage;
