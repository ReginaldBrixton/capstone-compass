'use client';

import React from 'react';
import { activityIcons, getActivityType } from '../../data';

const ActivityIcon = ({ type }) => {
  return (
    <span 
      id={`activity-icon-${type}`}
      className="flex items-center justify-center w-10 h-10 text-2xl bg-gray-100 rounded-full transition-transform duration-300 hover:scale-110"
    >
      {activityIcons[type] || activityIcons.default}
    </span>
  );
};

const RecentActivity = ({ activities }) => {
  return (
    <div 
      id="recent-activity-container"
      className="bg-white rounded-xl p-6 md:p-8 shadow-md"
    >                    
      <h2 
        id="recent-activity-title" 
        className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500 after:rounded"
      >
        Recent Activity
      </h2>

      <div 
        id="activity-list"
        className="flex flex-col gap-4"
      >
        {activities.map((activity) => (
          <div
            key={activity.id}
            id={`activity-card-${activity.id}`}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg relative overflow-hidden transition-all duration-300 hover:translate-x-1 hover:bg-gray-100 group"
          >
            <ActivityIcon type={activity.type || getActivityType(activity.action)} />
            
            <div className="flex-grow">
              <p className="text-gray-800 font-medium text-sm md:text-base">{activity.action}</p>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full group-hover:translate-x-0 transition-transform duration-300 px-4 bg-gradient-to-l from-gray-100 via-gray-100 to-transparent">
              <button 
                id={`view-details-${activity.id}`}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        id="view-all-activities-btn"
        className="w-full mt-6 py-3 px-4 border-2 border-blue-500 text-blue-500 font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:bg-blue-500 hover:text-white group"
      >
        View All Activities
        <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
};

export default RecentActivity;
