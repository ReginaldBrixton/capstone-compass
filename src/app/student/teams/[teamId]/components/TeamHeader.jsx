'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';

const TeamHeader = ({ team, onEdit, onDelete, loading }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/student/teams');
  };

  const metaInfo = (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
      >
        <span className="text-blue-500 dark:text-blue-400">👥</span>
        <span>{team.members.length} Members</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
      >
        <span className="text-green-500 dark:text-green-400">📅</span>
        <span>Created {team.createdAt}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
      >
        <span className="text-purple-500 dark:text-purple-400">🎯</span>
        <span>{team.status}</span>
      </motion.div>
    </>
  );

  return (
    <>
      <motion.button
        className="
          group flex items-center gap-2 px-4 py-2 mb-6
          text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
          transition-colors duration-200 text-sm md:text-base
        "
        onClick={handleBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -4 }}
      >
        <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
        Back to Teams
      </motion.button>

      <motion.header
        className="
          bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
          rounded-2xl p-6 md:p-8 lg:p-10 mb-8
          shadow-lg border border-gray-100 dark:border-gray-700
          backdrop-blur-sm backdrop-filter
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 md:gap-8 items-start">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl md:text-3xl">👥</span>
              {team.name}
            </h1>
            {team.description && (
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {team.description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-sm md:text-base">
              {metaInfo}
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-wrap gap-3 md:gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
                bg-gray-100 text-gray-700 hover:bg-gray-200
                dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700
                transition-all duration-200
                hover:shadow-md hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
              `}
              onClick={onEdit}
              disabled={loading}
            >
              <FiEdit2 className="w-4 h-4" />
              Edit Team
            </button>
            <button
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
                bg-red-50 text-red-600 hover:bg-red-100
                dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50
                transition-all duration-200
                hover:shadow-md hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
              `}
              onClick={onDelete}
              disabled={loading}
            >
              <FiTrash2 className="w-4 h-4" />
              Delete
            </button>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default TeamHeader;
