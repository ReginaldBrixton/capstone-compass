import React from 'react';

const SidebarHeader = ({ isCollapsed, toggleSidebar }) => {
  return (
    <header
      className={`flex h-16 items-center justify-between border-b border-gray-200/50 bg-background/95 px-4 backdrop-blur-lg transition-all duration-300 ease-in-out dark:border-dark-700/30 dark:bg-dark-900/95 ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}
      id="sidebar-header"
      data-oid="g1f.hrd"
    >
      <div
        className={`flex items-center gap-2 transition-all duration-300 ${
          isCollapsed ? 'w-0 scale-0 opacity-0' : 'scale-100 opacity-100'
        } transform-gpu`}
        id="logo-container"
        data-oid="iv-zc7p"
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-md shadow-indigo-500/20 dark:from-indigo-500 dark:to-indigo-600 dark:shadow-indigo-600/30"
          id="logo-icon"
          data-oid="ewjnqk_"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-white"
            aria-hidden="true"
            data-oid="_9xqw4i"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-oid="sic9c6b" />
          </svg>
        </div>
        <span
          className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-indigo-400 dark:to-purple-400"
          id="app-logo"
          data-oid="a2rdxkp"
        >
          StudyTrack
        </span>
      </div>

      <button
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className="rounded-lg p-2 text-gray-700 transition-all duration-200 hover:bg-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 dark:text-gray-300 dark:hover:bg-indigo-400/10 dark:focus:ring-indigo-400/30 dark:focus:ring-offset-dark-900"
        id="sidebar-collapse-button"
        data-oid="3z6eetj"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-5 w-5 transition-transform duration-200 text-gray-700 dark:text-gray-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
          data-oid="lz_k7gu"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
            data-oid="ofuhqyn"
          />
        </svg>
      </button>
    </header>
  );
};

export default SidebarHeader;
