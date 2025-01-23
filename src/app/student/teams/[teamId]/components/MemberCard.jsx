import React from 'react';
import { motion } from 'framer-motion';

const MemberCard = ({ member, onRemove, onPromote, isCurrentUserLeader }) => {
  return (
    <motion.div
      className={`
        MemberCard member-card
        bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6
        flex items-center gap-4 relative
        shadow-sm border border-gray-100 dark:border-gray-700
        hover:shadow-md hover:-translate-y-1
        transition-all duration-300 ease-in-out
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      id={`member-card-${member.id}`}
    >
      <div 
        className={`
          w-14 h-14 md:w-16 md:h-16 rounded-full
          flex items-center justify-center text-xl md:text-2xl
          bg-gradient-to-br ${member.color || 'from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800'}
          text-blue-700 dark:text-blue-200
          border-2 border-white dark:border-gray-700 shadow-md
        `}
        id={`member-avatar-${member.id}`}
      >
        {member.avatar ? (
          <img 
            src={member.avatar} 
            alt={member.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          member.name.charAt(0).toUpperCase()
        )}
      </div>

      <div className="flex-1 min-w-0" id={`member-info-${member.id}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
          {member.name}
        </h3>
        <div className="flex items-center gap-2">
          {member.role === 'leader' ? (
            <span 
              className="
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
                bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300
                font-medium
              "
              id={`member-badge-${member.id}`}
            >
              👑 Team Leader
            </span>
          ) : (
            <span 
              className="
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
                bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300
                font-medium
              "
              id={`member-badge-${member.id}`}
            >
              👤 Team Member
            </span>
          )}
        </div>
      </div>

      {isCurrentUserLeader && member.role !== 'leader' && (
        <div 
          className="
            absolute top-4 right-4 flex gap-2
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          "
          id={`member-actions-${member.id}`}
        >
          <motion.button
            className="
              p-2 rounded-lg text-amber-600 bg-amber-100 
              dark:text-amber-300 dark:bg-amber-900/30
              hover:bg-amber-200 dark:hover:bg-amber-900/50
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-amber-500
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPromote(member.id)}
            title="Promote to Leader"
            id={`promote-button-${member.id}`}
          >
            👑
          </motion.button>
          <motion.button
            className="
              p-2 rounded-lg text-red-600 bg-red-100
              dark:text-red-300 dark:bg-red-900/30
              hover:bg-red-200 dark:hover:bg-red-900/50
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-red-500
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemove(member.id)}
            title="Remove Member"
            id={`remove-button-${member.id}`}
          >
            ✖️
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default MemberCard;
