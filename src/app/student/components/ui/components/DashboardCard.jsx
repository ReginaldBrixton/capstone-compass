'use client';

import React, { useState } from 'react';

export function DashboardCard({ title, icon, content, actionButton, stats }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id="dashboard-card"
      className={`dashboard-card bg-white rounded-xl p-4 md:p-6 shadow-md transition-all duration-300 relative overflow-hidden ${
        isHovered ? 'transform -translate-y-1 shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
    >
      <div id="card-header" className="dashboard-card-header flex items-center gap-4 mb-4">
        <span id="card-icon" className="dashboard-card-icon text-2xl md:text-3xl grid place-items-center w-10 h-10 rounded-full bg-gray-100">
          {icon}
        </span>
        <h3 id="card-title" className="dashboard-card-title text-lg md:text-xl font-semibold text-gray-900 m-0">
          {title}
        </h3>
      </div>

      <div id="card-content" className="dashboard-card-content text-base leading-relaxed text-gray-600 mb-4">
        {content}
      </div>

      {stats && (
        <div id="card-stats" className="dashboard-card-stats grid grid-cols-2 md:grid-cols-auto-fit gap-4 pt-4 border-t border-gray-200">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} id={`stat-item-${key}`} className="dashboard-card-stat flex flex-col items-center text-center">
              <span className="dashboard-card-stat-label text-sm text-gray-500 mb-1">
                {key}
              </span>
              <span className="dashboard-card-stat-value text-lg font-semibold text-gray-800">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {actionButton && (
        <button
          id="card-action-button"
          className="dashboard-card-button w-full py-3 px-4 mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300"
          onClick={actionButton.onClick}
          aria-label={actionButton.label}
        >
          {actionButton.label}
        </button>
      )}
    </div>
  );
}
