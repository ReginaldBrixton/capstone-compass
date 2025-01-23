'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiFolder, FiGrid, FiMessageSquare, FiUsers } from 'react-icons/fi';

const TabNavigation = ({ activeTab, onChange, tabs }) => {
  const getTabIcon = (id) => {
    switch (id) {
      case 'overview':
        return <FiGrid />;
      case 'members':
        return <FiUsers />;
      case 'tasks':
        return <FiCheckSquare />;
      case 'files':
        return <FiFolder />;
      case 'discussions':
        return <FiMessageSquare />;
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-10 rounded-lg p-4 shadow-sm mb-8">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 sm:gap-1" role="tablist">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`
              flex items-center justify-center gap-2 p-4 rounded-lg transition-all duration-200
              ${activeTab === tab.id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 font-medium hover:bg-gray-50'}
              sm:flex-row sm:text-center sm:p-4
            `}
            onClick={() => onChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-[1.2em]">{getTabIcon(tab.id)}</span>
            <span>{tab.label}</span>
            {tab.count && (
              <span className={`
                px-2 py-1 rounded-full text-xs
                ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}
                sm:absolute sm:top-2 sm:right-2 sm:px-1.5 sm:py-0.5 sm:text-[0.7rem]
              `}>
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-md"
                layoutId="activeTab"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;
