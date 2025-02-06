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
        return <MonthView {...props} data-oid="kcqauty" />;
      case 'week':
        return <WeekView {...props} data-oid="9_j4:5u" />;
      case 'day':
        return <DayView {...props} data-oid="17zmx_o" />;
      default:
        return <MonthView {...props} data-oid="yd_biax" />;
    }
  };
  return (
    <div
      className={`${styles.calendar} student-calendar`}
      id="student-calendar-container"
      data-oid="6q._l7w"
    >
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onPrevious={handlePrevious}
        onNext={handleNext}
        className="student-calendar-header"
        id="student-calendar-header"
        data-oid="wm09wj:"
      />
      <div
        className={`student-calendar-view student-calendar-${view}-view`}
        id={`student-calendar-${view}-view`}
        data-oid="ee3eqg3"
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
