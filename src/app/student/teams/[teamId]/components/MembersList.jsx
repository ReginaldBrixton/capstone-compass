import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAward, FiMail, FiMoreVertical, FiStar, FiTrash2 } from 'react-icons/fi';
import ConfirmDialog from './ConfirmDialog';
const getRandomColor = (name) => {
  const colors = [
    {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-700 dark:text-purple-300',
    },
    {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
    },
    {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
    },
    {
      bg: 'bg-rose-100 dark:bg-rose-900/30',
      text: 'text-rose-700 dark:text-rose-300',
    },
    {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-700 dark:text-amber-300',
    },
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
    <div className="space-y-6" data-oid="_usn8t:">
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        data-oid="cp6o-m4"
      >
        <AnimatePresence mode="popLayout" data-oid="7_hb.9m">
          {members.map((member) => {
            const color = getRandomColor(member.name);
            return (
              <motion.div
                key={member.id}
                className={`group relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 md:p-6`}
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
                data-oid="49u12zm"
              >
                <div className="flex items-start gap-4" data-oid="14imr2v">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold md:h-14 md:w-14 md:text-xl ${color.bg} ${color.text} border-2 border-white shadow-md dark:border-gray-700`}
                    data-oid="09dfl3h"
                  >
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-full w-full rounded-full object-cover"
                        data-oid="2aik0e6"
                      />
                    ) : (
                      getInitials(member.name)
                    )}
                  </div>

                  <div className="min-w-0 flex-1" data-oid="j_93pq6">
                    <h3
                      className="mb-1 truncate text-lg font-semibold text-gray-900 dark:text-white"
                      data-oid="xw0xl7n"
                    >
                      {member.name}
                    </h3>
                    <div className="mb-2 flex flex-wrap items-center gap-2" data-oid="_t8w6_n">
                      {member.role === 'leader' ? (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                          data-oid="tu_js:p"
                        >
                          <FiAward className="h-4 w-4" data-oid="auibnaq" /> Leader
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          data-oid="ao50jt7"
                        >
                          <FiStar className="h-4 w-4" data-oid="3f3br-i" /> Member
                        </span>
                      )}
                    </div>
                    <div
                      className="space-y-1 text-sm text-gray-500 dark:text-gray-400"
                      data-oid="u6fv.yx"
                    >
                      <div className="flex items-center gap-2 truncate" data-oid="58jermp">
                        <FiMail className="h-4 w-4 flex-shrink-0" data-oid="8m:b2r7" />
                        <span className="truncate" data-oid="6hvx6u_">
                          {member.email}
                        </span>
                      </div>
                      {member.department && (
                        <div className="text-gray-500 dark:text-gray-400" data-oid="lmzxnd_">
                          {member.department}
                        </div>
                      )}
                    </div>
                  </div>

                  {isCurrentUserLeader && member.role !== 'leader' && (
                    <>
                      <button
                        onClick={() =>
                          setOpenActionsMenu(openActionsMenu === member.id ? null : member.id)
                        }
                        className="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200"
                        aria-label="Member actions"
                        data-oid="zjz4m:y"
                      >
                        <FiMoreVertical className="h-5 w-5" data-oid="dl7_wdg" />
                      </button>

                      <AnimatePresence data-oid="gf.p1-r">
                        {openActionsMenu === member.id && (
                          <motion.div
                            className="absolute right-4 top-16 z-10 min-w-[160px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                            initial={{
                              opacity: 0,
                              scale: 0.95,
                              y: -10,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.95,
                              y: -10,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            data-oid=":vlfibc"
                          >
                            <button
                              onClick={() => {
                                onPromoteMember(member.id);
                                setOpenActionsMenu(null);
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-amber-600 transition-colors duration-200 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-900/30"
                              data-oid="f4lp25."
                            >
                              <FiAward className="h-4 w-4" data-oid="3io9mrs" />
                              Promote to Leader
                            </button>
                            <button
                              onClick={() => {
                                setSelectedMember(member);
                                setShowDeleteDialog(true);
                                setOpenActionsMenu(null);
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/30"
                              data-oid="o_lz-l:"
                            >
                              <FiTrash2 className="h-4 w-4" data-oid="w2zup.z" />
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
        data-oid="kocqn:."
      />
    </div>
  );
};
export default MembersList;
