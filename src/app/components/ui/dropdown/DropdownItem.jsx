"use client";

import React, { useCallback, forwardRef, useRef, useEffect } from "react";
import { useDropdown } from "./DropdownMenu";

const DropdownItem = forwardRef(({
  children,
  className = "",
  disabled = false,
  destructive = false,
  inset = false,
  onSelect,
  icon,
  shortcut,
  ...props
}, forwardedRef) => {
  const { setIsOpen, setActiveItem } = useDropdown();
  
  // Create an internal ref that combines the forwarded ref
  const internalRef = useRef(null);
  
  // Sync the internal ref with the forwarded ref
  useEffect(() => {
    if (typeof forwardedRef === 'function') {
      forwardedRef(internalRef.current);
    } else if (forwardedRef) {
      forwardedRef.current = internalRef.current;
    }
  }, [forwardedRef]);

  const handleSelect = useCallback((event) => {
    if (disabled) return;

    event.preventDefault();
    onSelect?.(event);
    setIsOpen(false);
  }, [disabled, onSelect, setIsOpen]);

  const handleKeyDown = useCallback((event) => {
    if (disabled) return;

    switch (event.key) {
      case " ":
      case "Enter":
        event.preventDefault();
        handleSelect(event);
        break;
      case "Tab":
        // Allow normal tab navigation
        break;
      default:
        // Let parent handle other keys
        break;
    }
  }, [disabled, handleSelect]);

  const handleMouseEnter = useCallback(() => {
    if (!disabled && internalRef.current) {
      setActiveItem(internalRef.current);
    }
  }, [disabled, setActiveItem]);

  return (
    <div
      ref={internalRef}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      className={`
        relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors
        ${inset ? "pl-8" : "pl-2"}
        ${disabled ? 
          "pointer-events-none opacity-50" : 
          "cursor-pointer hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
        }
        ${destructive ? 
          "text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400" : 
          "text-gray-900 focus:text-gray-900 dark:text-gray-300 dark:focus:text-gray-300"
        }
        ${className}
      `}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      data-disabled={disabled}
      data-destructive={destructive}
      aria-disabled={disabled}
      {...props}
    >
      {icon && (
        <span className="mr-2 h-4 w-4">
          {icon}
        </span>
      )}
      <span className="flex-grow">{children}</span>
      {shortcut && (
        <span className="ml-auto pl-4 text-xs tracking-widest text-gray-400 dark:text-gray-500">
          {shortcut}
        </span>
      )}
    </div>
  );
});

DropdownItem.displayName = "DropdownItem";

export { DropdownItem }; 