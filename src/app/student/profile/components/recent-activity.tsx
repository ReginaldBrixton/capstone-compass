"use client"

import { useState } from "react"
import { BookOpen, Award, Clock, PenTool, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"

const activityIcons = {
  assignment: <PenTool className="h-5 w-5 text-blue-500" />,
  exam: <BookOpen className="h-5 w-5 text-purple-500" />,
  achievement: <Award className="h-5 w-5 text-yellow-500" />,
  attendance: <CheckCircle className="h-5 w-5 text-green-500" />,
  default: <Clock className="h-5 w-5 text-gray-500" />,
}

const ActivityIcon = ({ type }) => {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-transform duration-300 hover:scale-110 dark:bg-gray-700">
      {activityIcons[type] || activityIcons.default}
    </span>
  )
}

export default function RecentActivity({ activities }) {
  const [showAll, setShowAll] = useState(false)
  const displayedActivities = showAll ? activities : activities.slice(0, 4)

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 md:p-8">
      <h2 className="relative mb-6 pb-2 text-xl font-semibold text-gray-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:rounded after:bg-blue-500 after:content-[''] dark:text-white md:text-2xl">
        Recent Activity
      </h2>

      <div className="flex flex-col gap-4">
        {displayedActivities.map((activity) => (
          <div
            key={activity.id}
            className="group relative flex items-center gap-4 overflow-hidden rounded-lg bg-gray-50 p-4 transition-all duration-300 hover:translate-x-1 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700"
          >
            <ActivityIcon type={activity.type} />

            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900 dark:text-white md:text-base">{activity.action}</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-gradient-to-l from-gray-100 via-gray-100 to-transparent px-4 transition-transform duration-300 group-hover:translate-x-0 dark:from-gray-700 dark:via-gray-700">
              <button className="rounded-full bg-blue-500 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {activities.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-500 px-4 py-3 font-medium text-blue-500 transition-all duration-200 hover:bg-blue-500 hover:text-white"
        >
          {showAll ? (
            <>
              Show Less
              <ChevronUp className="transition-transform duration-200 group-hover:translate-y-1" />
            </>
          ) : (
            <>
              View All Activities
              <ChevronDown className="transition-transform duration-200 group-hover:-translate-y-1" />
            </>
          )}
        </button>
      )}
    </div>
  )
}

