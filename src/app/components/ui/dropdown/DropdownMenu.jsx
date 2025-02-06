"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

const DropdownContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  activeItem: null,
  setActiveItem: () => {},
  menuRef: null,
  triggerRef: null,
  position: { side: "bottom", align: "start" },
  onOpenChange: (open) => {},
});

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownMenu");
  }
  return context;
};

const VALID_PLACEMENTS = ["top", "bottom", "left", "right"];
const VALID_ALIGNMENTS = ["start", "center", "end"];

const DropdownMenu = ({ 
  children, 
  className = "",
  position: manualPosition,
  align = "start",
  defaultOpen = false,
  onOpenChange,
  modal = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeItem, setActiveItem] = useState(null);
  const [position, setPosition] = useState({ 
    side: VALID_PLACEMENTS.includes(manualPosition) ? manualPosition : "bottom", 
    align: VALID_ALIGNMENTS.includes(align) ? align : "start"
  });
  
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  // Memoize position calculation to prevent unnecessary re-renders
  const calculatePosition = useCallback(() => {
    if (!isOpen || !menuRef.current || manualPosition) return;

    const trigger = triggerRef.current;
    const content = menuRef.current?.querySelector('[role="menu"]');
    if (!trigger || !content) return;

    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const SAFETY_MARGIN = 8;

    const spaceAbove = triggerRect.top;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = viewportWidth - triggerRect.right;

    let side = manualPosition || "bottom";
    
    if (!manualPosition) {
      if (spaceBelow < contentRect.height + SAFETY_MARGIN) {
        if (spaceAbove > contentRect.height + SAFETY_MARGIN) {
          side = "top";
        } else {
          side = spaceAbove > spaceBelow ? "top" : "bottom";
        }
      }
    }

    let currentAlign = align;
    const contentWidth = contentRect.width + SAFETY_MARGIN;

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

      if (currentAlign === "center" && contentWidth > viewportWidth) {
        currentAlign = spaceLeft > spaceRight ? "end" : "start";
      }
    }

    setPosition({ side, align: currentAlign });
  }, [isOpen, manualPosition, align]);

  // Handle open state changes
  useEffect(() => {
    onOpenChange?.(isOpen);
    
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement;
      calculatePosition();
    } else {
      previousActiveElementRef.current?.focus();
    }
  }, [isOpen, calculatePosition, onOpenChange]);

  // Position update effect
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => {
      requestAnimationFrame(calculatePosition);
    };

    const options = { passive: true };
    window.addEventListener("scroll", handleUpdate, options);
    window.addEventListener("resize", handleUpdate, options);

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen, calculatePosition]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
    if (!menuItems?.length) return;

    const currentIndex = Array.from(menuItems).findIndex(
      (item) => item === document.activeElement
    );

    const focusItem = (index) => {
      menuItems[index]?.focus();
    };

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        focusItem(currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusItem(currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1);
        break;
      case "Home":
        e.preventDefault();
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        focusItem(menuItems.length - 1);
        break;
      case "Tab":
        if (modal) {
          e.preventDefault();
        }
        break;
      default:
        // Handle type-ahead
        if (e.key.length === 1) {
          const items = Array.from(menuItems);
          const nextItem = items.find((item, index) => 
            index > currentIndex && 
            item.textContent?.toLowerCase().startsWith(e.key.toLowerCase())
          ) || items.find(item => 
            item.textContent?.toLowerCase().startsWith(e.key.toLowerCase())
          );
          if (nextItem) {
            e.preventDefault();
            nextItem.focus();
          }
        }
        break;
    }
  }, [isOpen, modal]);

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
        onOpenChange,
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