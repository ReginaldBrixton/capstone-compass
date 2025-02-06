'use client';

import React from 'react';
import { useSidebar } from './SidebarContext';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from "../dropdown";

export const SidebarFooter = React.forwardRef(({
  children,
  className = '',
  showBorder = true,
}, ref) => {
  const { isCollapsed } = useSidebar();

  return (
    <div
      ref={ref}
      className={`
        flex items-center justify-center
        p-4
        ${showBorder ? 'border-t border-gray-200 dark:border-gray-800' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
});

SidebarFooter.displayName = "SidebarFooter";

export const SidebarFooterUser = React.forwardRef(({
  avatar,
  name,
  description,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  className = '',
}, ref) => {
  const { isCollapsed } = useSidebar();

  const userAvatar = avatar ? (
    <div className={`
      flex-shrink-0 
      ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}
      rounded-full overflow-hidden
      border-2 border-gray-200 dark:border-gray-700
    `}>
      {avatar}
    </div>
  ) : (
    <div className={`
      flex items-center justify-center
      ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}
      rounded-full
      bg-gray-200 dark:bg-gray-700
      text-gray-600 dark:text-gray-300
    `}>
      {name?.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <DropdownMenu position="top" align="center">
      <DropdownTrigger asChild>
        <button
          ref={ref}
          type="button"
          className={`
            flex items-center justify-center
            w-full p-2
            rounded-lg
            transition-colors
            hover:bg-gray-100 dark:hover:bg-gray-800
            ${className}
          `}
        >
          {userAvatar}
          {!isCollapsed && (
            <div className="ml-3 text-left flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {name}
              </p>
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {description}
                </p>
              )}
            </div>
          )}
        </button>
      </DropdownTrigger>
      <DropdownContent className="w-56">
        <DropdownItem onSelect={onProfileClick}>
          Profile
        </DropdownItem>
        <DropdownItem onSelect={onSettingsClick}>
          Settings
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={onLogoutClick}>
          Logout
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
});

SidebarFooterUser.displayName = "SidebarFooterUser";