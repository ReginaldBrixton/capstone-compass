'use client';

import { motion } from 'framer-motion';

export const PageContainer = ({ children, className = '', ...props }) => (
  <motion.div
    className={`mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-10 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export const HeaderContainer = ({ children, className = '', ...props }) => (
  <motion.header
    className={`mb-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg backdrop-blur-sm backdrop-filter dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 md:p-10 ${className}`}
    {...props}
  >
    {children}
  </motion.header>
);

export const HeaderContent = ({ children, className = '' }) => (
  <div
    className={`grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr,auto] md:gap-8 ${className}`}
  >
    {children}
  </div>
);

export const TeamInfo = ({
  title,
  description,
  meta,
  icon,
  className = '',
}) => (
  <div className={`space-y-4 ${className}`}>
    <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
      {icon && <span className="text-2xl md:text-3xl">{icon}</span>}
      {title}
    </h1>
    {description && (
      <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
        {description}
      </p>
    )}
    {meta && (
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 md:text-base">
        {meta}
      </div>
    )}
  </div>
);

export const HeaderActions = ({ children, className = '' }) => (
  <div className={`flex flex-wrap gap-3 md:gap-4 ${className}`}>{children}</div>
);

export const ActionButton = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const variants = {
    danger:
      'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50',
    secondary:
      'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
    primary:
      'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700',
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none md:text-base ${variants[variant]} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export const BackButton = ({ children, className = '', ...props }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:-translate-x-0.5 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white md:text-base ${className} `}
    {...props}
  >
    {children}
  </button>
);

export const ContentSection = ({ children, className = '', ...props }) => (
  <motion.section
    className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:p-8 lg:p-10 ${className} `}
    {...props}
  >
    {children}
  </motion.section>
);

export const Grid = ({ children, className = '' }) => (
  <div
    className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 ${className} `}
  >
    {children}
  </div>
);

export const Card = ({ children, className = '', ...props }) => (
  <motion.div
    className={`rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 md:p-6 ${className} `}
    whileHover={{ y: -2 }}
    {...props}
  >
    {children}
  </motion.div>
);
