"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDropdown } from "./DropdownMenu";
import { Portal } from "./Portal";

const DropdownContent = ({
  children,
  className = "",
  sideOffset = 4,
}) => {
  const { isOpen, setIsOpen, position, triggerRef } = useDropdown();
  const contentRef = useRef(null);
  const [contentStyles, setContentStyles] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !mounted) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger || !contentRef.current) return;

      const triggerRect = trigger.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate base position
      let top, left, transform = "";

      // Vertical positioning
      switch (position.side) {
        case "top":
          top = triggerRect.top - contentRect.height - sideOffset;
          if (top < 0) {
            top = triggerRect.bottom + sideOffset;
          }
          break;
        case "bottom":
          top = triggerRect.bottom + sideOffset;
          if (top + contentRect.height > viewportHeight) {
            top = triggerRect.top - contentRect.height - sideOffset;
          }
          break;
        case "right":
          top = triggerRect.top;
          left = triggerRect.right + sideOffset;
          if (left + contentRect.width > viewportWidth) {
            left = triggerRect.left - contentRect.width - sideOffset;
          }
          return setContentStyles({
            position: "fixed",
            top: `${top}px`,
            left: `${left}px`,
          });
        case "left":
          top = triggerRect.top;
          left = triggerRect.left - contentRect.width - sideOffset;
          if (left < 0) {
            left = triggerRect.right + sideOffset;
          }
          return setContentStyles({
            position: "fixed",
            top: `${top}px`,
            left: `${left}px`,
          });
      }

      // Horizontal positioning for top/bottom
      switch (position.align) {
        case "start":
          left = triggerRect.left;
          if (left + contentRect.width > viewportWidth) {
            left = triggerRect.right - contentRect.width;
          }
          break;
        case "end":
          left = triggerRect.right - contentRect.width;
          if (left < 0) {
            left = triggerRect.left;
          }
          break;
        case "center":
          left = triggerRect.left + (triggerRect.width / 2);
          transform = "translateX(-50%)";
          if (left + (contentRect.width / 2) > viewportWidth) {
            left = viewportWidth - contentRect.width - 8;
            transform = "";
          } else if (left - (contentRect.width / 2) < 0) {
            left = 8;
            transform = "";
          }
          break;
      }

      setContentStyles({
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        transform,
      });
    };

    // Initial position update
    requestAnimationFrame(() => {
      updatePosition();
    });

    const handleUpdate = () => requestAnimationFrame(updatePosition);

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen, position, sideOffset, triggerRef, mounted]);

  if (!isOpen || !mounted) return null;

  const { side, align } = position;

  const slideAnimationClasses = {
    top: "animate-in fade-in-0 slide-in-from-bottom-1 duration-200",
    bottom: "animate-in fade-in-0 slide-in-from-top-1 duration-200",
    right: "animate-in fade-in-0 slide-in-from-left-1 duration-200",
    left: "animate-in fade-in-0 slide-in-from-right-1 duration-200",
  };

  return (
    <Portal>
      <div
        ref={contentRef}
        className={`
          z-[9999]
          min-w-[8rem] 
          overflow-hidden 
          rounded-md 
          border border-gray-200 dark:border-gray-800
          bg-white dark:bg-gray-900
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          ${slideAnimationClasses[side]}
          ${className}
        `}
        style={contentStyles}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        data-side={side}
        data-align={align}
      >
        <div className="py-1">{children}</div>
      </div>
    </Portal>
  );
};

DropdownContent.displayName = "DropdownContent";

export { DropdownContent }; 