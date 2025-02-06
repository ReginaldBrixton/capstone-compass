'use client';

import React from 'react';
import styles from './styles/calendar.module.css';
const MonthView = ({ currentDate, projects, onProjectClick, onDateSelect }) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    const days = [];

    // Previous month's days
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    return days;
  };
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const getProjectsForDate = (date) => {
    return projects.filter((project) => {
      const projectDate = new Date(project.deadline);
      return (
        projectDate.getDate() === date.getDate() &&
        projectDate.getMonth() === date.getMonth() &&
        projectDate.getFullYear() === date.getFullYear()
      );
    });
  };
  const days = getDaysInMonth(currentDate);
  return (
    <div data-oid=".y46j-:">
      <div className={styles.weekDays} data-oid="ksn_1t1">
        {weekDays.map((day) => (
          <div key={day} className={styles.weekDay} data-oid="_d853j:">
            {day}
          </div>
        ))}
      </div>
      <div className={styles.monthView} data-oid="sj3r03p">
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${!day.isCurrentMonth ? styles.otherMonth : ''} ${isToday(day.date) ? styles.today : ''}`}
            onClick={() => onDateSelect(day.date)}
            data-oid="dz.iajl"
          >
            <div className={styles.dayHeader} data-oid="2u50m-p">
              <span className={styles.dayNumber} data-oid="yzza:38">
                {day.date.getDate()}
              </span>
            </div>
            <div data-oid=".85jgjc">
              {getProjectsForDate(day.date).map((project) => (
                <div
                  key={project.id}
                  className={`${styles.event} ${styles[project.category]}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onProjectClick(project);
                  }}
                  data-oid="u:dgeu."
                >
                  {project.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MonthView;
