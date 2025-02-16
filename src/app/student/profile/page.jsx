'use client';

import React, { useState, useEffect } from 'react';
import { AcademicProgress, Achievements, ProfileHeader, RecentActivity } from './components';
import { studentData as initialStudentData } from './data';

export default function ProfilePage() {
  const [studentData, setStudentData] = useState(initialStudentData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        setIsLoading(true);
        // Here you would typically fetch data from your API
        // For now we'll just simulate it
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStudentData(initialStudentData);
      } catch (err) {
        setError('Failed to load student data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Handler for profile updates
  const handleProfileUpdate = (updatedData) => {
    setStudentData(updatedData);
  };

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
        <ProfileHeader 
          studentData={studentData} 
          onUpdateProfile={handleProfileUpdate}
        />

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
            <AcademicProgress subjects={studentData.subjects} />
            <RecentActivity activities={studentData.recentActivity} />
          </div>

          <div
            id="sidebar-content"
            className="flex w-full min-w-0 flex-col gap-6 md:gap-10"
            data-oid="4ui5v2b"
          >
            <Achievements badges={studentData.badges} />
          </div>
        </div>
      </div>
    </div>
  );
}
