'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import { ChapterEditor } from '../../../components';

const ChapterOneContainer = styled.div.attrs({
  className: 'chapter-one-container',
})`
  max-width: clamp(320px, 90vw, 1440px);
  margin: 0 auto;
  padding: var(--spacing-lg);
  min-height: 100vh;
`;

const GuidelinesGrid = styled.div.attrs({
  className: 'guidelines-grid',
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

const GuidelineCard = styled.div.attrs({
  className: (props) => `guideline-card guideline-${props.index}`,
})`
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--card-shadow);
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--primary-color);
    opacity: 0.7;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.15);
  }

  h3 {
    color: var(--text-primary);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
  }

  p {
    color: var(--text-secondary);
    font-size: clamp(0.875rem, 2vw, 1rem);
    line-height: 1.6;
  }
`;

const chapterOneGuidelines = [
  {
    title: 'Background of the Study',
    description:
      'Provide context and rationale for your research. Explain why this study is important and relevant.',
  },
  {
    title: 'Problem Statement',
    description:
      'Clearly state the problem your research aims to address. Use specific and measurable terms.',
  },
  {
    title: 'Research Objectives',
    description:
      'List your main objective and specific objectives. Use action verbs and make them SMART.',
  },
  {
    title: 'Scope and Limitations',
    description:
      'Define what your study will and will not cover. Be specific about the boundaries of your research.',
  },
  {
    title: 'Significance of the Study',
    description:
      'Explain who will benefit from your research and how. Address both theoretical and practical implications.',
  },
];

export default function ChapterOne() {
  const params = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (content) => {
    try {
      setIsSaving(true);
      // TODO: Implement save logic
      console.log('Saving content:', content);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (content) => {
    try {
      setIsSubmitting(true);
      // TODO: Implement submission logic
      console.log('Submitting content:', content);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ChapterOneContainer>
      <GuidelinesGrid>
        {chapterOneGuidelines.map((guideline, index) => (
          <GuidelineCard key={index} index={index}>
            <h3>{guideline.title}</h3>
            <p>{guideline.description}</p>
          </GuidelineCard>
        ))}
      </GuidelinesGrid>

      <ChapterEditor
        chapterTitle="Chapter 1: Introduction"
        guidelines={chapterOneGuidelines}
        onSave={handleSave}
        onSubmit={handleSubmit}
        isSaving={isSaving}
        isSubmitting={isSubmitting}
      />
    </ChapterOneContainer>
  );
}
