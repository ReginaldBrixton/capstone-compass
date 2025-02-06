import React from 'react';
import { motion } from 'framer-motion';
const MemberCard = ({ member, onRemove, onPromote, isCurrentUserLeader }) => {
  return (
    <motion.div
      className={`MemberCard member-card relative flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 md:p-6`}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      layout
      id={`member-card-${member.id}`}
      data-oid="m3r8lmw"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-xl md:h-16 md:w-16 md:text-2xl ${member.color || 'from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800'} border-2 border-white text-blue-700 shadow-md dark:border-gray-700 dark:text-blue-200`}
        id={`member-avatar-${member.id}`}
        data-oid="3lpemgk"
      >
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="h-full w-full rounded-full object-cover"
            data-oid="ge4u0nn"
          />
        ) : (
          member.name.charAt(0).toUpperCase()
        )}
      </div>

      <div className="min-w-0 flex-1" id={`member-info-${member.id}`} data-oid="pb44uru">
        <h3
          className="mb-1 truncate text-lg font-semibold text-gray-900 dark:text-white"
          data-oid="t5n6t3u"
        >
          {member.name}
        </h3>
        <div className="flex items-center gap-2" data-oid=":g5phmd">
          {member.role === 'leader' ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
              id={`member-badge-${member.id}`}
              data-oid="f5_jv:d"
            >
              👑 Team Leader
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              id={`member-badge-${member.id}`}
              data-oid="61py70w"
            >
              👤 Team Member
            </span>
          )}
        </div>
      </div>

      {isCurrentUserLeader && member.role !== 'leader' && (
        <div
          className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          id={`member-actions-${member.id}`}
          data-oid="-.k4x24"
        >
          <motion.button
            className="rounded-lg bg-amber-100 p-2 text-amber-600 transition-all duration-200 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => onPromote(member.id)}
            title="Promote to Leader"
            id={`promote-button-${member.id}`}
            data-oid="mqolbr0"
          >
            👑
          </motion.button>
          <motion.button
            className="rounded-lg bg-red-100 p-2 text-red-600 transition-all duration-200 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => onRemove(member.id)}
            title="Remove Member"
            id={`remove-button-${member.id}`}
            data-oid=".pvltgp"
          >
            ✖️
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};
export default MemberCard;
