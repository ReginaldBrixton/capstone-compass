'use client';

import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils/dateUtils';
import '../styles/DefenseScheduler.css';
const DefenseScheduler = ({ availableSlots, panelMembers, requirements, onSchedule }) => {
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
    <div className="scheduler-container" data-oid="gdo2b--">
      <h2 data-oid="pgj7g4:">Schedule Defense</h2>
      <p className="text-secondary" data-oid="m0731-s">
        Select an available time slot and ensure all requirements are met
      </p>

      <div className="datetime-grid" data-oid="tnl6ryd">
        {availableSlots.map((slot) => (
          <button
            key={slot.id}
            className={`time-slot ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
            onClick={() => setSelectedSlot(slot)}
            disabled={slot.isBooked}
            aria-label={`Time slot at ${formatTime(slot.datetime)}`}
            data-oid="o_7:bor"
          >
            {formatTime(slot.datetime)}
          </button>
        ))}
      </div>

      <div className="panel-section" data-oid="ynne6nw">
        <h3 data-oid="lhxnvt8">Panel Members</h3>
        {panelMembers.map((member) => (
          <div key={member.id} className="panel-member" data-oid="rvw45:a">
            <div className="avatar" aria-label={`${member.name}'s avatar`} data-oid="uqt754r">
              {member.name.charAt(0)}
            </div>
            <div className="panel-info" data-oid="z2fhauu">
              <h4 data-oid="g.76jm7">{member.name}</h4>
              <p data-oid="f.bwm:l">{member.role}</p>
            </div>
            <span className={`status-badge ${member.status}`} data-oid="dv0r94f">
              {member.status}
            </span>
          </div>
        ))}
      </div>

      <div className="requirements-list" data-oid="p--zvxd">
        <h3 data-oid="izlxgyh">Requirements</h3>
        {requirements.map((req) => (
          <div
            key={req.id}
            className={`requirement ${req.isComplete ? 'complete' : ''}`}
            role="checkbox"
            aria-checked={req.isComplete}
            data-oid="11h5hup"
          >
            {req.description}
          </div>
        ))}
      </div>

      <button
        className="action-button"
        onClick={handleSchedule}
        disabled={!isReadyToSchedule()}
        data-oid="rt88ukz"
      >
        Schedule Defense
      </button>
    </div>
  );
};
export default DefenseScheduler;
