'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { AppSidebar } from './components/ui/app-sidebar';
import { MobileNavbar } from './components/ui/mobile-navbar';

import './globals.css';

// Use a counter for more deterministic IDs
let idCounter = 0;
const generateUniqueId = (prefix) => {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
};

export default function StudentLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="student-layout flex h-screen w-screen overflow-hidden bg-gray-50 transition-colors duration-300 dark:bg-gray-900"
      id={generateUniqueId('layout-container')}
      suppressHydrationWarning
    >
      <AppSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <motion.div
        layout
        className="main-content relative flex w-full min-w-0 flex-1 flex-col"
        id={generateUniqueId('main-content')}
        suppressHydrationWarning
        animate={{
          marginLeft: isSidebarOpen ? '0' : '-16rem',
          transition: {
            duration: 0.2,
            ease: 'easeInOut',
          },
        }}
      >
        <main
          className="main-area scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent m-0 w-full flex-1 overflow-y-auto bg-gray-50 p-6 pb-24 transition-colors duration-300 dark:bg-gray-900"
          id={generateUniqueId('main-area')}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="content-wrapper"
            id={generateUniqueId('content-wrapper')}
          >
            {children}
          </motion.div>
        </main>

        <MobileNavbar />
      </motion.div>
    </div>
  );
}
