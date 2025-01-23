import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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

// Navigation menu items with React Icons
const menuItems = [
  {
    id: 'dashboard',
    icon: <HiOutlineHome className="h-6 w-6" />,
    label: 'Dashboard',
    href: '/student',
  },
  {
    id: 'projects',
    icon: <HiOutlineBookOpen className="h-6 w-6" />,
    label: 'Projects',
    href: '/student/projects',
  },
  {
    id: 'schedule',
    icon: <HiOutlineCalendar className="h-6 w-6" />,
    label: 'Schedule',
    href: '/student/schedule',
  },
  {
    id: 'teams',
    icon: <HiOutlineUserGroup className="h-6 w-6" />,
    label: 'Teams',
    href: '/student/teams',
  },
  {
    id: 'assignments',
    icon: <HiOutlineClipboardCheck className="h-6 w-6" />,
    label: 'Assignments',
    href: '/student/assignments',
  },
  {
    id: 'progress',
    icon: <HiOutlineChartBar className="h-6 w-6" />,
    label: 'Progress',
    href: '/student/progress',
  },
  {
    id: 'announcements',
    icon: <HiOutlineSpeakerphone className="h-6 w-6" />,
    label: 'Announcements',
    href: '/student/announcements',
  },
  {
    id: 'messages',
    icon: <HiOutlineChatAlt2 className="h-6 w-6" />,
    label: 'Messages',
    href: '/student/messages',
  },
  {
    id: 'resources',
    icon: <HiOutlineAcademicCap className="h-6 w-6" />,
    label: 'Resources',
    href: '/student/resources',
  },
  {
    id: 'help',
    icon: <HiOutlineQuestionMarkCircle className="h-6 w-6" />,
    label: 'Help',
    href: '/student/help',
  },
];

const MenuItems = ({ isCollapsed }) => {
  const pathname = usePathname();

  const iconAnimation = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <ul
      className="m-0 flex list-none flex-col gap-2 p-0"
      id="sidebar-menu-list"
    >
      {menuItems.map((item) => (
        <motion.li
          key={item.href}
          className={`menu-item relative ${isCollapsed ? 'group' : ''}`}
          id={`menu-item-container-${item.id}`}
          whileHover="hover"
        >
          <Link
            href={item.href}
            className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} rounded-xl py-2.5 outline-none transition-all duration-200 ${
              pathname === item.href
                ? 'bg-primary-50/50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                : 'text-gray-600 hover:bg-gray-50/50 dark:text-gray-400 dark:hover:bg-gray-800/30'
            } `}
            id={`menu-link-${item.id}`}
          >
            <motion.span
              className={`${isCollapsed ? 'mx-0' : 'mr-3'} transition-all duration-200`}
              variants={iconAnimation}
            >
              {item.icon}
            </motion.span>

            {!isCollapsed && (
              <span className="whitespace-nowrap text-sm font-medium transition-all duration-200">
                {item.label}
              </span>
            )}

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900/95 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
              >
                {item.label}
              </motion.div>
            )}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default MenuItems;
