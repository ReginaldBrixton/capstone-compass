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
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-5">
        Academic Progress
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 mb-5 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Overall Progress
        </h2>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{overallProgress}% Complete</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Subject Progress
        </h2>
        {subjects.map((subject, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-start">
              <div className="flex-1 mr-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {subject.name}
                </h3>
                <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-5 overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Grade: {subject.grade}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{subject.progress}% Complete</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
