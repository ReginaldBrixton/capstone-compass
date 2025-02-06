'use client';

import { useSidebar } from './SidebarContext';

export function SidebarHeader({
  logo,
  title = 'Dashboard',
  className = '',
  showCollapseButton = true,
}) {
  const { isCollapsed, toggleCollapse, isAnimating } = useSidebar();

  return (
    <div className={`
      flex items-center justify-between
      h-16 px-4
      border-b border-gray-200 dark:border-gray-800
      bg-white dark:bg-gray-900
      transition-all duration-200 ease-in-out
      ${className}
    `}>
      <div className="flex items-center gap-3 min-w-0">
        {logo && (
          <div className={`
            flex-shrink-0 flex items-center justify-center
            w-8 h-8
            transition-all duration-200 ease-in-out
            ${isAnimating ? 'opacity-0' : 'opacity-100'}
          `}>
            {logo}
          </div>
        )}
        <div className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
        `}>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h1>
        </div>
      </div>

      {showCollapseButton && (
        <button
          onClick={toggleCollapse}
          disabled={isAnimating}
          className={`
            p-2 rounded-lg
            text-gray-500 dark:text-gray-400
            hover:bg-gray-100 dark:hover:bg-gray-800
            hover:text-gray-900 dark:hover:text-white
            transition-all duration-200 ease-in-out
            ${isAnimating ? 'cursor-not-allowed opacity-50' : ''}
          `}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`
              w-5 h-5
              transition-transform duration-200 ease-in-out
              ${isCollapsed ? 'rotate-180' : ''}
              ${isAnimating ? 'cursor-not-allowed opacity-50' : ''}
            `}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}