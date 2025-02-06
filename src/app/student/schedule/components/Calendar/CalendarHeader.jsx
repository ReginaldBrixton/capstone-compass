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
    <div className={styles.calendarHeader} data-oid="4308qbm">
      <h2 className={styles.calendarTitle} data-oid="3zakwu4">
        {formatDate()}
      </h2>
      <div className={styles.calendarNav} data-oid="lnxuvfz">
        <div className={styles.viewToggle} data-oid="7o-nidy">
          <button
            className={`${styles.viewButton} ${view === 'month' ? styles.active : ''}`}
            onClick={() => onViewChange('month')}
            data-oid="ar-u842"
          >
            Month
          </button>
          <button
            className={`${styles.viewButton} ${view === 'week' ? styles.active : ''}`}
            onClick={() => onViewChange('week')}
            data-oid="xgq41eg"
          >
            Week
          </button>
          <button
            className={`${styles.viewButton} ${view === 'day' ? styles.active : ''}`}
            onClick={() => onViewChange('day')}
            data-oid="pxykgg."
          >
            Day
          </button>
        </div>
        <button className={styles.navButton} onClick={onPrevious} data-oid="t6oq2w8">
          <FiChevronLeft data-oid="yuyutee" />
        </button>
        <button className={styles.navButton} onClick={onNext} data-oid="1jh4t1b">
          <FiChevronRight data-oid="arfk4e." />
        </button>
      </div>
    </div>
  );
};
export default CalendarHeader;
