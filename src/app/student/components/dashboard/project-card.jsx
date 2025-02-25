import React from 'react';
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  UsersIcon,
  ArrowUpRightIcon,
} from 'lucide-react';

/**
 * ProjectCard component displays project information in a visually appealing card format.
 * Enhanced for better UI/UX, interactions, and responsiveness.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Project title
 * @param {string} props.description - Project description
 * @param {string} props.priority - Priority level (high, medium, low)
 * @param {string} props.status - Current status (in progress, completed, delayed)
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {string} props.dueDate - Due date string
 * @param {Array} props.members - Array of team members
 * @param {Function} [props.onClick] - Optional click handler
 * @returns {JSX.Element}
 */
export const ProjectCard = ({
  title,
  description,
  priority,
  status,
  progress,
  dueDate,
  members,
  onClick,
}) => {
  const priorityColors = {
    high: 'text-red-700 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    medium: 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    low: 'text-green-700 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  };
  
  const statusConfig = {
    'in progress': {
      icon: <ClockIcon className="h-3.5 w-3.5 text-blue-500 dark:text-blue-300" />,
      classes: 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
      progressColor: 'bg-blue-500 dark:bg-blue-400'
    },
    completed: {
      icon: <CheckCircleIcon className="h-3.5 w-3.5 text-green-500 dark:text-green-300" />,
      classes: 'text-green-700 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
      progressColor: 'bg-green-500 dark:bg-green-400'
    },
    delayed: {
      icon: <AlertTriangleIcon className="h-3.5 w-3.5 text-red-500 dark:text-red-300" />,
      classes: 'text-red-700 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
      progressColor: 'bg-red-500 dark:bg-red-400'
    },
  };

  // Calculate days remaining for due date
  const getDaysRemaining = () => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  const daysRemaining = getDaysRemaining();
  const isOverdue = daysRemaining === 'Overdue';

  return (
    <div
      className={`
        rounded-lg border border-gray-200 dark:border-gray-800 
        bg-white dark:bg-gray-900 shadow-sm
        transition-all duration-300 ease-in-out
        hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700
        group relative overflow-hidden
        ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''}
      `}
      id="project-card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Visual indicator of priority - top accent border */}
      <div 
        className={`h-1.5 w-full ${priorityColors[priority].split(' ')[1]} rounded-t-lg`}
        aria-hidden="true"
      />

      <div className="p-4 sm:p-5">
        {/* Top Section: Priority, Status, and Icon */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${priorityColors[priority]}`}
            >
              {priority} Priority
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${statusConfig[status].classes}`}
            >
              {statusConfig[status].icon}
              <span>{status}</span>
            </span>
          </div>
          <div className="
            p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 
            transform transition-transform duration-300 
            group-hover:bg-gray-200 dark:group-hover:bg-gray-700
            group-hover:rotate-12 group-active:scale-90
          ">
            <ArrowUpRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Middle Section: Title and Description */}
        <div className="mt-2 space-y-2.5">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 
            group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Progress, Due Date, and Members */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-4 sm:p-5 bg-gray-50 dark:bg-gray-900/60">
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Progress
              </span>
              <span className={`font-semibold ${progress >= 70 
                ? 'text-green-600 dark:text-green-400' 
                : progress <= 30 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-blue-600 dark:text-blue-400'}`}>
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className={`${statusConfig[status].progressColor} rounded-full h-2.5 transition-all duration-700 ease-in-out`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Due Date and Members */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className={`flex items-center gap-2 text-sm font-medium
              ${isOverdue 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-700 dark:text-gray-300'}`}>
              <CalendarIcon className={`h-4 w-4 ${isOverdue ? 'animate-pulse' : ''}`} />
              <div>
                <span>{dueDate}</span>
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-sm
                  ${isOverdue 
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                  {daysRemaining}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex -space-x-2 relative">
                {members.slice(0, 3).map((member, i) => (
                  <div
                    key={i}
                    title={member.name}
                    className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden 
                      transition-transform duration-200 hover:scale-105 hover:z-10 hover:shadow-md"
                  >
                    <img
                      src={`https://avatar.vercel.sh/${member.name}.png`}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              {members.length > 3 && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 ml-2.5 
                  bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  <UsersIcon className="mr-1 h-3.5 w-3.5" />
                  +{members.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual glow effect based on priority */}
      <div 
        className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-10 blur-3xl
          ${priority === 'high' 
            ? 'bg-red-400 dark:bg-red-600' 
            : priority === 'medium' 
              ? 'bg-yellow-400 dark:bg-yellow-600' 
              : 'bg-green-400 dark:bg-green-600'}`}
        aria-hidden="true"
      />
    </div>
  );
};

export default ProjectCard;
