'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

const CalendarInput = ({
  className,
  placeholder = 'Select date',
  onChange,
  value,
  rangePicker = false,
  format = 'mm/dd/yyyy',
  maxDate = null,
  minDate = null,
  orientation = 'bottom',
  buttons = false,
  autoSelectToday = false,
  title = null,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showMonthYearSelect, setShowMonthYearSelect] = useState(false);
  const calendarRef = useRef(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Generate array of years (20 years before and after current year)
  const years = Array.from({ length: 41 }, (_, i) => currentYear - 20 + i);

  useEffect(() => {
    if (autoSelectToday) {
      setSelectedDate(today);
      onChange?.(today);
    }
  }, [autoSelectToday, onChange]);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return format.replace('mm', month).replace('dd', day).replace('yyyy', year);
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);

    if (maxDate && newDate > new Date(maxDate)) return;
    if (minDate && newDate < new Date(minDate)) return;

    if (rangePicker && selectedDate && !selectedEndDate) {
      if (newDate < selectedDate) {
        setSelectedEndDate(selectedDate);
        setSelectedDate(newDate);
      } else {
        setSelectedEndDate(newDate);
      }
      onChange?.({ start: selectedDate, end: newDate });
      setIsOpen(false);
    } else {
      setSelectedDate(newDate);
      setSelectedEndDate(null);
      onChange?.(newDate);
      if (!rangePicker) setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    setSelectedEndDate(null);
    onChange?.(null);
  };

  const handleToday = () => {
    setSelectedDate(today);
    setSelectedEndDate(null);
    onChange?.(today);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="calendar-component bg-white border border-gray-200 rounded-lg shadow-xl p-3 sm:p-4 md:p-5 w-[260px] sm:w-[280px] md:w-[300px] transition-all duration-200 ease-in-out">
        {title && (
          <div className="text-center font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5 text-gray-800">
            {title}
          </div>
        )}
        <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-5">
          <button
            onClick={handlePrevMonth}
            className="p-1 sm:p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Previous month"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMonthYearSelect(!showMonthYearSelect)}
              className="font-semibold text-sm sm:text-base text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              {months[currentMonth]} {currentYear}
            </button>
          </div>
          <button
            onClick={handleNextMonth}
            className="p-1 sm:p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Next month"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {showMonthYearSelect && (
          <div className="grid grid-cols-2 gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
              className="p-1 text-sm border rounded bg-white"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              className="p-1 text-sm border rounded bg-white"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1 sm:mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center font-medium text-xs sm:text-sm text-gray-600 py-1"
            >
              {day}
            </div>
          ))}
          {blanks.map((_, index) => (
            <div key={`blank-${index}`} className="text-center" />
          ))}
          {days.map((day) => {
            const currentDate = new Date(currentYear, currentMonth, day);
            const isSelected = selectedDate && currentDate.getTime() === selectedDate.getTime();
            const isInRange =
              selectedDate &&
              selectedEndDate &&
              currentDate >= selectedDate &&
              currentDate <= selectedEndDate;
            const isToday = currentDate.toDateString() === today.toDateString();
            const isDisabled =
              (maxDate && currentDate > new Date(maxDate)) ||
              (minDate && currentDate < new Date(minDate));

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={isDisabled}
                className={`
                  text-center p-1 sm:p-1.5 rounded-full text-xs sm:text-sm font-medium
                  transition-all duration-200 ease-in-out
                  ${
                    isSelected
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      : isInRange
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : isDisabled
                          ? 'opacity-40 cursor-not-allowed bg-gray-100'
                          : 'hover:bg-gray-100 text-gray-700'
                  }
                  ${isToday && !isSelected ? 'ring-1 ring-blue-400' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
        {buttons && (
          <div className="flex justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200">
            <button
              onClick={handleToday}
              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              Today
            </button>
            <button
              onClick={handleClear}
              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowMonthYearSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={calendarRef}
      className={['relative max-w-sm calendar-input-component', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </div>
      <input
        type="text"
        readOnly
        value={
          rangePicker
            ? selectedEndDate
              ? `${formatDate(selectedDate)} - ${formatDate(selectedEndDate)}`
              : formatDate(selectedDate)
            : formatDate(selectedDate)
        }
        placeholder={placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      />
      {isOpen && (
        <div
          className={`absolute z-50 ${
            orientation === 'top'
              ? 'bottom-full mb-2'
              : orientation === 'left'
                ? 'right-full mr-2'
                : orientation === 'right'
                  ? 'left-full ml-2'
                  : 'top-full mt-2'
          }`}
        >
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};

export { CalendarInput };
