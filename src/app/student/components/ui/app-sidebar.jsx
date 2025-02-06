'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuItems from './components/MenuItems';
import { ProfileSection } from './components/ProfileSection';
import SidebarHeader from './components/SidebarHeader';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setMounted(true);
    if (isMobile) setIsCollapsed(true);
  }, [isMobile]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  if (!mounted) return null;

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '4.5rem' },
    transition: { duration: 0.2, ease: 'easeOut' }
  };

  const contentVariants = {
    expanded: { opacity: 1, transition: { delay: 0.1 } },
    collapsed: { opacity: 0 },
    transition: { duration: 0.1 }
  };

  return (
    <motion.aside
      initial={false}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      className="h-screen flex-col border-r bg-background/95 backdrop-blur-lg transition-all 
                dark:border-dark-700/30 dark:bg-dark-900/95
                shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
                hover:shadow-xl dark:hover:shadow-2xl"
      role="navigation"
      aria-label="Main Navigation"
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        className="border-b border-gray-100/50 dark:border-dark-700/30"
      />

      <motion.div className="flex-1 overflow-hidden py-4">
        <motion.nav
          className={`h-full w-full overflow-y-auto ${
            isCollapsed ? 'px-2' : 'px-3'
          } scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-dark-500`}
          variants={contentVariants}
        >
          <MenuItems isCollapsed={isCollapsed} />
        </motion.nav>
      </motion.div>

      <motion.div
        className="border-t border-gray-100/50 dark:border-dark-700/30"
        variants={contentVariants}
      >
        <ProfileSection isCollapsed={isCollapsed} />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent 
                     dark:from-dark-700/10 pointer-events-none" />
    </motion.aside>
  );
}
