"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

// Types
interface Badge {
  id: number
  name: string 
  icon: React.ReactNode
}

interface AchievementsProps {
  badges: Badge[]
}

// Components
const EmptyState = () => (
  <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-gray-800">
    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
      Achievements
    </h2>
    <p className="text-gray-500 dark:text-gray-400">
      No achievements unlocked yet!
    </p>
  </div>
)

const BadgeItem = ({ badge, index, totalBadges }: { 
  badge: Badge
  index: number
  totalBadges: number 
}) => (
  <div
    className="relative flex items-center space-x-3 rounded-full bg-gray-100 px-4 py-2 shadow dark:bg-gray-700"
    style={{
      marginTop: index > 0 ? "-0.75rem" : 0,
      zIndex: totalBadges - index,
    }}
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow dark:bg-gray-800">
      {badge.icon}
    </span>
    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
      {badge.name}
    </p>
  </div>
)

const ViewMoreButton = ({ 
  showAll, 
  setShowAll, 
  totalBadges 
}: {
  showAll: boolean
  setShowAll: (show: boolean) => void
  totalBadges: number
}) => (
  <button
    onClick={() => setShowAll(!showAll)}
    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
  >
    {showAll ? (
      <>
        Show Less
        <ChevronUp className="transition-transform duration-200 group-hover:translate-y-1" />
      </>
    ) : (
      <>
        View All Achievements
        <ChevronDown className="transition-transform duration-200 group-hover:-translate-y-1" />
      </>
    )}
    <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
      {totalBadges}
    </span>
  </button>
)

// Main Component
export default function Achievements({ badges }: AchievementsProps) {
  const [showAll, setShowAll] = useState(false)
  const visibleBadges = showAll ? badges : badges.slice(0, 4)

  if (!badges?.length) {
    return <EmptyState />
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-4 flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white">
          Achievements
          <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
            {badges.length}
          </span>
        </h2>
      </div>

      {/* Badges List */}
      <div className="mb-4 flex flex-col gap-3">
        {visibleBadges.map((badge, index) => (
          <BadgeItem 
            key={badge.id}
            badge={badge}
            index={index}
            totalBadges={visibleBadges.length}
          />
        ))}
      </div>

      {/* View More Button */}
      {badges.length > 4 && (
        <ViewMoreButton showAll={showAll} setShowAll={setShowAll} totalBadges={badges.length} />
      )}
    </div>
  )
}