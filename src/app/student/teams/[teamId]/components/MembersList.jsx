import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAward, FiMail, FiMoreVertical, FiStar, FiTrash2 } from 'react-icons/fi';

import ConfirmDialog from './ConfirmDialog';

const getRandomColor = (name) => {
  const colors = [
    { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
    { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
    { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
    { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-300' },
    { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  ];
  const index = name.length % colors.length;
  return colors[index];
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const MembersList = ({ members, onRemoveMember, onPromoteMember, isCurrentUserLeader }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openActionsMenu, setOpenActionsMenu] = useState(null);

  const handleRemove = () => {
    onRemoveMember(selectedMember.id);
    setShowDeleteDialog(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
          {members.map((member) => {
            const color = getRandomColor(member.name);
            return (
              <motion.div
                key={member.id}
                className={`
                  group bg-white dark:bg-gray-800 rounded-xl p-5 md:p-6
                  shadow-sm border border-gray-100 dark:border-gray-700
                  hover:shadow-md hover:-translate-y-1
                  transition-all duration-300 ease-in-out
                  relative
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <div className="flex items-start gap-4">
                  <div 
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-full
                      flex items-center justify-center text-lg md:text-xl font-semibold
                      ${color.bg} ${color.text}
                      border-2 border-white dark:border-gray-700 shadow-md
                    `}
                  >
                    {member.avatar ? (
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      getInitials(member.name)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                      {member.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {member.role === 'leader' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
                          bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium"
                        >
                          <FiAward className="w-4 h-4" /> Leader
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
                          bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                        >
                          <FiStar className="w-4 h-4" /> Member
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <div className="flex items-center gap-2 truncate">
                        <FiMail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      {member.department && (
                        <div className="text-gray-500 dark:text-gray-400">
                          {member.department}
                        </div>
                      )}
                    </div>
                  </div>

                  {isCurrentUserLeader && member.role !== 'leader' && (
                    <>
                      <button
                        onClick={() => setOpenActionsMenu(openActionsMenu === member.id ? null : member.id)}
                        className="
                          p-2 rounded-lg text-gray-500 hover:text-gray-700
                          dark:text-gray-400 dark:hover:text-gray-200
                          hover:bg-gray-100 dark:hover:bg-gray-700/50
                          transition-colors duration-200
                          focus:outline-none focus:ring-2 focus:ring-gray-500
                        "
                        aria-label="Member actions"
                      >
                        <FiMoreVertical className="w-5 h-5" />
                      </button>

                      <AnimatePresence>
                        {openActionsMenu === member.id && (
                          <motion.div
                            className="
                              absolute top-16 right-4 bg-white dark:bg-gray-800
                              rounded-xl shadow-lg border border-gray-100 dark:border-gray-700
                              overflow-hidden z-10 min-w-[160px]
                            "
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              onClick={() => {
                                onPromoteMember(member.id);
                                setOpenActionsMenu(null);
                              }}
                              className="
                                w-full px-4 py-2.5 text-left text-sm
                                text-amber-600 dark:text-amber-300
                                hover:bg-amber-50 dark:hover:bg-amber-900/30
                                transition-colors duration-200
                                flex items-center gap-2
                              "
                            >
                              <FiAward className="w-4 h-4" />
                              Promote to Leader
                            </button>
                            <button
                              onClick={() => {
                                setSelectedMember(member);
                                setShowDeleteDialog(true);
                                setOpenActionsMenu(null);
                              }}
                              className="
                                w-full px-4 py-2.5 text-left text-sm
                                text-red-600 dark:text-red-300
                                hover:bg-red-50 dark:hover:bg-red-900/30
                                transition-colors duration-200
                                flex items-center gap-2
                              "
                            >
                              <FiTrash2 className="w-4 h-4" />
                              Remove Member
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedMember(null);
        }}
        onConfirm={handleRemove}
        title="Remove Member"
        message={`Are you sure you want to remove ${selectedMember?.name} from the team? This action cannot be undone.`}
        confirmText="Remove"
        icon="🚫"
      />
    </div>
  );
};

export default MembersList;
