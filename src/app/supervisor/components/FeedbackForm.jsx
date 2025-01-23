'use client';

import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RubricItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;

const GradeInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
`;

const CommentBox = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  resize: vertical;
  margin-top: 0.5rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: var(--primary-color);
  color: white;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const FeedbackForm = ({
  feedback,
  onScoreChange,
  onCommentsChange,
  onSubmit,
  isSubmitting,
  errors = {},
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(feedback);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Evaluation</h2>

      <RubricItem>
        <h3>Research Methodology</h3>
        <GradeInput
          type="number"
          min="0"
          max="100"
          value={feedback.methodology.score}
          onChange={(e) =>
            onScoreChange('methodology', parseInt(e.target.value))
          }
        />
        {errors.methodology?.score && (
          <ErrorMessage>{errors.methodology.score}</ErrorMessage>
        )}
        <CommentBox
          placeholder="Comments on methodology..."
          value={feedback.methodology.comments}
          onChange={(e) => onCommentsChange('methodology', e.target.value)}
        />
        {errors.methodology?.comments && (
          <ErrorMessage>{errors.methodology.comments}</ErrorMessage>
        )}
      </RubricItem>

      <RubricItem>
        <h3>Data Analysis</h3>
        <GradeInput
          type="number"
          min="0"
          max="100"
          value={feedback.analysis.score}
          onChange={(e) => onScoreChange('analysis', parseInt(e.target.value))}
        />
        {errors.analysis?.score && (
          <ErrorMessage>{errors.analysis.score}</ErrorMessage>
        )}
        <CommentBox
          placeholder="Comments on analysis..."
          value={feedback.analysis.comments}
          onChange={(e) => onCommentsChange('analysis', e.target.value)}
        />
        {errors.analysis?.comments && (
          <ErrorMessage>{errors.analysis.comments}</ErrorMessage>
        )}
      </RubricItem>

      <RubricItem>
        <h3>Presentation & Structure</h3>
        <GradeInput
          type="number"
          min="0"
          max="100"
          value={feedback.presentation.score}
          onChange={(e) =>
            onScoreChange('presentation', parseInt(e.target.value))
          }
        />
        {errors.presentation?.score && (
          <ErrorMessage>{errors.presentation.score}</ErrorMessage>
        )}
        <CommentBox
          placeholder="Comments on presentation..."
          value={feedback.presentation.comments}
          onChange={(e) => onCommentsChange('presentation', e.target.value)}
        />
        {errors.presentation?.comments && (
          <ErrorMessage>{errors.presentation.comments}</ErrorMessage>
        )}
      </RubricItem>

      <RubricItem>
        <h3>Overall Comments</h3>
        <CommentBox
          placeholder="Overall feedback and suggestions..."
          value={feedback.overallComments}
          onChange={(e) => onCommentsChange('overallComments', e.target.value)}
        />
        {errors.overallComments && (
          <ErrorMessage>{errors.overallComments}</ErrorMessage>
        )}
      </RubricItem>

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </SubmitButton>
    </FormContainer>
  );
};

export default FeedbackForm;
