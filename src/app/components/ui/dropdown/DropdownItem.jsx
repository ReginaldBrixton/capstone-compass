"use client";

import React from "react";
import { useDropdown } from "./DropdownMenu";

const DropdownItem = React.forwardRef(({
  children,
  className = "",
  disabled = false,
  onSelect,
  icon,
  shortcut,
}, ref) => {
  const { setIsOpen, activeItem, setActiveItem } = useDropdown();

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled && onSelect) {
      onSelect();
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setActiveItem(children);
    }
  };

  return (
    <button
      ref={ref}
      className={`
        relative flex w-full items-center
        px-4 py-2 text-sm
        text-gray-700 dark:text-gray-300
        transition-colors
        outline-none
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-default"
        }
        ${
          activeItem === children
            ? "bg-gray-100 dark:bg-gray-800"
            : ""
        }
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      role="menuitem"
      disabled={disabled}
      tabIndex={0}
    >
      {icon && (
        <span className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400">
          {icon}
        </span>
      )}
      <span className="flex-grow">{children}</span>
      {shortcut && (
        <span className="ml-auto pl-4 text-xs text-gray-500 dark:text-gray-400">
          {shortcut}
        </span>
      )}
    </button>
  );
});

DropdownItem.displayName = "DropdownItem";

export { DropdownItem }; 