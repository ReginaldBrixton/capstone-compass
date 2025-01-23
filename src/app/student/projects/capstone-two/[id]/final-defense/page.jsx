'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import Checklist from './components/Checklist';
import DefenseScheduler from './components/DefenseScheduler';
import Timeline from './components/Timeline';

const PageContainer = styled(motion.div).attrs({ className: 'final-defense-page' })`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header.attrs({ className: 'page-header' })`
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }
`;

const Section = styled(motion.section).attrs({ className: 'page-section' })`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--border-color);
  }
`;

const defenseGuidelines = [
  'Prepare a comprehensive 30-minute presentation covering all chapters',
  'Focus on research methodology, findings, and recommendations',
  'Include visual aids and clear data visualizations',
  'Be prepared for in-depth questions about your research',
  'Dress professionally and arrive 30 minutes before scheduled time',
];

const presentationChecklist = [
  { id: 1, text: 'Introduction slides prepared', category: 'Slides' },
  { id: 2, text: 'Methodology section reviewed', category: 'Slides' },
  { id: 3, text: 'Results visualizations created', category: 'Slides' },
  { id: 4, text: 'Conclusion slides finalized', category: 'Slides' },
  { id: 5, text: 'Practice presentation timing', category: 'Practice' },
  { id: 6, text: 'Prepare answers to common questions', category: 'Practice' },
  { id: 7, text: 'Technical setup checked', category: 'Technical' },
  { id: 8, text: 'Backup presentation copy ready', category: 'Technical' },
];

const timelineEvents = [
  { id: 1, title: 'Submit Final Manuscript', date: '2024-06-01', isCompleted: false },
  { id: 2, title: 'Schedule Defense Date', date: '2024-06-15', isCompleted: false },
  { id: 3, title: 'Submit Presentation Slides', date: '2024-06-25', isCompleted: false },
  { id: 4, title: 'Final Defense', date: '2024-07-01', isCompleted: false },
];

const sampleSlots = [
  { id: 1, datetime: '2024-07-01T09:00:00', isBooked: false },
  { id: 2, datetime: '2024-07-01T13:00:00', isBooked: false },
  { id: 3, datetime: '2024-07-02T09:00:00', isBooked: false },
  { id: 4, datetime: '2024-07-02T13:00:00', isBooked: false },
];

const samplePanelMembers = [
  { id: 1, name: 'Prof. David Anderson', role: 'Panel Chair', status: 'confirmed' },
  { id: 2, name: 'Dr. Lisa Wong', role: 'External Examiner', status: 'pending' },
  { id: 3, name: 'Dr. James Martinez', role: 'Technical Expert', status: 'confirmed' },
  { id: 4, name: 'Prof. Sarah Thompson', role: 'Subject Matter Expert', status: 'pending' },
];

const defenseRequirements = [
  { id: 1, description: 'All chapters approved by supervisor', isComplete: true },
  { id: 2, description: 'Final manuscript submitted', isComplete: false },
  { id: 3, description: 'Presentation slides reviewed', isComplete: false },
  { id: 4, description: 'Mock defense completed', isComplete: false },
  { id: 5, description: 'Technical requirements met', isComplete: true },
];

export default function FinalDefense() {
  const params = useParams();
  const [checklist, setChecklist] = useState(
    presentationChecklist.map((item) => ({ ...item, checked: false }))
  );

  const handleCheckItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleScheduleDefense = (selectedSlot) => {
    // TODO: Implement defense scheduling logic
    console.log('Scheduling final defense for:', selectedSlot);
  };

  const handleTimelineEvent = (event) => {
    // TODO: Implement timeline event handling
    console.log('Timeline event clicked:', event);
  };

  return (
    <PageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <h1>Final Defense Preparation</h1>
        <p>Prepare for your final thesis defense presentation and evaluation</p>
      </Header>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2>Defense Timeline</h2>
        <Timeline events={timelineEvents} onEventClick={handleTimelineEvent} />
      </Section>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2>Preparation Checklist</h2>
        <Checklist items={checklist} onToggleItem={handleCheckItem} />
      </Section>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DefenseScheduler
          availableSlots={sampleSlots}
          panelMembers={samplePanelMembers}
          requirements={defenseRequirements}
          onSchedule={handleScheduleDefense}
        />
      </Section>
    </PageContainer>
  );
}
