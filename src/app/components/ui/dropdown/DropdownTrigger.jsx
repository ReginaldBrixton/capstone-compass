"use client";

import React, { forwardRef } from "react";
import { useDropdown } from "./DropdownMenu";

const DropdownTrigger = forwardRef(({
  children,
  className = "",
  disabled = false,
  asChild = false,
}, _ref) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdown();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  if (asChild) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      ref: triggerRef,
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        child.props.onClick?.(e);
        handleClick(e);
      },
      "aria-expanded": isOpen,
      "aria-haspopup": true,
      disabled: disabled || child.props.disabled,
    });
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}`}
      onClick={handleClick}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {children}
    </button>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";

export { DropdownTrigger }; 