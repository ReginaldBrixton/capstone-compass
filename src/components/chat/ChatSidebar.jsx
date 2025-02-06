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
    <SidebarContainer className={className} data-oid="irznodj">
      <ChatList data-oid="gycvhrx">
        <ChatItem data-oid="0n4_g32">Chat 1</ChatItem>
        <ChatItem data-oid="8cs1gjh">Chat 2</ChatItem>
        <ChatItem data-oid="34tlnh4">Chat 3</ChatItem>
      </ChatList>
    </SidebarContainer>
  );
};
export default ChatSidebar;
