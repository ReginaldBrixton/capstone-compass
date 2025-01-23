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
      <div className="calendar-component w-[260px] rounded-lg border border-gray-200 bg-white p-3 shadow-xl transition-all duration-200 ease-in-out sm:w-[280px] sm:p-4 md:w-[300px] md:p-5">
        {title && (
          <div className="mb-3 text-center text-sm font-bold text-gray-800 sm:mb-4 sm:text-base md:mb-5 md:text-lg">
            {title}
          </div>
        )}
        <div className="mb-3 flex items-center justify-between sm:mb-4 md:mb-5">
          <button
            onClick={handlePrevMonth}
            className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 sm:p-1.5"
            aria-label="Previous month"
          >
            <svg
              className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5"
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
              className="text-sm font-semibold text-gray-800 transition-colors duration-200 hover:text-blue-600 sm:text-base"
            >
              {months[currentMonth]} {currentYear}
            </button>
          </div>
          <button
            onClick={handleNextMonth}
            className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 sm:p-1.5"
            aria-label="Next month"
          >
            <svg
              className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {showMonthYearSelect && (
          <div className="mb-3 grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-2">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
              className="rounded border bg-white p-1 text-sm"
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
              className="rounded border bg-white p-1 text-sm"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-1 grid grid-cols-7 gap-1 sm:mb-2 sm:gap-1.5">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="py-1 text-center text-xs font-medium text-gray-600 sm:text-sm"
            >
              {day}
            </div>
          ))}
          {blanks.map((_, index) => (
            <div key={`blank-${index}`} className="text-center" />
          ))}
          {days.map((day) => {
            const currentDate = new Date(currentYear, currentMonth, day);
            const isSelected =
              selectedDate && currentDate.getTime() === selectedDate.getTime();
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
                className={`rounded-full p-1 text-center text-xs font-medium transition-all duration-200 ease-in-out sm:p-1.5 sm:text-sm ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                    : isInRange
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      : isDisabled
                        ? 'cursor-not-allowed bg-gray-100 opacity-40'
                        : 'text-gray-700 hover:bg-gray-100'
                } ${isToday && !isSelected ? 'ring-1 ring-blue-400' : ''} `}
              >
                {day}
              </button>
            );
          })}
        </div>
        {buttons && (
          <div className="mt-3 flex justify-between border-t border-gray-200 pt-2 sm:mt-4 sm:pt-3">
            <button
              onClick={handleToday}
              className="rounded-md px-2 py-1 text-xs font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-50 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              Today
            </button>
            <button
              onClick={handleClear}
              className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 sm:px-3 sm:py-1.5 sm:text-sm"
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
      className={['calendar-input-component relative max-w-sm', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <svg
          className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
