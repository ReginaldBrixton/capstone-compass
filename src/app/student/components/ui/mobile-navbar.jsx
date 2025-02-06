'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HomeIcon, BookOpenIcon, CalendarIcon, UserGroupIcon, CheckBadgeIcon, ChartBarIcon, MegaphoneIcon, ChatBubbleLeftIcon, DocumentTextIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import MenuItems from './components/MenuItems';
import { ProfileSection } from './components/ProfileSection';

const menuItems = [
  { label: 'Dashboard', href: '/student', icon: HomeIcon },
  { label: 'Projects', href: '/student/projects', icon: BookOpenIcon },
  { label: 'Schedule', href: '/student/schedule', icon: CalendarIcon },
  { label: 'Teams', href: '/student/teams', icon: UserGroupIcon },
  { label: 'Assignments', href: '/student/assignments', icon: CheckBadgeIcon },
  { label: 'Progress', href: '/student/progress', icon: ChartBarIcon },
  { label: 'Notices', href: '/student/announcements', icon: MegaphoneIcon },
  { label: 'Chats', href: '/student/messages', icon: ChatBubbleLeftIcon },
  { label: 'Resources', href: '/student/resources', icon: DocumentTextIcon },
  { label: 'Help', href: '/student/help', icon: QuestionMarkCircleIcon },
];

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-gray-200/50 bg-background/95 backdrop-blur-lg dark:border-dark-700/30 dark:bg-dark-900/95">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/student" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              Student Portal
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100/80 dark:hover:bg-dark-700/50"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100/80 dark:hover:bg-dark-700/50"
              aria-label="Menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
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
              className="border-t border-gray-200/50 dark:border-dark-700/30"
            >
              <div className="px-4 py-3">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search courses, assignments..."
                    className="w-full rounded-xl bg-gray-100/80 py-2.5 pl-11 pr-4 text-sm transition-all placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-primary-500/30 dark:bg-dark-800 dark:placeholder:text-gray-400 dark:focus:bg-dark-700"
                    autoFocus
                  />
                  <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
              className="fixed bottom-0 right-0 top-0 z-40 flex w-72 flex-col bg-white/95 backdrop-blur-lg dark:bg-dark-900/95"
            >
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-dark-700/50"
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="border-t border-gray-200/50 p-4 dark:border-dark-700/30">
                <ProfileSection isCollapsed={false} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
