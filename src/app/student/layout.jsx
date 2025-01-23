'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import LoadingScreen from '../components/LoadingScreen';
import { AppSidebar } from './components/ui/app-sidebar';
import { MobileNavbar } from './components/ui/mobile-navbar';

import './globals.css';

const generateUniqueId = (prefix) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

export default function StudentLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <div 
        className="student-layout flex w-screen h-screen bg-gray-50 dark:bg-gray-900 
          overflow-hidden transition-colors duration-300"
        id={generateUniqueId("layout-container")}
      >
        <AppSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

        <motion.div 
          layout
          className="main-content flex flex-1 flex-col min-w-0 w-full relative"
          id={generateUniqueId("main-content")}
          animate={{
            marginLeft: isSidebarOpen ? '0' : '-16rem',
            transition: {
              duration: 0.2,
              ease: 'easeInOut'
            }
          }}
        >
          <main 
            className="main-area flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 
              p-6 pb-24 w-full m-0 scrollbar-thin 
              scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 
              scrollbar-track-transparent transition-colors duration-300"
            id={generateUniqueId("main-area")}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="content-wrapper"
              id={generateUniqueId("content-wrapper")}
            >
              {children}
            </motion.div>
          </main>
          
          <MobileNavbar />
        </motion.div>
      </div>
    </>
  );
}
