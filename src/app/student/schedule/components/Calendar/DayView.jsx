'use client';

import React from 'react';

import styles from './styles/calendar.module.css';

const DayView = ({ currentDate, projects, onProjectClick, onDateSelect }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getProjectsForHour = (hour) => {
    return projects.filter((project) => {
      const projectDate = new Date(project.deadline);
      return (
        projectDate.getDate() === currentDate.getDate() &&
        projectDate.getMonth() === currentDate.getMonth() &&
        projectDate.getFullYear() === currentDate.getFullYear() &&
        projectDate.getHours() === hour
      );
    });
  };

  return (
    <div className={styles.dayView}>
      <div className={styles.timeColumn}>
        {hours.map((hour) => (
          <div key={hour} className={styles.timeSlot}>
            {hour}:00
          </div>
        ))}
      </div>
      <div className={styles.dayColumn}>
        {hours.map((hour) => (
          <div
            key={hour}
            className={styles.weekSlot}
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setHours(hour);
              onDateSelect(newDate);
            }}
          >
            {getProjectsForHour(hour).map((project) => (
              <div
                key={project.id}
                className={`${styles.event} ${styles[project.category]}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectClick(project);
                }}
              >
                {project.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;
