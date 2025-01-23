'use client';

import React from 'react';

import { AcademicProgress, Achievements, ProfileHeader, RecentActivity } from './components';
import { studentData } from './data';

export default function ProfilePage() {
  return (
    <div 
      id="student-profile"
      className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 md:p-8 text-gray-900 dark:text-gray-100 transition-colors duration-300"
    >
      <div 
        id="profile-container"
        className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-10 px-4 md:px-8 animate-fadeIn"
      >
        <ProfileHeader studentData={studentData} />

        <div 
          id="profile-content"
          className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 md:gap-10 w-full"
        >
          <div 
            id="main-content"
            className="flex flex-col gap-6 md:gap-10 w-full min-w-0"
          >
            <AcademicProgress subjects={studentData.subjects} />
            <RecentActivity activities={studentData.recentActivity} />
          </div>

          <div 
            id="sidebar-content"
            className="flex flex-col gap-6 md:gap-10 w-full min-w-0"
          >
            <Achievements badges={studentData.badges} />
          </div>
        </div>
      </div>
    </div>
  );
}
