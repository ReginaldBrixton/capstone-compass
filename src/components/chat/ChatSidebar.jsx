'use client';

import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 1rem;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChatItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  &.active {
    background-color: #e5e7eb;
  }
`;

const ChatSidebar = ({ className }) => {
  return (
    <SidebarContainer className={className}>
      <ChatList>
        <ChatItem>Chat 1</ChatItem>
        <ChatItem>Chat 2</ChatItem>
        <ChatItem>Chat 3</ChatItem>
      </ChatList>
    </SidebarContainer>
  );
};

export default ChatSidebar;
