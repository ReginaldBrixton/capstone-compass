"use client";

import React from "react";
import { useSidebar } from "./SidebarContext";
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from "../dropdown";
import { cn } from "../../../../utils/cn";

export const SidebarFooter = React.forwardRef(
  ({ children, className = "", showBorder = true }, ref) => {
    const { isCollapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          "mt-auto flex items-center transition-spacing duration-200",
          showBorder && "border-t border-gray-200/80 dark:border-gray-800/50",
          isCollapsed ? "p-2 justify-center" : "p-4 justify-start",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";

export const SidebarFooterUser = React.forwardRef(
  (
    {
      avatar,
      name,
      description,
      onProfileClick,
      onSettingsClick,
      onLogoutClick,
      className = "",
    },
    ref
  ) => {
    const { isCollapsed } = useSidebar();

    const userAvatar = (
      <div
        className={cn(
          "flex-shrink-0 rounded-full overflow-hidden transition-all duration-200",
          isCollapsed ? "w-9 h-9" : "w-10 h-10",
          avatar 
            ? "border-2 border-gray-200/50 dark:border-gray-800/50"
            : "bg-gray-200/80 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 flex items-center justify-center font-medium"
        )}
      >
        {avatar ? avatar : name?.charAt(0).toUpperCase()}
      </div>
    );

    return (
      <DropdownMenu position="top" align="center">
        <DropdownTrigger asChild>
          <button
            ref={ref}
            type="button"
            className={cn(
              "group flex items-center w-full p-1.5 rounded-xl",
              "transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
              "focus:outline-none",
              isCollapsed ? "justify-center" : "justify-start",
              className
            )}
          >
            {userAvatar}
            {!isCollapsed && (
              <div className="ml-3 text-left flex-1 min-w-0 space-y-0.5">
                <p
                  className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate 
                  transition-colors duration-200 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                >
                  {name}
                </p>
                {description && (
                  <p className="text-xs text-gray-500/90 dark:text-gray-400/80 truncate transition-colors duration-200">
                    {description}
                  </p>
                )}
              </div>
            )}
          </button>
        </DropdownTrigger>
        <DropdownContent 
          className="w-56 py-1.5 shadow-lg border border-gray-100 dark:border-gray-800" 
          sideOffset={12}
        >
          <DropdownItem
            onSelect={onProfileClick}
            className="flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/70"
          >
            <span className="text-lg" aria-hidden="true">👤</span>
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem
            onSelect={onSettingsClick}
            className="flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/70"
          >
            <span className="text-lg" aria-hidden="true">⚙️</span>
            <span>Settings</span>
          </DropdownItem>
          <DropdownSeparator className="my-1 border-t border-gray-200/50 dark:border-gray-800/50" />
          <DropdownItem
            onSelect={onLogoutClick}
            className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400/90 transition-colors duration-200 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-900/20"
          >
            <span className="text-lg" aria-hidden="true">🚪</span>
            <span>Logout</span>
          </DropdownItem>
        </DropdownContent>
      </DropdownMenu>
    );
  }
);

SidebarFooterUser.displayName = "SidebarFooterUser";