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
      <div className="flex items-center justify-center p-8">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Project Submissions</h1>
        <div className="text-sm text-gray-500">
          {submissions.length} submissions pending review
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Project Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Submission Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {submission.studentName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {submission.projectTitle}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {new Date(submission.submissionDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(submission.status)}`}
                    >
                      {submission.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() =>
                        router.push(`/supervisor/reviews/${submission.id}`)
                      }
                      className="text-blue-600 hover:text-blue-900"
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
