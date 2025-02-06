'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { DefenseScheduler } from '../../../components';
const DefenseContainer = styled.div.attrs({
  className: 'defense-container',
})`
  max-width: clamp(320px, 90vw, 1440px);
  margin: 0 auto;
  padding: var(--spacing-lg);
  min-height: 100vh;
`;
const PageHeader = styled.div.attrs({
  className: 'defense-header',
})`
  text-align: center;
  margin-bottom: var(--spacing-xl);

  h1 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 4px;
      background: var(--primary-color);
      border-radius: var(--radius-sm);
    }
  }

  p {
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
`;
const ContentGrid = styled.div.attrs({
  className: 'defense-content-grid',
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;
const Card = styled.div.attrs({
  className: (props) => `defense-card ${props.className || ''}`,
})`
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--card-shadow);
  transition: var(--transition-normal);
  height: 100%;

  h2 {
    color: var(--text-primary);
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    border-bottom: 2px solid var(--border-color);
  }
`;
const GuidelinesList = styled.ul.attrs({
  className: 'guidelines-list',
})`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;
const GuidelineItem = styled.li.attrs({
  className: 'guideline-item',
})`
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--background-gradient);
  border-radius: var(--radius-md);
  transition: var(--transition-normal);

  &:hover {
    transform: translateX(4px);
  }

  &::before {
    content: '→';
    color: var(--primary-color);
    font-weight: bold;
  }
`;
const RequirementsList = styled.ul.attrs({
  className: 'requirements-list',
})`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;
const RequirementItem = styled.li.attrs({
  className: 'requirement-item',
})`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: ${(props) =>
    props.isComplete ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border-radius: var(--radius-md);
  color: ${(props) => (props.isComplete ? 'var(--success-color)' : 'var(--error-color)')};
  transition: var(--transition-normal);

  &:hover {
    transform: translateX(4px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
const PanelMembersList = styled.div.attrs({
  className: 'panel-members-list',
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: var(--spacing-md);
`;
const PanelMemberCard = styled.div.attrs({
  className: (props) => `panel-member-card status-${props.status}`,
})`
  padding: var(--spacing-md);
  background: var(--card-bg);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid
    ${(props) => {
      switch (props.status) {
        case 'confirmed':
          return 'var(--success-color)';
        case 'pending':
          return 'var(--warning-color)';
        default:
          return 'var(--border-color)';
      }
    }};

  h3 {
    color: var(--text-primary);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    margin-bottom: var(--spacing-xs);
  }

  .role {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .status {
    margin-top: var(--spacing-xs);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${(props) => {
      switch (props.status) {
        case 'confirmed':
          return 'var(--success-color)';
        case 'pending':
          return 'var(--warning-color)';
        default:
          return 'var(--text-secondary)';
      }
    }};
  }
`;

// Sample data - In a real app, this would come from an API
const sampleSlots = [
  {
    id: 1,
    datetime: '2024-02-15T09:00:00',
    isBooked: false,
  },
  {
    id: 2,
    datetime: '2024-02-15T10:30:00',
    isBooked: false,
  },
  {
    id: 3,
    datetime: '2024-02-15T13:00:00',
    isBooked: true,
  },
  {
    id: 4,
    datetime: '2024-02-15T14:30:00',
    isBooked: false,
  },
  {
    id: 5,
    datetime: '2024-02-16T09:00:00',
    isBooked: false,
  },
  {
    id: 6,
    datetime: '2024-02-16T10:30:00',
    isBooked: false,
  },
];
const samplePanelMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Panel Chair',
    status: 'confirmed',
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    role: 'Technical Expert',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    role: 'Subject Matter Expert',
    status: 'confirmed',
  },
];
const defenseRequirements = [
  {
    id: 1,
    description: 'All chapters submitted and approved',
    isComplete: true,
  },
  {
    id: 2,
    description: 'Presentation slides prepared',
    isComplete: false,
  },
  {
    id: 3,
    description: 'Technical documentation complete',
    isComplete: true,
  },
  {
    id: 4,
    description: 'Mock defense completed',
    isComplete: false,
  },
];
const defenseGuidelines = [
  'Prepare a 20-minute presentation covering your research objectives, methodology, and preliminary findings.',
  'Ensure your presentation includes visual aids and clear explanations of your research process.',
  'Be prepared to answer questions about your methodology and findings.',
  'Dress professionally and arrive at least 15 minutes before your scheduled time.',
  'Have backup copies of all presentation materials.',
];
export default function CapstoneOneDefense() {
  const params = useParams();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  const handleScheduleDefense = async () => {
    if (!selectedSlot) return;
    try {
      // TODO: Implement scheduling logic
      console.log('Scheduling defense for slot:', selectedSlot);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Error scheduling defense:', error);
    }
  };
  return (
    <DefenseContainer data-oid="d8ygzxt">
      <PageHeader data-oid="se33j1e">
        <h1 data-oid="y_:tuyb">Defense Scheduling</h1>
        <p data-oid="3d-m4fs">Schedule your capstone defense and review important guidelines</p>
      </PageHeader>

      <ContentGrid data-oid="u670e0y">
        <Card className="requirements-card" data-oid="oidgazp">
          <h2 data-oid="za3n4x_">Requirements Checklist</h2>
          <RequirementsList data-oid="9xt0h2p">
            {defenseRequirements.map((req) => (
              <RequirementItem key={req.id} isComplete={req.isComplete} data-oid="mct-dz1">
                {req.isComplete ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" data-oid="6v52wqg">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      data-oid="4ei1pix"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor" data-oid="uqi2lm2">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                      data-oid="xgk.r1n"
                    />
                  </svg>
                )}
                {req.description}
              </RequirementItem>
            ))}
          </RequirementsList>
        </Card>

        <Card className="guidelines-card" data-oid="wil3jj.">
          <h2 data-oid="c685wlo">Defense Guidelines</h2>
          <GuidelinesList data-oid="ef3m:og">
            {defenseGuidelines.map((guideline, index) => (
              <GuidelineItem key={index} data-oid="qoyjcb8">
                {guideline}
              </GuidelineItem>
            ))}
          </GuidelinesList>
        </Card>

        <Card className="panel-card" data-oid="c_tjmzv">
          <h2 data-oid="bq6p5q.">Panel Members</h2>
          <PanelMembersList data-oid="i3bdsnt">
            {samplePanelMembers.map((member) => (
              <PanelMemberCard key={member.id} status={member.status} data-oid=":hvt6ez">
                <h3 data-oid="75-gdsm">{member.name}</h3>
                <div className="role" data-oid="33atstq">
                  {member.role}
                </div>
                <div className="status" data-oid="xmy8ebw">
                  {member.status}
                </div>
              </PanelMemberCard>
            ))}
          </PanelMembersList>
        </Card>
      </ContentGrid>

      <Card className="scheduler-card" data-oid="qkrc7:t">
        <h2 data-oid="d_vopsc">Schedule Your Defense</h2>
        <DefenseScheduler
          availableSlots={sampleSlots}
          selectedSlot={selectedSlot}
          onSlotSelect={handleSlotSelect}
          onSchedule={handleScheduleDefense}
          data-oid="_nxs3st"
        />
      </Card>
    </DefenseContainer>
  );
}
