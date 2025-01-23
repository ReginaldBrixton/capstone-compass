'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SupervisorDashboard() {
  const router = useRouter();
  const [pendingSubmissions, setPendingSubmissions] = useState(0);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // TODO: Replace with actual API call
        const mockSubmissions = [
          {
            id: 1,
            status: 'pending',
          },
          {
            id: 2,
            status: 'in_review',
          },
        ];
        const pendingCount = mockSubmissions.filter(
          (sub) => sub.status === 'pending'
        ).length;
        setPendingSubmissions(pendingCount);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Supervisor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">My Students</h2>
          <p className="text-gray-600">
            View and manage your assigned students
          </p>
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => router.push('/supervisor/students')}
          >
            View Students
          </button>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Project Reviews</h2>
          <p className="text-gray-600">Review and grade student submissions</p>
          {pendingSubmissions > 0 && (
            <div className="mb-2 mt-2">
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
                {pendingSubmissions} pending{' '}
                {pendingSubmissions === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}
          <button
            className={`mt-4 rounded px-4 py-2 text-white ${
              pendingSubmissions > 0
                ? 'animate-pulse bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={() => router.push('/supervisor/reviews')}
          >
            View Submissions
          </button>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Schedule</h2>
          <p className="text-gray-600">Manage meetings and consultations</p>
          <button
            className="mt-4 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
            onClick={() => router.push('/supervisor/schedule')}
          >
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
