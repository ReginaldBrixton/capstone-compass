'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--card-shadow);
`;
const Header = styled.div`
  margin-bottom: 2rem;
`;
const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
const SubmissionContent = styled.div`
  padding: 1.5rem;
  background: var(--background-color);
  border-radius: 0.5rem;
  min-height: 400px;
`;
const FeedbackForm = styled.form`
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

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StatusMessage = styled.div`
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;

  &.success {
    background: #dcfce7;
    color: #166534;
  }

  &.error {
    background: #fee2e2;
    color: #991b1b;
  }
`;
const SubmissionReview = ({ params }) => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [feedback, setFeedback] = useState({
    methodology: {
      score: 0,
      comments: '',
    },
    analysis: {
      score: 0,
      comments: '',
    },
    presentation: {
      score: 0,
      comments: '',
    },
    overallComments: '',
  });
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        // Replace with actual API call
        const response = await fetch(`/api/submissions/${params.submissionId}`);
        const data = await response.json();
        setSubmission(data);
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'Failed to load submission',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [params.submissionId]);
  const handleScoreChange = (category, value) => {
    setFeedback((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        score: Math.min(100, Math.max(0, value)),
      },
    }));
  };
  const handleCommentsChange = (category, value) => {
    setFeedback((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        comments: value,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Replace with actual API call
      await fetch(`/api/submissions/${params.submissionId}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });
      setStatus({
        type: 'success',
        message: 'Feedback submitted successfully',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to submit feedback',
      });
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return <div data-oid="zxx_39s">Loading...</div>;
  }
  return (
    <ReviewContainer data-oid="-mgeb0c">
      <Header data-oid="d:3f66p">
        <h1 data-oid="urjbqz_">Review Submission</h1>
        {status && (
          <StatusMessage className={status.type} data-oid="b395dks">
            {status.message}
          </StatusMessage>
        )}
      </Header>

      <ContentSection data-oid="rc50b-i">
        <div data-oid="u1bwntg">
          <h2 data-oid=".2fkmt7">Submitted Content</h2>
          <SubmissionContent data-oid="b2qiimf">{submission?.content}</SubmissionContent>
        </div>

        <FeedbackForm onSubmit={handleSubmit} data-oid="ovb5alw">
          <h2 data-oid="h36fe9r">Evaluation</h2>

          <RubricItem data-oid="bjbhn66">
            <h3 data-oid="c9g70rq">Research Methodology</h3>
            <GradeInput
              type="number"
              min="0"
              max="100"
              value={feedback.methodology.score}
              onChange={(e) => handleScoreChange('methodology', parseInt(e.target.value))}
              data-oid="medkpjw"
            />
            <CommentBox
              placeholder="Comments on methodology..."
              value={feedback.methodology.comments}
              onChange={(e) => handleCommentsChange('methodology', e.target.value)}
              data-oid="crb.i3x"
            />
          </RubricItem>

          <RubricItem data-oid="obfk117">
            <h3 data-oid="0a9pcwe">Data Analysis</h3>
            <GradeInput
              type="number"
              min="0"
              max="100"
              value={feedback.analysis.score}
              onChange={(e) => handleScoreChange('analysis', parseInt(e.target.value))}
              data-oid="xfv6pcv"
            />
            <CommentBox
              placeholder="Comments on analysis..."
              value={feedback.analysis.comments}
              onChange={(e) => handleCommentsChange('analysis', e.target.value)}
              data-oid="awrl3nr"
            />
          </RubricItem>

          <RubricItem data-oid=".wqkd0-">
            <h3 data-oid="b90whnv">Presentation & Structure</h3>
            <GradeInput
              type="number"
              min="0"
              max="100"
              value={feedback.presentation.score}
              onChange={(e) => handleScoreChange('presentation', parseInt(e.target.value))}
              data-oid="hx4yr7b"
            />
            <CommentBox
              placeholder="Comments on presentation..."
              value={feedback.presentation.comments}
              onChange={(e) => handleCommentsChange('presentation', e.target.value)}
              data-oid="1o.98xg"
            />
          </RubricItem>

          <RubricItem data-oid="vy-jg._">
            <h3 data-oid="nf3kkiz">Overall Comments</h3>
            <CommentBox
              placeholder="Overall feedback and suggestions..."
              value={feedback.overallComments}
              onChange={(e) =>
                setFeedback((prev) => ({
                  ...prev,
                  overallComments: e.target.value,
                }))
              }
              data-oid="jv7zf.l"
            />
          </RubricItem>

          <Button type="submit" className="primary" disabled={saving} data-oid="tfoqmxs">
            {saving ? 'Submitting...' : 'Submit Review'}
          </Button>
        </FeedbackForm>
      </ContentSection>
    </ReviewContainer>
  );
};
export default SubmissionReview;
