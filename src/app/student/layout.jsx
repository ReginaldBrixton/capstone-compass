'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
  SidebarNavGroup,
  SidebarFooter,
  SidebarFooterUser
} from '../components/ui/sidebar';
import { MobileNavbar } from './components/ui/mobile-navbar';
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineSpeakerphone,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
  HiOutlineUserGroup,
  HiOutlineClipboardCheck,
  HiOutlineAcademicCap,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi';
import './globals.css';

// Navigation menu items with React Icons
const menuItems = [
  {
    id: 'dashboard',
    icon: <HiOutlineHome className="h-6 w-6" data-oid="6a2gmf8" />,
    label: 'Dashboard',
    href: '/student',
  },
  {
    id: 'projects',
    icon: <HiOutlineBookOpen className="h-6 w-6" data-oid="y.a.k15" />,
    label: 'Projects',
    href: '/student/projects',
  },
  {
    id: 'schedule',
    icon: <HiOutlineCalendar className="h-6 w-6" data-oid="h6m3rdk" />,
    label: 'Schedule',
    href: '/student/schedule',
  },
  {
    id: 'teams',
    icon: <HiOutlineUserGroup className="h-6 w-6" data-oid="f1x7k0y" />,
    label: 'Teams',
    href: '/student/teams',
  },
  {
    id: 'assignments',
    icon: <HiOutlineClipboardCheck className="h-6 w-6" data-oid="eliw3p:" />,
    label: 'Assignments',
    href: '/student/assignments',
  },
  {
    id: 'progress',
    icon: <HiOutlineChartBar className="h-6 w-6" data-oid="ptpdulx" />,
    label: 'Progress',
    href: '/student/progress',
  },
  {
    id: 'announcements',
    icon: <HiOutlineSpeakerphone className="h-6 w-6" data-oid="vj8--32" />,
    label: 'Announcements',
    href: '/student/announcements',
  },
  {
    id: 'messages',
    icon: <HiOutlineChatAlt2 className="h-6 w-6" data-oid="20_.4q8" />,
    label: 'Messages',
    href: '/student/messages',
  },
  {
    id: 'resources',
    icon: <HiOutlineAcademicCap className="h-6 w-6" data-oid="m1b.45m" />,
    label: 'Resources',
    href: '/student/resources',
  },
  {
    id: 'help',
    icon: <HiOutlineQuestionMarkCircle className="h-6 w-6" data-oid="ts92p35" />,
    label: 'Help',
    href: '/student/help',
  },
];

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
      data-oid="k:rxj4v"
    >
      {/* Fixed sidebar container */}
      <div className="sidebar-container hidden md:block" data-oid=":d0adb5">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader title="Student Portal" />
            <SidebarNav>
              {menuItems.map((item) => (
                <SidebarNavItem
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  icon={() => item.icon}
                />
              ))}
            </SidebarNav>
            <SidebarFooter>
              <SidebarFooterUser
                name="Student Name"
                description="student@example.com"
              />
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </div>

      {/* Main content area */}
      <motion.div
        layout
        className="main-content relative flex w-full min-w-0 flex-1 flex-col"
        id={generateUniqueId('main-content')}
        suppressHydrationWarning
        data-oid="9u3krzk"
      >
        {/* Mobile navigation - only visible on mobile */}
        <div className="md:hidden" data-oid="d7e256f">
          <MobileNavbar data-oid="bkx2zun" />
        </div>

        {/* Main scrollable area */}
        <main
          className="main-area scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent m-0 w-full flex-1 overflow-y-auto bg-gray-50 p-6 pb-24 transition-colors duration-300 dark:bg-gray-900 md:mt-0"
          id={generateUniqueId('main-area')}
          data-oid="e4c.5wj"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="content-wrapper"
            id={generateUniqueId('content-wrapper')}
            data-oid="8bun1vf"
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
