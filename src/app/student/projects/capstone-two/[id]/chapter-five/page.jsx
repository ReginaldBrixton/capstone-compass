'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import { ChapterEditor } from '../../../components';

import '../../../styles/global.css';

const SummaryPanel = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  z-index: 10;

  @media (max-width: 1400px) {
    position: static;
    transform: none;
    width: 100%;
    margin-top: 2rem;
  }
`;

const SummarySection = styled.div`
  background: var(--background-color);
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 1rem 0;
`;

const ObjectivesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    background: white;
    border-radius: 0.375rem;

    &::before {
      content: '•';
      color: var(--primary-color);
    }
  }
`;

const FindingCard = styled.div`
  background: white;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid var(--primary-color);
`;

const RecommendationInput = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  margin: 0.5rem 0;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: var(--background-color);
  border: 1px dashed var(--border-color);
  border-radius: 0.375rem;
  color: var(--text-secondary);
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background: white;
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`;

const chapterFiveGuidelines = [
  {
    title: 'Research Summary',
    description:
      'Provide a concise summary of your research problem, objectives, and methodology.',
  },
  {
    title: 'Key Findings',
    description:
      'Summarize the main findings and their significance. Link them back to your research objectives.',
  },
  {
    title: 'Conclusions',
    description:
      'Draw conclusions based on your findings. Address each research objective.',
  },
  {
    title: 'Recommendations',
    description:
      'Provide practical recommendations based on your findings. Suggest areas for future research.',
  },
  {
    title: 'Limitations',
    description:
      'Discuss any limitations of your study and how they might have affected your results.',
  },
];

const sampleObjectives = [
  'To analyze the impact of remote work on employee productivity',
  'To identify key factors affecting work-life balance in remote settings',
  'To develop recommendations for improving remote work policies',
];

const sampleFindings = [
  {
    id: 1,
    finding:
      '75% of employees reported increased productivity when working remotely',
    objective: 1,
  },
  {
    id: 2,
    finding:
      'Flexible schedules were identified as the primary factor in work-life balance',
    objective: 2,
  },
  {
    id: 3,
    finding:
      'Regular virtual team meetings improved collaboration and engagement',
    objective: 3,
  },
];

export default function ChapterFive() {
  const params = useParams();
  const [recommendations, setRecommendations] = useState(['']);
  const [newRecommendation, setNewRecommendation] = useState('');

  const handleSave = async (content) => {
    // TODO: Implement save logic
    console.log('Saving content:', content);
  };

  const handleSubmit = async (content) => {
    // TODO: Implement submission logic
    console.log('Submitting content:', content);
  };

  const addRecommendation = () => {
    if (newRecommendation.trim()) {
      setRecommendations([...recommendations, newRecommendation]);
      setNewRecommendation('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <ChapterEditor
          chapterTitle="Chapter 5: Conclusion and Recommendations"
          guidelines={chapterFiveGuidelines}
          onSave={handleSave}
          onSubmit={handleSubmit}
        />
      </div>

      <SummaryPanel>
        <h3>Research Summary</h3>

        <SummarySection>
          <h4>Research Objectives</h4>
          <ObjectivesList>
            {sampleObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ObjectivesList>
        </SummarySection>

        <SummarySection>
          <h4>Key Findings</h4>
          {sampleFindings.map((item) => (
            <FindingCard key={item.id}>
              <p>{item.finding}</p>
              <small className="text-secondary">
                Related to Objective {item.objective}
              </small>
            </FindingCard>
          ))}
        </SummarySection>

        <SummarySection>
          <h4>Recommendations</h4>
          {recommendations.map((rec, index) => (
            <RecommendationInput
              key={index}
              value={rec}
              onChange={(e) => {
                const newRecs = [...recommendations];
                newRecs[index] = e.target.value;
                setRecommendations(newRecs);
              }}
              placeholder="Enter your recommendation..."
            />
          ))}
          <RecommendationInput
            value={newRecommendation}
            onChange={(e) => setNewRecommendation(e.target.value)}
            placeholder="Add a new recommendation..."
          />
          <AddButton onClick={addRecommendation}>
            + Add Recommendation
          </AddButton>
        </SummarySection>
      </SummaryPanel>
    </div>
  );
}
