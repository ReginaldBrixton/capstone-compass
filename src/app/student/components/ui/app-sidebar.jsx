'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuItems from './components/MenuItems';
import ProfileSection from './components/ProfileSection';
import SidebarHeader from './components/SidebarHeader';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setMounted(true);
    // Auto-collapse sidebar on mobile
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!mounted) {
    return null;
  }

  const sidebarVariants = {
    expanded: {
      width: '16rem',
      transition: {
        duration: 0.2,
        type: 'tween',
        ease: 'easeOut',
      },
    },
    collapsed: {
      width: '4.5rem',
      transition: {
        duration: 0.2,
        type: 'tween',
        ease: 'easeOut',
      },
    },
  };

  const contentVariants = {
    expanded: {
      opacity: 1,
      transition: {
        duration: 0.1,
        delay: 0.1,
      },
    },
    collapsed: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.aside
      initial={false}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      className="app-sidebar-container sticky top-0 z-50 hidden h-screen flex-col rounded-r-2xl border-r border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-lg transition-colors duration-300 dark:border-gray-800/50 dark:bg-gray-900/90 dark:text-gray-100 md:flex"
      id="app-sidebar-main"
      role="navigation"
      aria-label="Main Navigation"
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        className="sidebar-header-section relative z-10"
        id="sidebar-header"
      />

      <motion.div
        className="sidebar-content-wrapper relative flex-1 overflow-hidden"
        id="sidebar-content"
      >
        <motion.nav
          className={`sidebar-nav h-full w-full overflow-y-auto ${isCollapsed ? 'px-0.5' : 'px-2'} scrollbar-none py-3 transition-colors duration-300`}
          id="sidebar-navigation"
          variants={contentVariants}
        >
          <MenuItems isCollapsed={isCollapsed} />
        </motion.nav>
      </motion.div>

      <motion.div
        className="sidebar-profile-wrapper relative z-10 mt-auto w-full px-0.5"
        id="sidebar-profile"
        variants={contentVariants}
      >
        <ProfileSection isCollapsed={isCollapsed} />
      </motion.div>

      {/* Background Gradient Effect */}
      <div
        className="sidebar-gradient pointer-events-none absolute inset-0 rounded-r-2xl bg-gradient-to-b from-primary-50/10 via-transparent to-primary-50/10 dark:from-primary-900/10 dark:to-primary-900/10"
        id="sidebar-gradient"
      />
    </motion.aside>
  );
}
