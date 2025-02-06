'use client';

import { useState } from 'react';
import { CalendarInput } from './components/Calender';
export default function PageOne() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeDate, setRangeDate] = useState(null);
  return (
    <div className="page-one-component space-y-8 p-8" data-oid="qrxyuci">
      <div className="mx-auto max-w-md space-y-6" data-oid="pqf57zo">
        <h1 className="mb-6 text-2xl font-bold" data-oid="fx9y8ux">
          Calendar Component Tests
        </h1>

        <div className="space-y-4" data-oid="0r:q2vk">
          <h2 className="text-lg font-semibold" data-oid="77xjy9v">
            Basic Calendar
          </h2>
          <CalendarInput
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select a date"
            data-oid="plexbt9"
          />
          <p className="text-sm text-gray-600" data-oid="ta-3559">
            Selected date: {selectedDate?.toLocaleDateString() || 'None'}
          </p>
        </div>

        <div className="space-y-4" data-oid=":eww_ox">
          <h2 className="text-lg font-semibold" data-oid="8v7t_dy">
            Range Calendar
          </h2>
          <CalendarInput
            value={rangeDate}
            onChange={setRangeDate}
            rangePicker={true}
            placeholder="Select date range"
            data-oid="bp0_7x3"
          />
          <p className="text-sm text-gray-600" data-oid="tbad.zl">
            Selected range:{' '}
            {rangeDate
              ? `${rangeDate.start?.toLocaleDateString()} - ${rangeDate.end?.toLocaleDateString()}`
              : 'None'}
          </p>
        </div>

        <div className="space-y-4" data-oid="7vxbbfc">
          <h2 className="text-lg font-semibold" data-oid="2.p-1km">
            Calendar with Constraints
          </h2>
          <CalendarInput
            minDate={new Date(2024, 0, 1)}
            maxDate={new Date(2024, 11, 31)}
            placeholder="Select date (2024 only)"
            data-oid=".p5-s3_"
          />
        </div>

        <div className="space-y-4" data-oid="wnza:fd">
          <h2 className="text-lg font-semibold" data-oid="myxg9wy">
            Calendar with Buttons
          </h2>
          <CalendarInput
            buttons={true}
            autoSelectToday={true}
            title="With Controls"
            placeholder="Select date"
            data-oid="143rmoh"
          />
        </div>

        <div className="space-y-4" data-oid="5agbque">
          <h2 className="text-lg font-semibold" data-oid="b4h6qsm">
            Different Orientations
          </h2>
          <div className="grid grid-cols-2 gap-4" data-oid="mj3hyn1">
            <CalendarInput orientation="top" placeholder="Opens on top" data-oid="1_gd882" />
            <CalendarInput orientation="right" placeholder="Opens on right" data-oid="f2c-_hl" />
          </div>
        </div>
      </div>
    </div>
  );
}
