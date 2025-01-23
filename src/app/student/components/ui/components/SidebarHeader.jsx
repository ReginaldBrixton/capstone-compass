import React from 'react';

const SidebarHeader = ({ isCollapsed, toggleSidebar }) => {
  return (
    <header 
      className={`h-16 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}
      id="sidebar-header"
    >
      <div 
        className={`flex items-center gap-2 transition-opacity duration-300 ${
          isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
        }`}
        id="logo-container"
      >
        <div 
          className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg shadow-md"
          id="logo-icon"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-5 h-5 text-white"
            aria-hidden="true"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span 
          className="font-bold text-xl text-gray-900 dark:text-white tracking-tight"
          id="app-logo"
        >
          StudyTrack
        </span>
      </div>

      <button
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        id="sidebar-collapse-button"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none" 
          stroke="currentColor"
          strokeWidth="2"
          className={`w-5 h-5 transition-transform duration-200 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </header>
  );
};

export default SidebarHeader;
