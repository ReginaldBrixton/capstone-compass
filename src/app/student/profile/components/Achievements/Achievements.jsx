'use client';

import React, { useState } from 'react';
import { achievementsConstants, badgeDescriptions } from '../../data'; // Ensure this path is correct

const Achievements = ({ badges }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const visibleBadges = badges.slice(0, 4); // Show a limited number of badges initially

  if (!badges || badges.length === 0) {
    return (
      <div className="achievements-container bg-white rounded-xl p-6 shadow-md text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Achievements</h2>
        <p className="text-gray-500">No achievements unlocked yet!</p>
      </div>
    );
  }

  return (
    <div className="achievements-container bg-white rounded-xl p-6 shadow-md" id="achievements-section">
      <h2 className="achievements-title flex items-center justify-between text-lg font-semibold text-gray-900 mb-4">
        Achievements
        <span className="achievements-count bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {badges.length}
        </span>
      </h2>

      <div className="achievements-stack flex flex-col gap-3 mb-4">
        {visibleBadges.map((badge, index) => (
          <div
            key={badge.id}
            className={`achievement-pill relative flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2 shadow transition-transform duration-200 hover:shadow-lg hover:scale-105`}
            style={{ marginTop: index > 0 ? '-0.75rem' : 0, zIndex: visibleBadges.length - index }}
          >
            <span className="achievement-icon flex items-center justify-center w-8 h-8 rounded-full bg-white shadow">
              {badge.icon}
            </span>
            <p className="achievement-name text-sm font-medium text-gray-700 truncate">{badge.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleOpenModal}
        className="view-all-btn w-full py-2 px-4 flex items-center justify-center gap-2 text-blue-600 bg-gray-100 rounded-full font-medium transition-colors duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        View All Achievements
        <span className="view-all-count bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
          {badges.length}
        </span>
      </button>

      {/* View All Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      All Achievements
                    </h3>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {badges.map((badge) => (
                        <div key={badge.id} className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2">
                            <span className="flex items-center justify-center w-full h-full text-xl rounded-full bg-gray-100 shadow-inner">
                              {badge.icon}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-700">{badge.name}</p>
                          <p className="text-xs text-gray-500">{badgeDescriptions[badge.name] || 'Unlocked!'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;