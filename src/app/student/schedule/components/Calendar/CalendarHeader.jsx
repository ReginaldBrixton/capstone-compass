'use client';

import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import styles from './styles/calendar.module.css';

const CalendarHeader = ({ currentDate, view, onViewChange, onPrevious, onNext }) => {
  const formatDate = () => {
    const options = {
      month: 'long',
      year: 'numeric',
    };
    if (view === 'day') {
      options.day = 'numeric';
    } else if (view === 'week') {
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 6);
      return `${currentDate.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
      })} - ${endDate.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`;
    }
    return currentDate.toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.calendarHeader}>
      <h2 className={styles.calendarTitle}>{formatDate()}</h2>
      <div className={styles.calendarNav}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${view === 'month' ? styles.active : ''}`}
            onClick={() => onViewChange('month')}
          >
            Month
          </button>
          <button
            className={`${styles.viewButton} ${view === 'week' ? styles.active : ''}`}
            onClick={() => onViewChange('week')}
          >
            Week
          </button>
          <button
            className={`${styles.viewButton} ${view === 'day' ? styles.active : ''}`}
            onClick={() => onViewChange('day')}
          >
            Day
          </button>
        </div>
        <button className={styles.navButton} onClick={onPrevious}>
          <FiChevronLeft />
        </button>
        <button className={styles.navButton} onClick={onNext}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
