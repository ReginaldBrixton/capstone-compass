'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ProfileSection = ({ isCollapsed }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('#profile-section')) {
        setShowProfileMenu(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showProfileMenu]);

  const handleImageError = () => setImageError(true);

  return (
    <div
      id="profile-section"
      className={`group relative w-full ${isCollapsed ? 'px-1' : 'px-2'}`}
      role="region"
      aria-label="User profile"
    >
      <button
        onClick={toggleProfileMenu}
        className={`flex w-full items-center ${
          isCollapsed ? 'justify-center p-2' : 'p-2'
        } rounded-xl border border-transparent transition-all duration-200 
        hover:bg-gray-50/80 dark:hover:bg-gray-800/80
        focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-primary-400/30`}
        aria-expanded={showProfileMenu}
        aria-haspopup="true"
        aria-controls="profile-menu"
      >
        <div className={`flex items-center ${isCollapsed ? '' : 'w-full gap-3'}`}>
          <div className="relative">
            <img
              src={imageError ? '/default-avatar.svg' : '/placeholder.svg'}
              alt="Profile picture"
              className={`${
                isCollapsed ? 'h-9 w-9' : 'h-9 w-9'
              } rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-800`}
              loading="lazy"
              onError={handleImageError}
            />
            <div
              className={`absolute bottom-0 right-0 ${
                isCollapsed ? 'h-2.5 w-2.5' : 'h-2.5 w-2.5'
              } rounded-full border-2 border-white bg-green-400 dark:border-gray-900`}
            />
          </div>

          {!isCollapsed && (
            <div className="flex-1 text-left">
              <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                John Doe
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                Student
              </p>
            </div>
          )}

          {!isCollapsed && (
            <svg
              className={`h-4 w-4 transform text-gray-500 transition-transform ${
                showProfileMenu ? 'rotate-180' : ''
              } dark:text-gray-300`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </button>

      {isCollapsed && (
        <div
          className="pointer-events-none absolute left-full top-1/2 z-50 ml-1.5 -translate-y-1/2 whitespace-nowrap rounded-md 
          bg-gray-900/90 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 
          group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900"
        >
          John Doe
        </div>
      )}

      <div
        id="profile-menu"
        className={`absolute right-0 z-50 mt-1 w-56 rounded-lg border border-gray-100 bg-white shadow-lg 
        transition-all duration-150 ease-in-out dark:border-gray-700 dark:bg-gray-900 
        ${
          showProfileMenu
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-1 opacity-0'
        } ${isCollapsed ? 'left-full ml-1.5 -translate-y-full' : ''}`}
        role="menu"
      >
        <div className="p-1.5 space-y-1">
          <Link
            href="/student/profile"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm 
            text-gray-700 transition-colors hover:bg-gray-50 
            dark:text-gray-200 dark:hover:bg-gray-800"
            role="menuitem"
          >
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </Link>

          <Link
            href="/student/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm 
            text-gray-700 transition-colors hover:bg-gray-50 
            dark:text-gray-200 dark:hover:bg-gray-800"
            role="menuitem"
          >
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Settings</span>
          </Link>

          <button
            onClick={() => console.log('logout')}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm 
            text-red-600 transition-colors hover:bg-red-50 
            dark:text-red-300 dark:hover:bg-red-900/20"
            role="menuitem"
          >
            <svg
              className="h-4 w-4 text-red-500 dark:text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProfileSection };
