'use client';

import React from 'react';
import styled from 'styled-components';
const RubricContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;
const RubricItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;
const RubricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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
  margin-top: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;
const CriterionDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;
const MaxScore = styled.span`
  color: #666;
  font-size: 0.9rem;
`;
const RubricCriterion = ({
  title,
  description,
  maxScore,
  score,
  comments,
  onScoreChange,
  onCommentsChange,
}) => (
  <RubricItem data-oid="2c5zuip">
    <RubricHeader data-oid="v3l_fre">
      <h3 data-oid="a_as2hl">{title}</h3>
      <MaxScore data-oid="-xb5p71">Max Score: {maxScore}</MaxScore>
    </RubricHeader>
    <CriterionDescription data-oid="suu.y08">{description}</CriterionDescription>
    <GradeInput
      type="number"
      min="0"
      max={maxScore}
      value={score}
      onChange={(e) =>
        onScoreChange(Math.min(maxScore, Math.max(0, parseInt(e.target.value) || 0)))
      }
      data-oid="z797juo"
    />
    <CommentBox
      placeholder={`Comments on ${title.toLowerCase()}...`}
      value={comments}
      onChange={(e) => onCommentsChange(e.target.value)}
      data-oid="uuf2wrx"
    />
  </RubricItem>
);
const EvaluationRubric = ({ criteria, feedback, onFeedbackChange }) => {
  const handleScoreChange = (criterionId, value) => {
    onFeedbackChange({
      ...feedback,
      [criterionId]: {
        ...feedback[criterionId],
        score: value,
      },
    });
  };
  const handleCommentsChange = (criterionId, value) => {
    onFeedbackChange({
      ...feedback,
      [criterionId]: {
        ...feedback[criterionId],
        comments: value,
      },
    });
  };
  return (
    <RubricContainer data-oid="dqdae2i">
      {criteria.map((criterion) => (
        <RubricCriterion
          key={criterion.id}
          title={criterion.title}
          description={criterion.description}
          maxScore={criterion.maxScore}
          score={feedback[criterion.id]?.score || 0}
          comments={feedback[criterion.id]?.comments || ''}
          onScoreChange={(value) => handleScoreChange(criterion.id, value)}
          onCommentsChange={(value) => handleCommentsChange(criterion.id, value)}
          data-oid="xoa915i"
        />
      ))}
    </RubricContainer>
  );
};
export default EvaluationRubric;
