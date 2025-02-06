"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const DropdownContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  activeItem: null,
  setActiveItem: () => {},
  menuRef: null,
  triggerRef: null,
  position: { side: "bottom", align: "start" },
});

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownMenu");
  }
  return context;
};

const DropdownMenu = ({ 
  children, 
  className = "",
  position: manualPosition,
  align = "start"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [position, setPosition] = useState({ 
    side: manualPosition || "bottom", 
    align 
  });
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !menuRef.current || manualPosition) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const content = menuRef.current?.querySelector('[role="menu"]');
      if (!trigger || !content) return;

      const triggerRect = trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Add safety margin for better UX
      const SAFETY_MARGIN = 8;

      // Calculate available space in each direction
      const spaceAbove = triggerRect.top;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;

      // Determine vertical position (side)
      let side = manualPosition || "bottom";
      
      // Only calculate automatic position if no manual position is set
      if (!manualPosition) {
        if (spaceBelow < contentRect.height + SAFETY_MARGIN) {
          if (spaceAbove > contentRect.height + SAFETY_MARGIN) {
            side = "top";
          } else {
            side = spaceAbove > spaceBelow ? "top" : "bottom";
          }
        }
      }

      // Determine horizontal alignment
      let currentAlign = align;
      const contentWidth = contentRect.width + SAFETY_MARGIN;

      // Convert right/left positions to appropriate alignment
      if (side === "right") {
        currentAlign = "start";
        side = "right";
      } else if (side === "left") {
        currentAlign = "end";
        side = "left";
      } else if (!manualPosition) {
        if (spaceRight < contentWidth) {
          if (spaceLeft > contentWidth) {
            currentAlign = "end";
          } else {
            currentAlign = "center";
          }
        }

        // Special case: if content would overflow both sides even when centered
        if (currentAlign === "center" && contentWidth > viewportWidth) {
          currentAlign = spaceLeft > spaceRight ? "end" : "start";
        }
      }

      setPosition({ side, align: currentAlign });
    };

    // Initial position update
    updatePosition();

    // Update position on scroll and resize
    const handleUpdate = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen, manualPosition, align]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
    if (!menuItems?.length) return;

    const currentIndex = Array.from(menuItems).findIndex(
      (item) => item === document.activeElement
    );

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex < menuItems.length - 1) {
          menuItems[currentIndex + 1].focus();
        } else {
          menuItems[0].focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex > 0) {
          menuItems[currentIndex - 1].focus();
        } else {
          menuItems[menuItems.length - 1].focus();
        }
        break;
      case "Home":
        e.preventDefault();
        menuItems[0].focus();
        break;
      case "End":
        e.preventDefault();
        menuItems[menuItems.length - 1].focus();
        break;
      default:
        break;
    }
  };

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        activeItem,
        setActiveItem,
        menuRef,
        triggerRef,
        position,
      }}
    >
      <div
        ref={menuRef}
        className={`relative inline-block text-left ${className}`}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

DropdownMenu.displayName = "DropdownMenu";

export { DropdownMenu, useDropdown }; 