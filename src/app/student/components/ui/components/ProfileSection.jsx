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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      id="profile-section"
      className={`relative group w-full ${isCollapsed ? 'px-1' : 'px-2'}`}
      role="region"
      aria-label="User profile"
    >
      <button
        onClick={toggleProfileMenu}
        className={`w-full flex items-center ${isCollapsed ? 'p-2 justify-center' : 'p-2'} 
          rounded-xl border border-transparent hover:bg-gray-100/50 
          dark:hover:bg-gray-800/50 transition-colors duration-200`}
        aria-expanded={showProfileMenu}
        aria-haspopup="true"
        aria-controls="profile-menu"
      >
        <div className={`flex items-center ${isCollapsed ? '' : 'gap-3 w-full'}`}>
          <div className="relative">
            <img
              src={imageError ? '/default-avatar.svg' : '/placeholder.svg'}
              alt="Profile picture"
              className={`${isCollapsed ? 'w-8 h-8' : 'w-8 h-8'} rounded-lg border 
                border-gray-200 object-cover`}
              loading="lazy"
              onError={handleImageError}
            />
            <div className={`absolute bottom-0 right-0 ${isCollapsed ? 'w-2 h-2' : 'w-2 h-2'} 
              bg-green-500 rounded-full border border-white`}></div>
          </div>

          {!isCollapsed && (
            <div className="text-left flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Student</p>
            </div>
          )}

          {!isCollapsed && (
            <svg
              className={`w-4 h-4 text-gray-400 transform transition-transform ${
                showProfileMenu ? 'rotate-180' : ''
              }`}
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

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-1.5 px-2 py-1 bg-gray-900/90 text-white text-xs rounded-md 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
          whitespace-nowrap z-50 top-1/2 -translate-y-1/2">
          John Doe
        </div>
      )}

      <div
        id="profile-menu"
        className={`absolute right-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border 
          border-gray-100 dark:border-gray-700 mt-1 z-50 transition-all duration-200 
          ${showProfileMenu
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1 pointer-events-none'
          } ${isCollapsed ? 'left-full ml-1.5 -translate-y-full' : ''}`}
        role="menu"
      >
        <div className="p-1">
          <Link
            href="/student/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 
              hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md transition-colors duration-150"
            role="menuitem"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 
              hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md transition-colors duration-150"
            role="menuitem"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 
              hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md transition-colors duration-150"
            role="menuitem"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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

export default ProfileSection;