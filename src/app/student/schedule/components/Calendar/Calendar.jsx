'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CalendarHeader, DayView, MonthView, WeekView } from '../index';
import styles from './styles/calendar.module.css';

const Calendar = ({ projects = [], onProjectClick = () => {}, onDateSelect = () => {} }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');

  const handlePrevious = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (view === 'month') {
        newDate.setMonth(prev.getMonth() - 1);
      } else if (view === 'week') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() - 1);
      }
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (view === 'month') {
        newDate.setMonth(prev.getMonth() + 1);
      } else if (view === 'week') {
        newDate.setDate(prev.getDate() + 7);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
  };

  const renderView = () => {
    const props = {
      currentDate,
      projects,
      onProjectClick,
      onDateSelect,
    };

    switch (view) {
      case 'month':
        return <MonthView {...props} />;
      case 'week':
        return <WeekView {...props} />;
      case 'day':
        return <DayView {...props} />;
      default:
        return <MonthView {...props} />;
    }
  };

  return (
    <div className={`${styles.calendar} student-calendar`} id="student-calendar-container">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onPrevious={handlePrevious}
        onNext={handleNext}
        className="student-calendar-header"
        id="student-calendar-header"
      />
      <div
        className={`student-calendar-view student-calendar-${view}-view`}
        id={`student-calendar-${view}-view`}
      >
        {renderView()}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  projects: PropTypes.array,
  onProjectClick: PropTypes.func,
  onDateSelect: PropTypes.func,
};

export default Calendar;
