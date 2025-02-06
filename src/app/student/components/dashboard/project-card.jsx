import React from 'react';
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  UsersIcon,
  ArrowUpRightIcon,
} from 'lucide-react';
import { getAvatarUrl } from '../../../../utils/avatar';

export const ProjectCard = ({
  title,
  description,
  priority,
  status,
  progress,
  dueDate,
  members,
}) => {
  const priorityColors = {
    high: 'text-red-700 bg-red-100 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    medium:
      'text-yellow-700 bg-yellow-100 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    low: 'text-green-700 bg-green-100 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  };
  const statusIcons = {
    'in progress': (
      <ClockIcon className="h-4 w-4 text-blue-500 dark:text-blue-300" />
    ),
    completed: (
      <CheckCircleIcon className="h-4 w-4 text-green-500 dark:text-green-300" />
    ),
    delayed: (
      <AlertTriangleIcon className="h-4 w-4 text-red-500 dark:text-red-300" />
    ),
  };
  const statusColors = {
    'in progress':
      'text-blue-700 bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    completed:
      'text-green-700 bg-green-100 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    delayed:
      'text-red-700 bg-red-100 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  };

  return (
    <div
      className="rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
      id="project-card"
    >
      <div className="p-4 sm:p-5">
        {/* Top Section: Priority, Status, and Icon */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize border ${priorityColors[priority]}`}
            >
              {priority} Priority
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize border ${statusColors[status]}`}
            >
              {statusIcons[status]}
              <span>{status}</span>
            </span>
          </div>
          <ArrowUpRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>

        {/* Middle Section: Title and Description */}
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Progress, Due Date, and Members */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-4 sm:p-5">
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Progress
              </span>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
              <div
                className="bg-blue-500 dark:bg-blue-400 rounded-full h-2"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Due Date and Members */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">Due {dueDate}</span>
            </div>

            <div className="flex items-center">
              <div className="flex -space-x-2">
                {members.slice(0, 3).map((member, i) => (
                  <div
                    key={i}
                    title={member.name}
                    className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden"
                  >
                    <img
                      src={`https://avatar.vercel.sh/${member.name}.png`}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {members.length > 3 && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 ml-2">
                  <UsersIcon className="mr-1 h-4 w-4" />+
                  {members.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
