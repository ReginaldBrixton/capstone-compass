'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import { ProgressTracker } from '../../components';

import '../../styles/global.css';

const Container = styled.div.attrs({
  className: 'capstone-one-container',
})`
  max-width: clamp(320px, 90vw, 1440px);
  margin: 0 auto;
  padding: var(--spacing-lg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  .page-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
  }

  .page-title {
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 4px;
      background: var(--primary-color);
      border-radius: var(--radius-sm);
    }
  }

  .page-description {
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ChapterGrid = styled.div.attrs({
  className: 'chapter-grid',
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
  perspective: 1000px;
`;

const ChapterCard = styled.div.attrs({
  className: (props) => `chapter-card chapter-${props.chapterId}`,
  id: (props) => `chapter-${props.chapterId}`,
})`
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--card-shadow);
  transition: var(--transition-normal);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: translateZ(0);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${(props) => {
      switch (props.status) {
        case 'completed':
          return 'var(--success-color)';
        case 'in-progress':
          return 'var(--warning-color)';
        default:
          return 'var(--border-color)';
      }
    }};
  }

  &:hover {
    transform: translateY(-8px) translateZ(20px);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .chapter-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-sm);
  }

  .chapter-content {
    flex: 1;
  }

  h2 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const StatusIndicator = styled.div.attrs({
  className: 'status-indicator',
})`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  background: ${(props) => {
    switch (props.status) {
      case 'completed':
        return 'rgba(34, 197, 94, 0.1)';
      case 'in-progress':
        return 'rgba(245, 158, 11, 0.1)';
      default:
        return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'completed':
        return 'var(--success-color)';
      case 'in-progress':
        return 'var(--warning-color)';
      default:
        return 'var(--text-secondary)';
    }
  }};
`;

const ActionButton = styled.button.attrs({
  className: (props) => `action-button action-${props.chapterId}`,
  id: (props) => `action-${props.chapterId}`,
})`
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: clamp(0.875rem, 2vw, 1rem);
  cursor: pointer;
  transition: var(--transition-normal);
  width: 100%;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    transition: transform 0.5s;
  }

  &:hover:not(:disabled) {
    background: var(--primary-dark);
    transform: translateY(-2px);

    &::before {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &:disabled {
    background: var(--border-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

const DeadlineIndicator = styled.div.attrs({
  className: 'deadline-indicator',
})`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: ${(props) => (props.isOverdue ? 'var(--error-color)' : 'var(--text-secondary)')};
  padding: var(--spacing-xs) var(--spacing-sm);
  background: ${(props) => (props.isOverdue ? 'rgba(239, 68, 68, 0.1)' : 'transparent')};
  border-radius: var(--radius-md);

  svg {
    width: clamp(0.875rem, 2vw, 1rem);
    height: clamp(0.875rem, 2vw, 1rem);
  }
`;

const steps = [
  { id: 'chapter-one', label: 'Chapter 1: Introduction' },
  { id: 'chapter-two', label: 'Chapter 2: Literature Review' },
  { id: 'chapter-three', label: 'Chapter 3: Methodology' },
  { id: 'defense', label: 'Defense' },
];

const chapters = [
  {
    id: 'chapter-one',
    title: 'Chapter 1: Introduction',
    description: 'Background, Problem Statement, and Research Objectives',
    status: 'in-progress',
    deadline: '2024-02-15',
    route: 'chapter-one',
  },
  {
    id: 'chapter-two',
    title: 'Chapter 2: Literature Review',
    description: 'Theoretical Framework and Related Studies',
    status: 'not-started',
    deadline: '2024-03-15',
    route: 'chapter-two',
  },
  {
    id: 'chapter-three',
    title: 'Chapter 3: Methodology',
    description: 'Research Design and Methods',
    status: 'not-started',
    deadline: '2024-04-15',
    route: 'chapter-three',
  },
];

export default function CapstoneOne() {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  const isDeadlineOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <Container className="capstone-one-page fade-in">
      <div className="page-header">
        <h1 className="page-title">Capstone One Progress</h1>
        <p className="page-description">
          Track and manage your progress through each chapter of your capstone project. Complete the
          chapters in sequence and submit for review.
        </p>
      </div>

      <ProgressTracker steps={steps} currentStep={currentStep} />

      <ChapterGrid>
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapterId={chapter.id} status={chapter.status}>
            <div className="chapter-header">
              <h2>{chapter.title}</h2>
              <StatusIndicator status={chapter.status}>
                {chapter.status === 'completed'
                  ? 'Completed'
                  : chapter.status === 'in-progress'
                    ? 'In Progress'
                    : 'Not Started'}
              </StatusIndicator>
            </div>

            <div className="chapter-content">
              <p>{chapter.description}</p>

              <DeadlineIndicator isOverdue={isDeadlineOverdue(chapter.deadline)}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                </svg>
                <span>Deadline: {new Date(chapter.deadline).toLocaleDateString()}</span>
                {isDeadlineOverdue(chapter.deadline) && <span>(Overdue)</span>}
              </DeadlineIndicator>
            </div>

            <Link
              href={`/student/projects/capstone-one/${params.id}/${chapter.route}`}
              style={{ width: '100%' }}
            >
              <ActionButton
                disabled={chapter.status === 'completed'}
                chapterId={chapter.id}
                aria-label={`${chapter.status === 'completed' ? 'View' : chapter.status === 'in-progress' ? 'Continue' : 'Start'} ${chapter.title}`}
              >
                {chapter.status === 'completed'
                  ? 'View Chapter'
                  : chapter.status === 'in-progress'
                    ? 'Continue Writing'
                    : 'Start Chapter'}
              </ActionButton>
            </Link>
          </ChapterCard>
        ))}
      </ChapterGrid>
    </Container>
  );
}
