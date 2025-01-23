'use client';

import React from 'react';

// Sample progress data
const subjects = [
  { name: 'Mathematics', grade: 'A', progress: 85 },
  { name: 'Science', grade: 'B+', progress: 78 },
  { name: 'English', grade: 'A-', progress: 90 },
  { name: 'History', grade: 'B', progress: 75 },
];

const overallProgress = 82;

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-7xl p-5">
      <h1 className="mb-5 text-2xl font-bold text-gray-800 dark:text-gray-200">
        Academic Progress
      </h1>

      <div className="mb-5 rounded-lg bg-white p-5 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Overall Progress
        </h2>
        <div className="h-5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-green-500 transition-all duration-300 ease-in-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {overallProgress}% Complete
        </p>
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Subject Progress
        </h2>
        {subjects.map((subject, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex items-start justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div className="mr-4 flex-1">
                <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  {subject.name}
                </h3>
                <div className="h-5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                  <div
                    className="h-full bg-green-500 transition-all duration-300 ease-in-out"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Grade: {subject.grade}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {subject.progress}% Complete
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
