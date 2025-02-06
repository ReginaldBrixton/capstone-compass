'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { ProgressTracker } from '../../components';
import '../../styles/global.css';
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;
const ChapterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;
const ChapterCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.1);
  }
`;
const ResultsSection = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  margin: 2rem 0;
`;
const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;
const ChartPlaceholder = styled.div`
  background: var(--background-color);
  border-radius: 0.375rem;
  padding: 1.5rem;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
`;
const steps = [
  {
    id: 'chapter-four',
    label: 'Chapter 4: Results',
  },
  {
    id: 'chapter-five',
    label: 'Chapter 5: Conclusion',
  },
  {
    id: 'defense',
    label: 'Final Defense',
  },
];
const chapters = [
  {
    id: 'chapter-four',
    title: 'Chapter 4: Results and Discussion',
    description: 'Present and analyze your research findings',
    status: 'not-started',
    deadline: '2024-05-15',
    route: 'chapter-four',
  },
  {
    id: 'chapter-five',
    title: 'Chapter 5: Conclusion',
    description: 'Summarize findings and provide recommendations',
    status: 'not-started',
    deadline: '2024-06-15',
    route: 'chapter-five',
  },
];
const ResultsPreview = () => (
  <ResultsSection data-oid="r87gv2:">
    <h2 data-oid="q9dt79b">Research Results Overview</h2>
    <p className="mb-4 text-secondary" data-oid="c5sxp7x">
      Visual representation of your key findings
    </p>

    <ChartGrid data-oid="k5vlq83">
      <div data-oid="a.u5u4-">
        <h3 data-oid="lun4hus">Data Distribution</h3>
        <ChartPlaceholder data-oid="j9ip40g">Distribution Chart Placeholder</ChartPlaceholder>
      </div>
      <div data-oid="46lzu_:">
        <h3 data-oid="t:.ro6.">Key Metrics</h3>
        <ChartPlaceholder data-oid="wcjbfdy">Metrics Chart Placeholder</ChartPlaceholder>
      </div>
      <div data-oid=".b4kki8">
        <h3 data-oid="flhhzn-">Comparative Analysis</h3>
        <ChartPlaceholder data-oid="67qd1ti">Comparison Chart Placeholder</ChartPlaceholder>
      </div>
    </ChartGrid>
  </ResultsSection>
);
export default function CapstoneTwo() {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const isDeadlineOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };
  return (
    <Container className="fade-in" data-oid="b.0k-ga">
      <h1 data-oid="fexiaea">Capstone Two Progress</h1>
      <p className="mb-4 text-secondary" data-oid=":br5t4e">
        Complete your research with data analysis and conclusions
      </p>

      <ProgressTracker steps={steps} currentStep={currentStep} data-oid="03399vk" />

      <ResultsPreview data-oid="oclrjn5" />

      <ChapterGrid data-oid="w3e4clf">
        {chapters.map((chapter) => (
          <Link
            href={`/student/projects/capstone-two/${params.id}/${chapter.route}`}
            key={chapter.id}
            data-oid="2r8.xyb"
          >
            <ChapterCard data-oid="z05.29v">
              <h2 data-oid="9sb69l_">{chapter.title}</h2>
              <p data-oid="jk7ldb0">{chapter.description}</p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                }}
                data-oid="6986tfn"
              >
                <span className={`status-badge ${chapter.status}`} data-oid="ps34drv">
                  {chapter.status.replace('-', ' ')}
                </span>
                <span
                  className={isDeadlineOverdue(chapter.deadline) ? 'text-danger' : 'text-secondary'}
                  data-oid="jcqmt.v"
                >
                  Due: {new Date(chapter.deadline).toLocaleDateString()}
                </span>
              </div>
            </ChapterCard>
          </Link>
        ))}
      </ChapterGrid>
    </Container>
  );
}
