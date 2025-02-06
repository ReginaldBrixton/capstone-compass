"use client";

import React from "react";

const DropdownSeparator = React.forwardRef(({ className = "" }, ref) => {
  return (
    <div
      ref={ref}
      className={`-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700 ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
});

DropdownSeparator.displayName = "DropdownSeparator";

export { DropdownSeparator }; 