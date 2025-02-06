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

const MenuItems = ({ isCollapsed }) => {
  const pathname = usePathname();
  
  const iconAnimation = {
    hover: {
      scale: 1.15,
      rotate: 3,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15,
      },
    },
  };

  return (
    <ul className="m-0 flex list-none flex-col gap-1.5 p-2" id="sidebar-menu-list" data-oid="g5vv9_p">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <motion.li
            key={item.href}
            className="relative"
            id={`menu-item-container-${item.id}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            data-oid="8f2zsml"
          >
            <Link
              href={item.href}
              className={`flex items-center ${
                isCollapsed ? 'px-2.5' : 'px-3'
              } rounded-lg py-2.5 outline-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${
                  isActive 
                    ? 'bg-primary-100/60 text-primary-700 shadow-inner dark:bg-primary-900/30 dark:text-primary-200 dark:shadow-primary-900/50' 
                    : 'text-gray-600 hover:bg-gray-100/60 dark:text-gray-300 dark:hover:bg-gray-800/40'
                }
                border ${
                  isActive 
                    ? 'border-primary-200/50 dark:border-primary-500/30' 
                    : 'border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50'
                }`}
              id={`menu-link-${item.id}`}
              data-oid="64lmlss"
            >
              <motion.span
                className={`${isCollapsed ? '' : 'mr-3'} ${
                  isActive ? 'text-primary-600 dark:text-primary-300' : 'text-gray-500 dark:text-gray-400'
                }`}
                variants={iconAnimation}
                data-oid="z529f8p"
              >
                {React.cloneElement(item.icon, {
                  className: `h-5 w-5 transition-colors ${isActive ? 'text-current' : 'text-gray-600 dark:text-gray-300'}`
                })}
              </motion.span>

              {!isCollapsed && (
                <span className="text-sm font-medium tracking-tight transition-all duration-300">
                  {item.label}
                </span>
              )}

              {isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-sm transition-opacity dark:bg-gray-100 dark:text-gray-900"
                >
                  {item.label}
                  <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-900 dark:bg-gray-100" />
                </motion.div>
              )}
            </Link>

            {!isCollapsed && isActive && (
              <motion.div
                className="absolute -left-2 top-0 h-full w-1 rounded-full bg-primary-500"
                layoutId="active-indicator"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};
export default MenuItems;
