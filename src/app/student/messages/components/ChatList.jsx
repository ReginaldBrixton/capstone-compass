import React from 'react';
import { Search } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

import { ChatUser } from '../../types/chat';
import ChatListItem from './ChatListItem';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-right: 1px solid #e5e7eb;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 770px) {
    width: 100%;
    border-right: none;
    box-shadow: none;
  }
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const SearchContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 0.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: #111827;

  &::placeholder {
    color: #6b7280;
  }
`;

const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6b7280;
  font-size: 0.875rem;
`;

/**
 * @param {Object} props
 * @param {ChatUser[]} props.users - Array of chat users
 * @param {string} [props.selectedUserId] - ID of selected user
 * @param {(userId: string) => void} props.onSelectUser - Callback when user is selected
 */
const ChatList = ({ users, selectedUserId, onSelectUser }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container id="chat-list-container" className="chat-list-container">
      <Header id="chat-list-header" className="chat-list-header">
        <Title id="chat-list-title" className="chat-list-title">
          Messages
        </Title>
        <SearchContainer>
          <Search className="w-4 h-4 text-gray-400" />
          <SearchInput
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search chats"
          />
        </SearchContainer>
      </Header>
      <ChatListContainer id="chat-list-items" className="chat-list-items">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <ChatListItem
              key={user.id}
              user={user}
              isSelected={user.id === selectedUserId}
              onClick={() => onSelectUser(user.id)}
              id={`chat-list-item-${user.id}`}
              className={`chat-list-item ${user.id === selectedUserId ? 'selected' : ''}`}
            />
          ))
        ) : (
          <EmptyState>No chats found</EmptyState>
        )}
      </ChatListContainer>
    </Container>
  );
};

export default ChatList;
