'use client';

import React, { useState } from 'react';
export function DashboardCard({ title, icon, content, actionButton, stats }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      id="dashboard-card"
      className={`dashboard-card relative overflow-hidden rounded-xl bg-white p-4 shadow-md transition-all duration-300 md:p-6 ${isHovered ? '-translate-y-1 transform shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      data-oid=".u-1rnk"
    >
      <div
        id="card-header"
        className="dashboard-card-header mb-4 flex items-center gap-4"
        data-oid="882g_e8"
      >
        <span
          id="card-icon"
          className="dashboard-card-icon grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-2xl md:text-3xl"
          data-oid="rzknk9q"
        >
          {icon}
        </span>
        <h3
          id="card-title"
          className="dashboard-card-title m-0 text-lg font-semibold text-gray-900 md:text-xl"
          data-oid="uyvwjr."
        >
          {title}
        </h3>
      </div>

      <div
        id="card-content"
        className="dashboard-card-content mb-4 text-base leading-relaxed text-gray-600"
        data-oid="45gqrij"
      >
        {content}
      </div>

      {stats && (
        <div
          id="card-stats"
          className="dashboard-card-stats md:grid-cols-auto-fit grid grid-cols-2 gap-4 border-t border-gray-200 pt-4"
          data-oid="68yq_-h"
        >
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              id={`stat-item-${key}`}
              className="dashboard-card-stat flex flex-col items-center text-center"
              data-oid="4ap9y61"
            >
              <span
                className="dashboard-card-stat-label mb-1 text-sm text-gray-500"
                data-oid="gtrth9:"
              >
                {key}
              </span>
              <span
                className="dashboard-card-stat-value text-lg font-semibold text-gray-800"
                data-oid="1kg9iaj"
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {actionButton && (
        <button
          id="card-action-button"
          className="dashboard-card-button mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700"
          onClick={actionButton.onClick}
          aria-label={actionButton.label}
          data-oid="cezf1:f"
        >
          {actionButton.label}
        </button>
      )}
    </div>
  );
}
