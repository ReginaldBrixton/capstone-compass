'use client';

import { motion } from 'framer-motion';

export const PageContainer = ({ children, className = '', ...props }) => (
  <motion.div
    className={`max-w-[1400px] mx-auto px-4 py-6 md:px-8 md:py-10 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export const HeaderContainer = ({ children, className = '', ...props }) => (
  <motion.header
    className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
    rounded-2xl p-6 md:p-10 mb-8 shadow-lg border border-gray-100 dark:border-gray-700
    backdrop-blur-sm backdrop-filter ${className}`}
    {...props}
  >
    {children}
  </motion.header>
);

export const HeaderContent = ({ children, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 md:gap-8 items-start ${className}`}>
    {children}
  </div>
);

export const TeamInfo = ({ title, description, meta, icon, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
      {icon && <span className="text-2xl md:text-3xl">{icon}</span>}
      {title}
    </h1>
    {description && (
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    )}
    {meta && (
      <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-500 dark:text-gray-400">
        {meta}
      </div>
    )}
  </div>
);

export const HeaderActions = ({ children, className = '' }) => (
  <div className={`flex flex-wrap gap-3 md:gap-4 ${className}`}>
    {children}
  </div>
);

export const ActionButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
    primary: 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
  };

  return (
    <button
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
        transition-all duration-200 text-sm md:text-base
        hover:shadow-md hover:-translate-y-0.5 active:translate-y-0
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const BackButton = ({ children, className = '', ...props }) => (
  <button
    className={`
      flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300
      hover:text-gray-900 dark:hover:text-white transition-colors duration-200
      text-sm md:text-base hover:-translate-x-0.5
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export const ContentSection = ({ children, className = '', ...props }) => (
  <motion.section
    className={`
      bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 lg:p-10
      shadow-lg border border-gray-100 dark:border-gray-700
      ${className}
    `}
    {...props}
  >
    {children}
  </motion.section>
);

export const Grid = ({ children, className = '' }) => (
  <div
    className={`
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      gap-4 md:gap-6 lg:gap-8
      ${className}
    `}
  >
    {children}
  </div>
);

export const Card = ({ children, className = '', ...props }) => (
  <motion.div
    className={`
      bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6
      shadow-sm border border-gray-100 dark:border-gray-700
      hover:shadow-md hover:-translate-y-0.5
      transition-all duration-200
      ${className}
    `}
    whileHover={{ y: -2 }}
    {...props}
  >
    {children}
  </motion.div>
); 