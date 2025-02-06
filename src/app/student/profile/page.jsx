'use client';

import React from 'react';
import { AcademicProgress, Achievements, ProfileHeader, RecentActivity } from './components';
import { studentData } from './data';
export default function ProfilePage() {
  return (
    <div
      id="student-profile"
      className="min-h-screen w-full bg-gray-50 p-4 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 md:p-8"
      data-oid="m4wsrll"
    >
      <div
        id="profile-container"
        className="animate-fadeIn mx-auto flex max-w-7xl flex-col gap-6 px-4 md:gap-10 md:px-8"
        data-oid="1_t3cux"
      >
        <ProfileHeader studentData={studentData} data-oid="jucgeq1" />

        <div
          id="profile-content"
          className="grid w-full grid-cols-1 gap-6 md:gap-10 lg:grid-cols-[2fr,1fr]"
          data-oid="m8u6eut"
        >
          <div
            id="main-content"
            className="flex w-full min-w-0 flex-col gap-6 md:gap-10"
            data-oid="ubk-rnu"
          >
            <AcademicProgress subjects={studentData.subjects} data-oid="gqkr8ch" />
            <RecentActivity activities={studentData.recentActivity} data-oid="x7mivmb" />
          </div>

          <div
            id="sidebar-content"
            className="flex w-full min-w-0 flex-col gap-6 md:gap-10"
            data-oid="4ui5v2b"
          >
            <Achievements badges={studentData.badges} data-oid="dcykrht" />
          </div>
        </div>
      </div>
    </div>
  );
}
