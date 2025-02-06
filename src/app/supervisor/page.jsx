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
        const pendingCount = mockSubmissions.filter((sub) => sub.status === 'pending').length;
        setPendingSubmissions(pendingCount);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      }
    };
    fetchSubmissions();
  }, []);
  return (
    <div className="p-8" data-oid="qz:9z8l">
      <h1 className="mb-6 text-2xl font-bold" data-oid="63:r.mh">
        Supervisor Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-oid="__g10ou">
        <div className="rounded-lg bg-white p-6 shadow-md" data-oid="k8wmojn">
          <h2 className="mb-4 text-xl font-semibold" data-oid="udy47_y">
            My Students
          </h2>
          <p className="text-gray-600" data-oid="jlagmmr">
            View and manage your assigned students
          </p>
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => router.push('/supervisor/students')}
            data-oid="qhg:0.a"
          >
            View Students
          </button>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md" data-oid="bmem2bs">
          <h2 className="mb-4 text-xl font-semibold" data-oid="1tam7gl">
            Project Reviews
          </h2>
          <p className="text-gray-600" data-oid="3v5m-xo">
            Review and grade student submissions
          </p>
          {pendingSubmissions > 0 && (
            <div className="mb-2 mt-2" data-oid="go:npvp">
              <span
                className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800"
                data-oid="pzrrb_y"
              >
                {pendingSubmissions} pending {pendingSubmissions === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}
          <button
            className={`mt-4 rounded px-4 py-2 text-white ${pendingSubmissions > 0 ? 'animate-pulse bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            onClick={() => router.push('/supervisor/reviews')}
            data-oid="u6i_w:e"
          >
            View Submissions
          </button>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md" data-oid="5217ol5">
          <h2 className="mb-4 text-xl font-semibold" data-oid="r3h_ptf">
            Schedule
          </h2>
          <p className="text-gray-600" data-oid="kofmo_b">
            Manage meetings and consultations
          </p>
          <button
            className="mt-4 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
            onClick={() => router.push('/supervisor/schedule')}
            data-oid="e0v:lvz"
          >
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
