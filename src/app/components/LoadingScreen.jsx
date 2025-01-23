'use client';

import React from 'react';
import { motion } from 'framer-motion';

const generateUniqueId = (prefix) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="loading-screen fixed inset-0 flex items-center justify-center z-50 bg-gray-50 dark:bg-gray-900"
      id={generateUniqueId("loading-screen")}
    >
      <div 
        className="loading-spinner relative"
        id={generateUniqueId("loading-spinner-wrapper")}
      >
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"
             id={generateUniqueId("loading-spinner")}
        />
        <div className="mt-4 text-center text-primary-600 dark:text-primary-400 font-medium"
             id={generateUniqueId("loading-text")}
        >
          Loading...
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
