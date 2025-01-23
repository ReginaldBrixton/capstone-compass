'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import { ChapterEditor } from '../../../components';

import '../../../styles/global.css';

const DataVisualizationPanel = styled.div`
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

const ChartContainer = styled.div`
  background: var(--background-color);
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 1rem 0;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataTable = styled.div`
  margin-top: 1rem;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      background: var(--background-color);
      font-weight: 500;
    }
  }
`;

const ToolbarButton = styled.button`
  padding: 0.5rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--background-color);
  }
`;

const FeedbackSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--card-shadow);
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const RubricScore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--background-color);
  border-radius: 0.375rem;
`;

const FeedbackComment = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: var(--background-color);
  border-radius: 0.375rem;
`;

const chapterFourGuidelines = [
  {
    title: 'Data Presentation',
    description:
      'Present your research findings using appropriate tables, charts, and graphs. Ensure data is clearly labeled and organized.',
  },
  {
    title: 'Statistical Analysis',
    description:
      'Include relevant statistical tests and their results. Explain the significance of your findings.',
  },
  {
    title: 'Findings Interpretation',
    description:
      'Interpret your results in relation to your research objectives. Discuss any patterns or trends in your data.',
  },
  {
    title: 'Visual Representation',
    description:
      'Use appropriate visualizations to support your findings. Include legends and explanations for all figures.',
  },
  {
    title: 'Discussion',
    description:
      'Compare your findings with existing literature. Explain any unexpected results or deviations from previous research.',
  },
];

const sampleData = {
  charts: [
    { id: 1, title: 'Response Distribution', type: 'bar' },
    { id: 2, title: 'Trend Analysis', type: 'line' },
    { id: 3, title: 'Comparison Results', type: 'pie' },
  ],
  tables: [
    {
      id: 1,
      title: 'Survey Responses',
      headers: ['Category', 'Count', 'Percentage'],
      data: [
        ['Response A', 45, '30%'],
        ['Response B', 60, '40%'],
        ['Response C', 45, '30%'],
      ],
    },
  ],
};
export default function ChapterFour() {
  const params = useParams();
  const { data: session } = useSession();
  const [feedback, setFeedback] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!session?.token) return;

      try {
        const response = await fetch(`/api/submissions?id=${params.id}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.feedback) {
            setFeedback(data);
          }
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [params.id, session?.token]);

  const handleSave = async (content) => {
    // TODO: Implement save logic
    console.log('Saving content:', content);
  };

  const handleSubmit = async (content) => {
    // TODO: Implement submission logic
    console.log('Submitting content:', content);
  };

  const insertChart = (chart) => {
    setSelectedChart(chart);
    // TODO: Implement chart insertion logic
  };

  const insertTable = (table) => {
    setSelectedTable(table);
    // TODO: Implement table insertion logic
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <ChapterEditor
          chapterTitle="Chapter 4: Results and Discussion"
          guidelines={chapterFourGuidelines}
          onSave={handleSave}
          onSubmit={handleSubmit}
        />
      </div>

      <DataVisualizationPanel>
        <h3>Data Visualizations</h3>
        <p className="text-secondary mb-4">Insert charts and tables into your chapter</p>

        <div>
          <h4>Charts</h4>
          {sampleData.charts.map((chart) => (
            <ToolbarButton key={chart.id} onClick={() => insertChart(chart)}>
              <span>{chart.title}</span>
              <span className="text-secondary">({chart.type})</span>
            </ToolbarButton>
          ))}
        </div>

        {selectedChart && (
          <ChartContainer>
            {/* Placeholder for actual chart component */}
            <p>Chart: {selectedChart.title}</p>
          </ChartContainer>
        )}

        <div style={{ marginTop: '1.5rem' }}>
          <h4>Data Tables</h4>
          {sampleData.tables.map((table) => (
            <ToolbarButton key={table.id} onClick={() => insertTable(table)}>
              {table.title}
            </ToolbarButton>
          ))}
        </div>

        {selectedTable && (
          <DataTable>
            <table>
              <thead>
                <tr>
                  {selectedTable.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedTable.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        )}
      </DataVisualizationPanel>
      {feedback && (
        <FeedbackSection>
          <FeedbackHeader>
            <h3>Supervisor Feedback</h3>
            <span className={`status-badge ${feedback.status}`}>
              {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
            </span>
          </FeedbackHeader>

          {feedback.rubricScores && (
            <div>
              <h4>Evaluation Scores</h4>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                {Object.entries(feedback.rubricScores).map(([criterion, score]) => (
                  <RubricScore key={criterion}>
                    <span>{criterion}:</span>
                    <strong>{score}/5</strong>
                  </RubricScore>
                ))}
              </div>
            </div>
          )}

          {feedback.feedback && (
            <FeedbackComment>
              <h4>Comments</h4>
              <p>{feedback.feedback}</p>
            </FeedbackComment>
          )}
        </FeedbackSection>
      )}
    </div>
  );
}