"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDropdown } from "./DropdownMenu";
import { Portal } from "./Portal";

const ANIMATION_DURATION = 200;

const DropdownContent = ({
  children,
  className = "",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  avoidCollisions = true,
  collisionPadding = 8,
  ariaLabel,
}) => {
  const { 
    isOpen, 
    setIsOpen, 
    position, 
    triggerRef 
  } = useDropdown();
  
  const contentRef = useRef(null);
  const [contentStyles, setContentStyles] = useState({});
  const [mounted, setMounted] = useState(false);
  const [animationState, setAnimationState] = useState("exit");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setAnimationState("enter");
      const timer = setTimeout(() => setAnimationState("idle"), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    } else {
      setAnimationState("exit");
    }
  }, [isOpen]);

  const handleClickOutside = useCallback((event) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(event.target) &&
      !triggerRef.current?.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const updatePosition = useCallback(() => {
    if (!isOpen || !triggerRef.current || !mounted || !contentRef.current) return;

    const trigger = triggerRef.current;
    const content = contentRef.current;
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top, left, transform = "";

    // Vertical positioning with collision detection
    switch (position.side) {
      case "top":
        top = triggerRect.top - contentRect.height - sideOffset;
        if (avoidCollisions && top < collisionPadding) {
          top = triggerRect.bottom + sideOffset;
        }
        break;
      case "bottom":
        top = triggerRect.bottom + sideOffset;
        if (avoidCollisions && top + contentRect.height > viewportHeight - collisionPadding) {
          top = triggerRect.top - contentRect.height - sideOffset;
        }
        break;
      case "right":
        top = triggerRect.top;
        left = triggerRect.right + sideOffset;
        if (avoidCollisions && left + contentRect.width > viewportWidth - collisionPadding) {
          left = triggerRect.left - contentRect.width - sideOffset;
        }
        return setContentStyles({
          position: "fixed",
          top: `${Math.max(collisionPadding, Math.min(top, viewportHeight - contentRect.height - collisionPadding))}px`,
          left: `${Math.max(collisionPadding, Math.min(left, viewportWidth - contentRect.width - collisionPadding))}px`,
        });
      case "left":
        top = triggerRect.top;
        left = triggerRect.left - contentRect.width - sideOffset;
        if (avoidCollisions && left < collisionPadding) {
          left = triggerRect.right + sideOffset;
        }
        return setContentStyles({
          position: "fixed",
          top: `${Math.max(collisionPadding, Math.min(top, viewportHeight - contentRect.height - collisionPadding))}px`,
          left: `${Math.max(collisionPadding, Math.min(left, viewportWidth - contentRect.width - collisionPadding))}px`,
        });
    }

    // Horizontal alignment with collision detection
    switch (position.align) {
      case "start":
        left = triggerRect.left;
        if (avoidCollisions && left + contentRect.width > viewportWidth - collisionPadding) {
          left = triggerRect.right - contentRect.width;
        }
        break;
      case "end":
        left = triggerRect.right - contentRect.width;
        if (avoidCollisions && left < collisionPadding) {
          left = triggerRect.left;
        }
        break;
      case "center":
        left = triggerRect.left + (triggerRect.width / 2);
        transform = "translateX(-50%)";
        if (avoidCollisions) {
          if (left + (contentRect.width / 2) > viewportWidth - collisionPadding) {
            left = viewportWidth - contentRect.width - collisionPadding;
            transform = "";
          } else if (left - (contentRect.width / 2) < collisionPadding) {
            left = collisionPadding;
            transform = "";
          }
        }
        break;
    }

    setContentStyles({
      position: "fixed",
      top: `${Math.max(collisionPadding, Math.min(top, viewportHeight - contentRect.height - collisionPadding))}px`,
      left: `${Math.max(collisionPadding, Math.min(left, viewportWidth - contentRect.width - collisionPadding))}px`,
      transform,
      zIndex: 9999,
    });
  }, [isOpen, position, sideOffset, alignOffset, avoidCollisions, collisionPadding, mounted]);

  useEffect(() => {
    if (!isOpen || !mounted) return;

    // Immediate position calculation
    updatePosition();

    const handleUpdate = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate, { passive: true });

    // Ensure the position is updated after a short delay
    const immediateUpdate = setTimeout(updatePosition, 0);
    const shortDelayUpdate = setTimeout(updatePosition, 50);

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
      clearTimeout(immediateUpdate);
      clearTimeout(shortDelayUpdate);
    };
  }, [isOpen, updatePosition, mounted]);

  if (!isOpen || !mounted) return null;

  const { side } = position;

  const slideAnimationClasses = {
    enter: {
      top: "animate-in fade-in-0 slide-in-from-bottom-1 duration-200",
      bottom: "animate-in fade-in-0 slide-in-from-top-1 duration-200",
      right: "animate-in fade-in-0 slide-in-from-left-1 duration-200",
      left: "animate-in fade-in-0 slide-in-from-right-1 duration-200",
    },
    exit: {
      top: "animate-out fade-out-0 slide-out-to-bottom-1 duration-200",
      bottom: "animate-out fade-out-0 slide-out-to-top-1 duration-200",
      right: "animate-out fade-out-0 slide-out-to-left-1 duration-200",
      left: "animate-out fade-out-0 slide-out-to-right-1 duration-200",
    },
  };

  return (
    <Portal>
      <div
        ref={contentRef}
        className={`
          fixed
          min-w-[8rem] 
          overflow-hidden 
          rounded-md 
          border border-gray-200 dark:border-gray-800
          bg-white dark:bg-gray-900
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          ${slideAnimationClasses[animationState === "exit" ? "exit" : "enter"][side]}
          ${className}
        `}
        style={contentStyles}
        role="menu"
        aria-orientation="vertical"
        aria-label={ariaLabel}
        tabIndex={-1}
        data-state={isOpen ? "open" : "closed"}
        data-side={side}
        data-align={position.align}
      >
        <div className="py-1">{children}</div>
      </div>
    </Portal>
  );
};

DropdownContent.displayName = "DropdownContent";

export { DropdownContent }; 