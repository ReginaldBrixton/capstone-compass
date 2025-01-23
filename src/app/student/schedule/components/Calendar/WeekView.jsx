'use client';

import React from 'react';

import styles from './styles/calendar.module.css';

const WeekView = ({ currentDate, projects, onProjectClick, onDateSelect }) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getWeekDates = (date) => {
    const week = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay()); // Start from Sunday

    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getProjectsForDateAndHour = (date, hour) => {
    return projects.filter((project) => {
      const projectDate = new Date(project.deadline);
      return (
        projectDate.getDate() === date.getDate() &&
        projectDate.getMonth() === date.getMonth() &&
        projectDate.getFullYear() === date.getFullYear() &&
        projectDate.getHours() === hour
      );
    });
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <div className={styles.weekView}>
      <div className={styles.timeColumn}>
        {hours.map((hour) => (
          <div key={hour} className={styles.timeSlot}>
            {hour}:00
          </div>
        ))}
      </div>
      {weekDates.map((date, dayIndex) => (
        <div key={dayIndex} className={styles.dayColumn}>
          <div
            className={`${styles.weekDay} ${isToday(date) ? styles.today : ''}`}
          >
            {weekDays[dayIndex]}
            <span className={styles.dayNumber}>{date.getDate()}</span>
          </div>
          {hours.map((hour) => (
            <div
              key={hour}
              className={styles.weekSlot}
              onClick={() => {
                const newDate = new Date(date);
                newDate.setHours(hour);
                onDateSelect(newDate);
              }}
            >
              {getProjectsForDateAndHour(date, hour).map((project) => (
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
      ))}
    </div>
  );
};

export default WeekView;
