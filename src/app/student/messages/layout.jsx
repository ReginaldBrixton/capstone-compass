'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

const MessagesLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="h-full w-full flex flex-col bg-white dark:bg-gray-900"
      id="messages-layout"
      data-oid="lgtv7nm"
    >
      <div className="flex-1 flex">
        {/* Mobile Toggle Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
          id="sidebar-toggle"
          data-oid="iyx-d5o"
        >
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            data-oid="-gu.dae"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              data-oid="s_mt122"
            />
          </svg>
        </button>

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative inset-y-0 left-0 
            transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 transition-transform duration-200 ease-in-out
            w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800 z-40 flex flex-col
          `}
          id="messages-sidebar"
          data-oid="hs8d3sy"
        >
          <div className="flex-1 overflow-auto" data-oid="f49y_03">
            <Sidebar data-oid="x:f.-8m" />
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 bg-gray-50 dark:bg-gray-900 relative"
          id="messages-main"
          data-oid="dfzmpni"
        >
          <div 
            className="absolute inset-0 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600" 
            data-oid="bso8.a:"
          >
            {children}
          </div>
        </main>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
            id="mobile-overlay"
            aria-hidden="true"
            data-oid="ukvttt5"
          />
        )}
      </div>
    </div>
  );
};

export default MessagesLayout;
