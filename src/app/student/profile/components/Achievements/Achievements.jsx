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
      <div className="achievements-container rounded-xl bg-white p-6 text-center shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Achievements
        </h2>
        <p className="text-gray-500">No achievements unlocked yet!</p>
      </div>
    );
  }

  return (
    <div
      className="achievements-container rounded-xl bg-white p-6 shadow-md"
      id="achievements-section"
    >
      <h2 className="achievements-title mb-4 flex items-center justify-between text-lg font-semibold text-gray-900">
        Achievements
        <span className="achievements-count rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
          {badges.length}
        </span>
      </h2>

      <div className="achievements-stack mb-4 flex flex-col gap-3">
        {visibleBadges.map((badge, index) => (
          <div
            key={badge.id}
            className={`achievement-pill relative flex items-center space-x-3 rounded-full bg-gray-100 px-4 py-2 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg`}
            style={{
              marginTop: index > 0 ? '-0.75rem' : 0,
              zIndex: visibleBadges.length - index,
            }}
          >
            <span className="achievement-icon flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              {badge.icon}
            </span>
            <p className="achievement-name truncate text-sm font-medium text-gray-700">
              {badge.name}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleOpenModal}
        className="view-all-btn flex w-full items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        View All Achievements
        <span className="view-all-count rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
          {badges.length}
        </span>
      </button>

      {/* View All Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              ​
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      All Achievements
                    </h3>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {badges.map((badge) => (
                        <div key={badge.id} className="text-center">
                          <div className="mx-auto mb-2 h-12 w-12">
                            <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-xl shadow-inner">
                              {badge.icon}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-700">
                            {badge.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {badgeDescriptions[badge.name] || 'Unlocked!'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
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
