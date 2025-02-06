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
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
        data-oid="3.bky-7"
      >
        <span className="text-blue-500 dark:text-blue-400" data-oid="74bjhx.">
          👥
        </span>
        <span data-oid="4lrkmet">{team.members.length} Members</span>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.1,
        }}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
        data-oid="y9cou55"
      >
        <span className="text-green-500 dark:text-green-400" data-oid="szlb7xz">
          📅
        </span>
        <span data-oid="tkxw.t-">Created {team.createdAt}</span>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
        data-oid="ghzzg3s"
      >
        <span className="text-purple-500 dark:text-purple-400" data-oid="7xf_qym">
          🎯
        </span>
        <span data-oid="e7a33s_">{team.status}</span>
      </motion.div>
    </>
  );
  return (
    <>
      <motion.button
        className="group mb-6 flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white md:text-base"
        onClick={handleBack}
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        whileHover={{
          x: -4,
        }}
        data-oid=".eh:15-"
      >
        <FiArrowLeft
          className="transition-transform group-hover:-translate-x-1"
          data-oid=":o:k-js"
        />
        Back to Teams
      </motion.button>

      <motion.header
        className="mb-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg backdrop-blur-sm backdrop-filter dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 md:p-8 lg:p-10"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        data-oid="lim6l1m"
      >
        <div
          className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr,auto] md:gap-8"
          data-oid="_k-id3w"
        >
          <motion.div
            className="space-y-4"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            data-oid="y5gcu13"
          >
            <h1
              className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
              data-oid="8bt--rr"
            >
              <span className="text-2xl md:text-3xl" data-oid="hom0fgo">
                👥
              </span>
              {team.name}
            </h1>
            {team.description && (
              <p
                className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg"
                data-oid="6h58c.l"
              >
                {team.description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-sm md:text-base" data-oid="gb8_o21">
              {metaInfo}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 md:gap-4"
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            data-oid="l_y4rx0"
          >
            <button
              className={`flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
              onClick={onEdit}
              disabled={loading}
              data-oid="g.56mj9"
            >
              <FiEdit2 className="h-4 w-4" data-oid="xu3zvpo" />
              Edit Team
            </button>
            <button
              className={`flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 font-medium text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50`}
              onClick={onDelete}
              disabled={loading}
              data-oid="sb3i3n6"
            >
              <FiTrash2 className="h-4 w-4" data-oid="7a0u7-p" />
              Delete
            </button>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};
export default TeamHeader;
