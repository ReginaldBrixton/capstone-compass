'use client';

import React from 'react';
import styles from './styles/calendar.module.css';
const DayView = ({ currentDate, projects, onProjectClick, onDateSelect }) => {
  const hours = Array.from(
    {
      length: 24,
    },
    (_, i) => i
  );
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
    <div className={styles.dayView} data-oid="3a.muh4">
      <div className={styles.timeColumn} data-oid="k4nmyxn">
        {hours.map((hour) => (
          <div key={hour} className={styles.timeSlot} data-oid="2ww7aiy">
            {hour}:00
          </div>
        ))}
      </div>
      <div className={styles.dayColumn} data-oid="pmdkf5y">
        {hours.map((hour) => (
          <div
            key={hour}
            className={styles.weekSlot}
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setHours(hour);
              onDateSelect(newDate);
            }}
            data-oid="cllx85j"
          >
            {getProjectsForHour(hour).map((project) => (
              <div
                key={project.id}
                className={`${styles.event} ${styles[project.category]}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectClick(project);
                }}
                data-oid="57pca9f"
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
