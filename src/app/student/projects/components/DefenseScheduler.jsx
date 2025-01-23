'use client';

import React, { useEffect, useState } from 'react';

import { formatTime } from '../utils/dateUtils';

import '../styles/DefenseScheduler.css';

const DefenseScheduler = ({
  availableSlots,
  panelMembers,
  requirements,
  onSchedule,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSchedule = () => {
    if (selectedSlot && isReadyToSchedule()) {
      onSchedule(selectedSlot);
    }
  };

  const isReadyToSchedule = () => {
    return (
      selectedSlot &&
      panelMembers.every((member) => member.status === 'confirmed') &&
      requirements.every((req) => req.isComplete)
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="scheduler-container">
      <h2>Schedule Defense</h2>
      <p className="text-secondary">
        Select an available time slot and ensure all requirements are met
      </p>

      <div className="datetime-grid">
        {availableSlots.map((slot) => (
          <button
            key={slot.id}
            className={`time-slot ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
            onClick={() => setSelectedSlot(slot)}
            disabled={slot.isBooked}
            aria-label={`Time slot at ${formatTime(slot.datetime)}`}
          >
            {formatTime(slot.datetime)}
          </button>
        ))}
      </div>

      <div className="panel-section">
        <h3>Panel Members</h3>
        {panelMembers.map((member) => (
          <div key={member.id} className="panel-member">
            <div className="avatar" aria-label={`${member.name}'s avatar`}>
              {member.name.charAt(0)}
            </div>
            <div className="panel-info">
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
            <span className={`status-badge ${member.status}`}>
              {member.status}
            </span>
          </div>
        ))}
      </div>

      <div className="requirements-list">
        <h3>Requirements</h3>
        {requirements.map((req) => (
          <div
            key={req.id}
            className={`requirement ${req.isComplete ? 'complete' : ''}`}
            role="checkbox"
            aria-checked={req.isComplete}
          >
            {req.description}
          </div>
        ))}
      </div>

      <button
        className="action-button"
        onClick={handleSchedule}
        disabled={!isReadyToSchedule()}
      >
        Schedule Defense
      </button>
    </div>
  );
};

export default DefenseScheduler;
