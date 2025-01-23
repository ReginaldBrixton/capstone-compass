import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const SchedulerContainer = styled.div.attrs({ className: 'defense-scheduler' })`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div.attrs({ className: 'scheduler-grid' })`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TimeSlotGrid = styled.div.attrs({ className: 'time-slot-grid' })`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const TimeSlot = styled(motion.button).attrs((props) => ({
  className: `time-slot ${props.$isSelected ? 'selected' : ''}`,
}))`
  padding: 1rem;
  border: 2px solid
    ${(props) => (props.$isSelected ? 'var(--primary-color)' : 'var(--border-color)')};
  border-radius: 0.5rem;
  background: ${(props) => (props.$isSelected ? 'var(--primary-color-light)' : 'white')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const PanelSection = styled.div.attrs({ className: 'panel-section' })`
  h3 {
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
`;

const PanelMember = styled(motion.div).attrs({ className: 'panel-member' })`
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span.attrs((props) => ({
  className: `status-badge ${props.$status}`,
}))`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  background: ${(props) => {
    switch (props.$status) {
      case 'confirmed':
        return 'var(--success-color-light)';
      case 'pending':
        return 'var(--warning-color-light)';
      default:
        return 'var(--neutral-color-light)';
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case 'confirmed':
        return 'var(--success-color)';
      case 'pending':
        return 'var(--warning-color)';
      default:
        return 'var(--neutral-color)';
    }
  }};
`;

const RequirementsList = styled.div.attrs({ className: 'requirements-list' })`
  margin-top: 2rem;
`;

const Requirement = styled.div.attrs((props) => ({
  className: `requirement ${props.$isComplete ? 'complete' : 'incomplete'}`,
}))`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${(props) =>
    props.$isComplete ? 'var(--success-color-light)' : 'var(--warning-color-light)'};
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;

  &::before {
    content: ${(props) => (props.$isComplete ? '"✓"' : '"!"')};
    font-weight: bold;
    color: ${(props) => (props.$isComplete ? 'var(--success-color)' : 'var(--warning-color)')};
  }
`;

const ScheduleButton = styled(motion.button).attrs({ className: 'schedule-button' })`
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: var(--primary-color-dark);
  }
`;

const DefenseScheduler = ({ availableSlots, panelMembers, requirements, onSchedule }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const allRequirementsMet = requirements.every((req) => req.isComplete);
  const allPanelConfirmed = panelMembers.every((member) => member.status === 'confirmed');

  const canSchedule = selectedSlot && allRequirementsMet && allPanelConfirmed;

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    // Use a consistent date-time format that will be the same on server and client
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleSchedule = () => {
    if (canSchedule) {
      onSchedule(selectedSlot);
    }
  };

  return (
    <SchedulerContainer>
      <h2>Schedule Your Defense</h2>

      <Grid>
        <div>
          <h3>Available Time Slots</h3>
          <TimeSlotGrid>
            <AnimatePresence>
              {availableSlots.map((slot) => (
                <TimeSlot
                  key={slot.id}
                  $isSelected={selectedSlot?.id === slot.id}
                  disabled={slot.isBooked}
                  onClick={() => setSelectedSlot(slot)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formatDateTime(slot.datetime)}
                </TimeSlot>
              ))}
            </AnimatePresence>
          </TimeSlotGrid>
        </div>

        <PanelSection>
          <h3>Panel Members</h3>
          {panelMembers.map((member, index) => (
            <PanelMember
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div>
                <strong>{member.name}</strong>
                <div>{member.role}</div>
              </div>
              <StatusBadge $status={member.status}>{member.status}</StatusBadge>
            </PanelMember>
          ))}
        </PanelSection>
      </Grid>

      <RequirementsList>
        <h3>Requirements</h3>
        {requirements.map((req) => (
          <Requirement key={req.id} $isComplete={req.isComplete}>
            {req.description}
          </Requirement>
        ))}
      </RequirementsList>

      <ScheduleButton
        disabled={!canSchedule}
        onClick={handleSchedule}
        whileHover={canSchedule ? { scale: 1.02 } : {}}
        whileTap={canSchedule ? { scale: 0.98 } : {}}
      >
        Schedule Defense
      </ScheduleButton>
    </SchedulerContainer>
  );
};

export default DefenseScheduler;
