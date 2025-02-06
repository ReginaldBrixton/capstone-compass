'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SidebarContext = createContext({
  isOpen: true,
  isCollapsed: false,
  toggleSidebar: () => {},
  toggleCollapse: () => {},
  width: '240px',
  collapsedWidth: '64px',
  animationDuration: 200,

});

export function SidebarProvider({ 
  children, 
  defaultOpen = true,
  defaultWidth = '240px',
  defaultCollapsedWidth = '64px',
  animationDuration = 200,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Add resize observer to handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsOpen(prev => !prev);
      
      // Automatically close sidebar on mobile when clicking outside
      if (window.innerWidth < 768) {
        const handleClickOutside = (e) => {
          if (!e.target.closest('aside')) {
            setIsOpen(false);
            document.removeEventListener('click', handleClickOutside);
          }
        };
        document.addEventListener('click', handleClickOutside);
      }
    }
  }, [isAnimating]);

  const toggleCollapse = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsCollapsed(prev => !prev);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, animationDuration]);

  const value = {
    isOpen,
    isCollapsed,
    isAnimating,
    toggleSidebar,
    toggleCollapse,
    width: defaultWidth,
    collapsedWidth: defaultCollapsedWidth,
    animationDuration,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};