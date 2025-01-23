'use client';

import { useState } from 'react';

import { CalendarInput } from './components/Calender';

export default function PageOne() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeDate, setRangeDate] = useState(null);

  return (
    <div className="page-one-component space-y-8 p-8">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="mb-6 text-2xl font-bold">Calendar Component Tests</h1>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Basic Calendar</h2>
          <CalendarInput
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select a date"
          />
          <p className="text-sm text-gray-600">
            Selected date: {selectedDate?.toLocaleDateString() || 'None'}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Range Calendar</h2>
          <CalendarInput
            value={rangeDate}
            onChange={setRangeDate}
            rangePicker={true}
            placeholder="Select date range"
          />
          <p className="text-sm text-gray-600">
            Selected range:{' '}
            {rangeDate
              ? `${rangeDate.start?.toLocaleDateString()} - ${rangeDate.end?.toLocaleDateString()}`
              : 'None'}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Calendar with Constraints</h2>
          <CalendarInput
            minDate={new Date(2024, 0, 1)}
            maxDate={new Date(2024, 11, 31)}
            placeholder="Select date (2024 only)"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Calendar with Buttons</h2>
          <CalendarInput
            buttons={true}
            autoSelectToday={true}
            title="With Controls"
            placeholder="Select date"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Different Orientations</h2>
          <div className="grid grid-cols-2 gap-4">
            <CalendarInput orientation="top" placeholder="Opens on top" />
            <CalendarInput orientation="right" placeholder="Opens on right" />
          </div>
        </div>
      </div>
    </div>
  );
}
