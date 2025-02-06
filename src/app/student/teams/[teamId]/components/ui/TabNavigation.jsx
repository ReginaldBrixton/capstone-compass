'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiFolder, FiGrid, FiMessageSquare, FiUsers } from 'react-icons/fi';
const TabNavigation = ({ activeTab, onChange, tabs }) => {
  const getTabIcon = (id) => {
    switch (id) {
      case 'overview':
        return <FiGrid data-oid="gn2vv35" />;
      case 'members':
        return <FiUsers data-oid="b2:k59o" />;
      case 'tasks':
        return <FiCheckSquare data-oid="o0kp1ed" />;
      case 'files':
        return <FiFolder data-oid="c7rbgxi" />;
      case 'discussions':
        return <FiMessageSquare data-oid="7b79qor" />;
      default:
        return null;
    }
  };
  return (
    <nav
      className="sticky top-0 z-10 mb-8 rounded-lg bg-white/90 p-4 shadow-sm backdrop-blur-md"
      data-oid="mcqobmt"
    >
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 sm:gap-1"
        role="tablist"
        data-oid="8d-0rmc"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex items-center justify-center gap-2 rounded-lg p-4 transition-all duration-200 ${activeTab === tab.id ? 'bg-blue-50 font-semibold text-blue-600' : 'font-medium text-gray-600 hover:bg-gray-50'} sm:flex-row sm:p-4 sm:text-center`}
            onClick={() => onChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
            whileTap={{
              scale: 0.98,
            }}
            data-oid="d1lu4gc"
          >
            <span className="text-[1.2em]" data-oid="h6:uqf.">
              {getTabIcon(tab.id)}
            </span>
            <span data-oid=":66-x3t">{tab.label}</span>
            {tab.count && (
              <span
                className={`rounded-full px-2 py-1 text-xs ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} sm:absolute sm:right-2 sm:top-2 sm:px-1.5 sm:py-0.5 sm:text-[0.7rem]`}
                data-oid=".h:6tpu"
              >
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-md bg-blue-600"
                layoutId="activeTab"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
                data-oid="nlr:hs."
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
};
export default TabNavigation;
