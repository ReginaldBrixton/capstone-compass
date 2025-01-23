'use client';

import React from 'react';

import {
  AcademicProgress,
  Achievements,
  ProfileHeader,
  RecentActivity,
} from './components';
import { studentData } from './data';

export default function ProfilePage() {
  return (
    <div
      id="student-profile"
      className="min-h-screen w-full bg-gray-50 p-4 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 md:p-8"
    >
      <div
        id="profile-container"
        className="animate-fadeIn mx-auto flex max-w-7xl flex-col gap-6 px-4 md:gap-10 md:px-8"
      >
        <ProfileHeader studentData={studentData} />

        <div
          id="profile-content"
          className="grid w-full grid-cols-1 gap-6 md:gap-10 lg:grid-cols-[2fr,1fr]"
        >
          <div
            id="main-content"
            className="flex w-full min-w-0 flex-col gap-6 md:gap-10"
          >
            <AcademicProgress subjects={studentData.subjects} />
            <RecentActivity activities={studentData.recentActivity} />
          </div>

          <div
            id="sidebar-content"
            className="flex w-full min-w-0 flex-col gap-6 md:gap-10"
          >
            <Achievements badges={studentData.badges} />
          </div>
        </div>
      </div>
    </div>
  );
}
