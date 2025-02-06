import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
const TimelineWrapper = styled.div.attrs({
  className: 'timeline-wrapper',
})`
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-color);
  }
`;
const TimelineItemStyled = styled(motion.div).attrs({
  className: (props) => `timeline-item ${props.$isCompleted ? 'completed' : ''}`,
})`
  position: relative;
  padding-left: 3rem;
  margin-bottom: 1.5rem;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${(props) =>
      props.$isCompleted ? 'var(--success-color)' : 'var(--primary-color)'};
    transition: all 0.3s ease;
  }

  &:hover::before {
    transform: scale(1.2);
  }
`;
const TimelineContent = styled.div.attrs({
  className: 'timeline-content',
})`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
    color: var(--primary-color);
    font-size: 1.1rem;
  }

  p {
    margin: 0.5rem 0 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;
const TimelineItem = ({ event, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Use a consistent date format that will be the same on server and client
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <TimelineItemStyled
      $isCompleted={event.isCompleted}
      onClick={() => onClick(event)}
      whileHover={{
        x: 8,
      }}
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      data-oid="eo4ify_"
    >
      <TimelineContent data-oid="43csdk1">
        <h3 data-oid="494s1ln">{event.title}</h3>
        <p data-oid="jl1f_2z">Due: {formatDate(event.date)}</p>
      </TimelineContent>
    </TimelineItemStyled>
  );
};
const Timeline = ({ events, onEventClick }) => {
  return (
    <TimelineWrapper data-oid="nb_d5v_">
      {events.map((event) => (
        <TimelineItem key={event.id} event={event} onClick={onEventClick} data-oid="19s5j3y" />
      ))}
    </TimelineWrapper>
  );
};
export default Timeline;
