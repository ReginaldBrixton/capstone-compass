import React from 'react';

const SidebarHeader = ({ isCollapsed, toggleSidebar }) => {
  return (
    <header
      className={`flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}
      id="sidebar-header"
    >
      <div
        className={`flex items-center gap-2 transition-opacity duration-300 ${
          isCollapsed ? 'w-0 opacity-0' : 'opacity-100'
        }`}
        id="logo-container"
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-md"
          id="logo-icon"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-white"
            aria-hidden="true"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          id="app-logo"
        >
          StudyTrack
        </span>
      </div>

      <button
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className="rounded-lg p-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900"
        id="sidebar-collapse-button"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-5 w-5 transition-transform duration-200 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </header>
  );
};

export default SidebarHeader;
