'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const FeedbackDisplay = ({ submissionId }) => {
  const { data: session } = useSession();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/submissions?id=${submissionId}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }

        const data = await response.json();
        setFeedback(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (session?.token && submissionId) {
      fetchFeedback();
    }
  }, [submissionId, session?.token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
        <p className="text-gray-600">No feedback available yet.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      default: 'bg-gray-100 text-gray-800',
    };
    return statusColors[status] || statusColors.default;
  };

  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {feedback.title}
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(feedback.status)}`}
        >
          {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
        </span>
      </div>

      {feedback.feedback && (
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            Supervisor Feedback:
          </h4>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="whitespace-pre-wrap text-gray-800">
              {feedback.feedback}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Last updated: {formatDate(feedback.updatedAt)}</span>
        <span>Created: {formatDate(feedback.createdAt)}</span>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
