import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components
const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
  margin: 0.5rem 0;
`;

const BubbleWrapper = styled.div`
  max-width: 70%;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  background-color: ${({ $isOwn }) => ($isOwn ? '#4F46E5' : '#FFFFFF')};
  color: ${({ $isOwn }) => ($isOwn ? '#FFFFFF' : '#111827')};
  border: ${({ $isOwn }) => ($isOwn ? 'none' : '1px solid #E5E7EB')};
  box-shadow: ${({ $isOwn }) =>
    $isOwn
      ? '0 2px 4px rgba(79, 70, 229, 0.2)'
      : '0 2px 4px rgba(0, 0, 0, 0.1)'};
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const TimeStamp = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${({ $isOwn }) => ($isOwn ? '#C7D2FE' : '#6B7280')};
  text-align: ${({ $isOwn }) => ($isOwn ? 'right' : 'left')};
  margin-top: 0.25rem;
`;

/**
 * MessageBubble component to display a single chat message.
 * @param {Object} props - The props for the component.
 * @param {Message} props.message - The message object containing content and timestamp.
 * @param {boolean} props.isOwn - Whether the message is sent by the current user.
 */
const MessageBubble = ({ message, isOwn }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <MessageContainer $isOwn={isOwn}>
      <BubbleWrapper $isOwn={isOwn}>
        <MessageText>{message.content}</MessageText>
        <TimeStamp $isOwn={isOwn}>{formattedTime}</TimeStamp>
      </BubbleWrapper>
    </MessageContainer>
  );
};

// PropTypes for type checking
MessageBubble.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  isOwn: PropTypes.bool.isRequired,
};

export default MessageBubble;
