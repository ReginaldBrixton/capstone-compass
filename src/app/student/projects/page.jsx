'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import './styles/global.css';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.1);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;

  div {
    height: 100%;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case 'In Progress':
        return '#dbeafe';
      case 'Completed':
        return '#dcfce7';
      case 'Not Started':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'In Progress':
        return '#1d4ed8';
      case 'Completed':
        return '#059669';
      case 'Not Started':
        return '#dc2626';
      default:
        return '#4b5563';
    }
  }};
`;

const ProjectPhases = [
  {
    id: 'proposal',
    title: 'Research Proposal',
    description: 'Submit and defend your research proposal',
    route: '/student/projects/proposal',
    status: 'Not Started',
    progress: 0,
  },
  {
    id: 'capstone-one',
    title: 'Capstone One',
    description: 'Complete chapters 1-3 of your thesis',
    route: '/student/projects/capstone-one/new',
    status: 'Not Started',
    progress: 0,
  },
  {
    id: 'capstone-two',
    title: 'Capstone Two',
    description: 'Complete chapters 4-5 and final defense',
    route: '/student/projects/capstone-two/new',
    status: 'Not Started',
    progress: 0,
  },
];

export default function ProjectsPage() {
  const [phases, setPhases] = useState(ProjectPhases);

  return (
    <DashboardContainer className="fade-in">
      <h1>My Research Journey</h1>
      <p className="mb-4 text-secondary">
        Track and manage your research progress through different phases
      </p>

      <ProjectsGrid>
        {phases.map((phase) => (
          <Link href={phase.route} key={phase.id}>
            <ProjectCard>
              <h2>{phase.title}</h2>
              <p>{phase.description}</p>
              <ProgressBar>
                <div style={{ width: `${phase.progress}%` }} />
              </ProgressBar>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <StatusBadge status={phase.status}>{phase.status}</StatusBadge>
                <span>{phase.progress}% Complete</span>
              </div>
            </ProjectCard>
          </Link>
        ))}
      </ProjectsGrid>
    </DashboardContainer>
  );
}
