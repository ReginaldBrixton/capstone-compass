'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import '../styles/global.css';

const EditorContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--card-shadow);
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SaveStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => (props.isSaving ? 'var(--warning-color)' : 'var(--success-color)')};
  }
`;

const EditorToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--background-color);
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const ToolbarButton = styled.button`
  padding: 0.5rem;
  background: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &.active {
    background: white;
    box-shadow: var(--card-shadow);
  }
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Editor = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  min-height: 500px;
  padding: 1rem;

  &:focus-within {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const Sidebar = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const FeedbackBadge = styled.div`
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;
`;

const GuidelineCard = styled.div`
  background: var(--background-color);
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const WordCount = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &.primary {
    background: var(--primary-color);
    color: white;

    &:hover {
      background: #1d4ed8;
    }
  }

  &.secondary {
    background: white;
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--background-color);
    }
  }
const ChapterEditor = ({ chapterTitle, guidelines, initialContent = '', onSave, onSubmit, submissionId }) => {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);
  const [isCheckingFeedback, setIsCheckingFeedback] = useState(false);

  useEffect(() => {
    // Auto-save every 30 seconds
    const autoSaveInterval = setInterval(() => {
      handleSave();
    }, 30000);
    return () => clearInterval(autoSaveInterval);
  }, [content]);

  useEffect(() => {
    const checkFeedback = async () => {
      if (!submissionId) return;
      
      setIsCheckingFeedback(true);
      try {
        const response = await fetch(`/api/submissions?id=${submissionId}`);
        if (response.ok) {
          const data = await response.json();
          setHasFeedback(!!data?.feedback);
        }
      } catch (error) {
        console.error('Failed to check feedback:', error);
      } finally {
        setIsCheckingFeedback(false);
      }
    };

    checkFeedback();

    // Check for new feedback every 5 minutes
    const feedbackInterval = setInterval(checkFeedback, 300000);
    return () => clearInterval(feedbackInterval);
  }, [submissionId]);

  useEffect(() => {
    // Update word count
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSave = async () => {
    if (!content || isSaving) return;

    setIsSaving(true);
    try {
      await onSave(content);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!content) return;

    try {
      await onSubmit(content);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <div>
          <h1>{chapterTitle}</h1>
          {hasFeedback && (
            <FeedbackBadge>
              New Feedback Available
            </FeedbackBadge>
          )}
          <SaveStatus isSaving={isSaving}>
            {isSaving
              ? 'Saving...'
              : lastSaved
                ? `Last saved ${lastSaved.toLocaleTimeString()}`
                : 'Not saved yet'}
          </SaveStatus>
        </div>
        <WordCount>{wordCount} words</WordCount>
      </EditorHeader>

      <EditorToolbar>
        <ToolbarButton title="Bold">B</ToolbarButton>
        <ToolbarButton title="Italic">I</ToolbarButton>
        <ToolbarButton title="Underline">U</ToolbarButton>
        <ToolbarButton title="Bullet List">•</ToolbarButton>
        <ToolbarButton title="Numbered List">1.</ToolbarButton>
      </EditorToolbar>

      <ContentArea>
        <Editor
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setContent(e.currentTarget.textContent)}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <Sidebar>
          <h3>Chapter Guidelines</h3>
          {guidelines.map((guideline, index) => (
            <GuidelineCard key={index}>
              <h4>{guideline.title}</h4>
              <p>{guideline.description}</p>
            </GuidelineCard>
          ))}
        </Sidebar>
      </ContentArea>

      <ActionButtons>
        <Button className="primary" onClick={handleSubmit}>
          Submit for Review
        </Button>
        <Button className="secondary" onClick={handleSave}>
          Save Draft
        </Button>
      </ActionButtons>
    </EditorContainer>
  );
};

export default ChapterEditor;
