'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import MenuItems from './components/MenuItems';

const generateUniqueId = (prefix) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

// Navigation menu items configuration
const menuItems = [
  { icon: '🏠', label: 'Dashboard', href: '/student' },
  { icon: '📚', label: 'Projects', href: '/student/projects' },
  { icon: '📅', label: 'Schedule', href: '/student/schedule' },
  { icon: '👥', label: 'Teams', href: '/student/teams' },
  { icon: '✅', label: 'Assignments', href: '/student/assignments' },
  { icon: '📈', label: 'Progress', href: '/student/progress' },
  { icon: '📢', label: 'Notices', href: '/student/announcements' },
  { icon: '💬', label: 'Chats', href: '/student/messages' },
  { icon: '📚', label: 'Resources', href: '/student/resources' },
  { icon: '❓', label: 'Help', href: '/student/help' },
];

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50" id="mobile-nav">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/student" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              Student Portal
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle search"
            >
              <FiSearch className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200/50 dark:border-gray-800/50"
            >
              <div className="p-4">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="md:hidden fixed top-[62px] right-0 bottom-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto"
          >
            <div className="py-4">
              <MenuItems />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
