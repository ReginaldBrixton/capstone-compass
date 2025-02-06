'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function ReviewsPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - Replace with actual API call
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // TODO: Replace with actual API call
        const mockSubmissions = [
          {
            id: 1,
            studentName: 'John Doe',
            projectTitle: 'AI-Powered Healthcare System',
            submissionDate: '2024-01-15',
            status: 'pending',
          },
          {
            id: 2,
            studentName: 'Jane Smith',
            projectTitle: 'Sustainable Energy Monitor',
            submissionDate: '2024-01-14',
            status: 'in_review',
          },
          // Add more mock data as needed
        ];
        setSubmissions(mockSubmissions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch submissions');
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);
  const getStatusBadgeColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8" data-oid="fjm:v53">
        <div
          className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"
          data-oid="jdmlslb"
        ></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8" data-oid="_f2pcv4">
        <div
          className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          data-oid="en73szk"
        >
          {error}
        </div>
      </div>
    );
  }
  return (
    <div className="p-8" data-oid="r-3w2jl">
      <div className="mb-6 flex items-center justify-between" data-oid="hpiit3t">
        <h1 className="text-2xl font-bold" data-oid="0l6q2_x">
          Project Submissions
        </h1>
        <div className="text-sm text-gray-500" data-oid="rhzm6f5">
          {submissions.length} submissions pending review
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md" data-oid="6yeh06e">
        <div className="overflow-x-auto" data-oid="fd_vs.g">
          <table className="min-w-full divide-y divide-gray-200" data-oid="ymp_w57">
            <thead className="bg-gray-50" data-oid="ydtsq72">
              <tr data-oid="2a09me4">
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  data-oid="9essvlc"
                >
                  Student Name
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  data-oid="0d_k2-0"
                >
                  Project Title
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  data-oid="fe7p6wp"
                >
                  Submission Date
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  data-oid="5y6erhm"
                >
                  Status
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  data-oid="g8-tlta"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white" data-oid="c4em0x_">
              {submissions.map((submission) => (
                <tr key={submission.id} data-oid="s_1g1gd">
                  <td className="whitespace-nowrap px-6 py-4" data-oid="iqraatl">
                    <div className="text-sm font-medium text-gray-900" data-oid="91-.ly4">
                      {submission.studentName}
                    </div>
                  </td>
                  <td className="px-6 py-4" data-oid="q5m8lxw">
                    <div className="text-sm text-gray-900" data-oid="cbyhhvb">
                      {submission.projectTitle}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4" data-oid="xn-r5:9">
                    <div className="text-sm text-gray-500" data-oid="k74svc9">
                      {new Date(submission.submissionDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4" data-oid="omb6mqm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(submission.status)}`}
                      data-oid="bij1zwo"
                    >
                      {submission.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td
                    className="whitespace-nowrap px-6 py-4 text-sm font-medium"
                    data-oid="4:1ezs7"
                  >
                    <button
                      onClick={() => router.push(`/supervisor/reviews/${submission.id}`)}
                      className="text-blue-600 hover:text-blue-900"
                      data-oid="x7rhpof"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
