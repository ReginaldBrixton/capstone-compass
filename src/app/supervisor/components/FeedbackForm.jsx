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
    <FormContainer onSubmit={handleSubmit} data-oid="4zh.dfn">
      <h2 data-oid="2dl94.x">Evaluation</h2>

      <RubricItem data-oid="4xojsv5">
        <h3 data-oid=".6vs856">Research Methodology</h3>
        <GradeInput
          type="number"
          min="0"
          max="100"
          value={feedback.methodology.score}
          onChange={(e) => onScoreChange('methodology', parseInt(e.target.value))}
          data-oid="eeuqft2"
        />
        {errors.methodology?.score && (
          <ErrorMessage data-oid="uxakdep">{errors.methodology.score}</ErrorMessage>
        )}
        <CommentBox
          placeholder="Comments on methodology..."
          value={feedback.methodology.comments}
          onChange={(e) => onCommentsChange('methodology', e.target.value)}
          data-oid="dpvplzx"
        />
        {errors.methodology?.comments && (
          <ErrorMessage data-oid=":8y-l0s">{errors.methodology.comments}</ErrorMessage>
        )}
      </RubricItem>

      <RubricItem data-oid="fxq6roo">
        <h3 data-oid="7i7x_wr">Data Analysis</h3>
        <GradeInput
          type="number"
          min="0"
          max="100"
          value={feedback.analysis.score}
          onChange={(e) => onScoreChange('analysis', parseInt(e.target.value))}
          data-oid="h0oqs43"
        />
        {errors.analysis?.score && (
          <ErrorMessage data-oid="jrk5ht9">{errors.analysis.score}</ErrorMessage>
        )}
        <CommentBox
          placeholder="Comments on analysis..."
          value={feedback.analysis.comments}
          onChange={(e) => onCommentsChange('analysis', e.target.value)}
          data-oid=":w_a--0"
        />
        {errors.analysis?.comments && (
          <ErrorMessage data-oid="uz_8.0-">{errors.analysis.comments}</ErrorMessage>
        )}
      </RubricItem>

      <RubricItem data-oid="og4j5n9">
        <h3 data-oid="2t3g_l.">Presentation & Structure</h3>
        <GradeInput
          type="number"
          min="0"
          max="100"
          value={feedback.presentation.score}
          onChange={(e) => onScoreChange('presentation', parseInt(e.target.value))}
          data-oid="kqurzzw"
        />
        {errors.presentation?.score && (
          <ErrorMessage data-oid="dqlv0g6">{errors.presentation.score}</ErrorMessage>
        )}
        <CommentBox
          placeholder="Comments on presentation..."
          value={feedback.presentation.comments}
          onChange={(e) => onCommentsChange('presentation', e.target.value)}
          data-oid="fp8sq-7"
        />
        {errors.presentation?.comments && (
          <ErrorMessage data-oid="pg1tc0g">{errors.presentation.comments}</ErrorMessage>
        )}
      </RubricItem>

      <RubricItem data-oid="6xdq9cl">
        <h3 data-oid="cll-55-">Overall Comments</h3>
        <CommentBox
          placeholder="Overall feedback and suggestions..."
          value={feedback.overallComments}
          onChange={(e) => onCommentsChange('overallComments', e.target.value)}
          data-oid="v_lzld3"
        />
        {errors.overallComments && (
          <ErrorMessage data-oid="4h09ruo">{errors.overallComments}</ErrorMessage>
        )}
      </RubricItem>

      <SubmitButton type="submit" disabled={isSubmitting} data-oid="qwkyne.">
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </SubmitButton>
    </FormContainer>
  );
};
export default FeedbackForm;
