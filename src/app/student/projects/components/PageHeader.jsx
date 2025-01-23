'use client';

import React from 'react';
import styled from 'styled-components';

import { useProject } from '../context/ProjectContext';
import { formatDate } from '../utils/dateUtils';
import { calculateTimeRemaining } from '../utils/projectUtils';

import '../styles/global.css';

const HeaderContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1rem 0 2rem;
  box-shadow: var(--card-shadow);

  @media (max-width: 768px) {
    border-radius: 0;
    margin: -1rem -1rem 1rem -1rem;
    padding: 1rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TitleSection = styled.div`
  flex: 1;
  min-width: 0; // Prevents flex item from overflowing
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
  font-size: clamp(1.5rem, 5vw, 2rem);
  line-height: 1.2;
  overflow-wrap: break-word;
`;

const Description = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: clamp(0.875rem, 4vw, 1rem);
  line-height: 1.5;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  white-space: nowrap;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &.primary {
    background: var(--primary-color);
    color: white;

    &:hover {
      background: var(--primary-dark);
    }
  }

  &.secondary {
    background: white;
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--background-color);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ProgressSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);

  @media (max-width: 768px) {
    margin-top: 1rem;
    padding-top: 1rem;
  }
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProgressItem = styled.div`
  background: var(--background-color);
  padding: 1rem;
  border-radius: 0.375rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  span {
    font-size: 0.875rem;
  }

  strong {
    color: ${(props) => (props.progress >= 100 ? 'var(--success-color)' : 'var(--text-primary)')};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: white;
  border-radius: 0.25rem;
  overflow: hidden;

  div {
    height: 100%;
    background: ${(props) =>
      props.progress >= 100 ? 'var(--success-color)' : 'var(--primary-color)'};
    width: ${(props) => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const TimeRemaining = ({ timeRemaining, deadline }) => (
  <MetaItem>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
    <span>Deadline:</span>
    <span className={`time-remaining ${timeRemaining?.isOverdue ? 'overdue' : ''}`}>
      {formatDate(deadline)} ({timeRemaining?.timeString})
    </span>
  </MetaItem>
);

const PageHeader = ({
  title,
  description,
  metadata,
  actions,
  deadline,
  timeRemaining,
  ...props
}) => {
  const { state } = useProject();

  return (
    <HeaderContainer {...props}>
      <HeaderContent>
        <TitleSection>
          <Title>{title}</Title>
          <Description>{description}</Description>

          <MetaInfo>
            {metadata.wordCount && (
              <MetaItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span>Words:</span>
                <strong>{metadata.wordCount.toLocaleString()}</strong>
              </MetaItem>
            )}

            {metadata.lastModified && (
              <MetaItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>Modified:</span>
                <strong>{formatDate(metadata.lastModified)}</strong>
              </MetaItem>
            )}

            {deadline && <TimeRemaining timeRemaining={timeRemaining} deadline={deadline} />}
          </MetaInfo>
        </TitleSection>

        <ActionButtons>
          {actions.secondaryAction && (
            <Button className="secondary" onClick={actions.secondaryAction.onClick}>
              {actions.secondaryAction.icon && <span>{actions.secondaryAction.icon}</span>}
              {actions.secondaryAction.label}
            </Button>
          )}

          {actions.primaryAction && (
            <Button className="primary" onClick={actions.primaryAction.onClick}>
              {actions.primaryAction.icon && <span>{actions.primaryAction.icon}</span>}
              {actions.primaryAction.label}
            </Button>
          )}
        </ActionButtons>
      </HeaderContent>

      {metadata.progressItems && metadata.progressItems.length > 0 && (
        <ProgressSection>
          <h3>Progress Overview</h3>
          <ProgressGrid>
            {metadata.progressItems.map((item, index) => (
              <ProgressItem key={index}>
                <ProgressHeader progress={item.progress}>
                  <span>{item.label}</span>
                  <strong>{item.progress}%</strong>
                </ProgressHeader>
                <ProgressBar progress={item.progress}>
                  <div />
                </ProgressBar>
              </ProgressItem>
            ))}
          </ProgressGrid>
        </ProgressSection>
      )}
    </HeaderContainer>
  );
};

export default PageHeader;
