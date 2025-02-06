'use client';

import React from 'react';
import { activityIcons, getActivityType } from '../../data';
const ActivityIcon = ({ type }) => {
  return (
    <span
      id={`activity-icon-${type}`}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl transition-transform duration-300 hover:scale-110"
      data-oid="_cfbg.."
    >
      {activityIcons[type] || activityIcons.default}
    </span>
  );
};
const RecentActivity = ({ activities }) => {
  return (
    <div
      id="recent-activity-container"
      className="rounded-xl bg-white p-6 shadow-md md:p-8"
      data-oid="a0_5oam"
    >
      <h2
        id="recent-activity-title"
        className="relative mb-6 pb-2 text-xl font-semibold text-gray-800 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:rounded after:bg-blue-500 after:content-[''] md:text-2xl"
        data-oid="1-6oay4"
      >
        Recent Activity
      </h2>

      <div id="activity-list" className="flex flex-col gap-4" data-oid="-f91rqu">
        {activities.map((activity) => (
          <div
            key={activity.id}
            id={`activity-card-${activity.id}`}
            className="group relative flex items-center gap-4 overflow-hidden rounded-lg bg-gray-50 p-4 transition-all duration-300 hover:translate-x-1 hover:bg-gray-100"
            data-oid="aa02r5i"
          >
            <ActivityIcon
              type={activity.type || getActivityType(activity.action)}
              data-oid="j8p7z3w"
            />

            <div className="flex-grow" data-oid="rhki7ne">
              <p className="text-sm font-medium text-gray-800 md:text-base" data-oid="n5suaxo">
                {activity.action}
              </p>
              <span className="text-sm text-gray-500" data-oid="vty3su8">
                {activity.time}
              </span>
            </div>

            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-gradient-to-l from-gray-100 via-gray-100 to-transparent px-4 transition-transform duration-300 group-hover:translate-x-0"
              data-oid="l8eh.85"
            >
              <button
                id={`view-details-${activity.id}`}
                className="rounded-full bg-blue-500 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-blue-600"
                data-oid="8s7ioh3"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        id="view-all-activities-btn"
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-500 px-4 py-3 font-medium text-blue-500 transition-all duration-200 hover:bg-blue-500 hover:text-white"
        data-oid="mrp.n:p"
      >
        View All Activities
        <span
          className="transform transition-transform duration-200 group-hover:translate-x-1"
          data-oid="vo1tktp"
        >
          →
        </span>
      </button>
    </div>
  );
};
export default RecentActivity;
