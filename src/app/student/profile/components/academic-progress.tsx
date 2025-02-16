"use client"

import React, { useMemo } from "react"
import { BookOpen } from "lucide-react"

const capstoneSubjects = [
  { id: 1, name: "Capstone Proposal", progress: 85, advisor: "Dr. Smith", hours: 3 },
  { id: 2, name: "Capstone One", progress: 72, advisor: "Prof. Johnson", hours: 5 },
  { id: 3, name: "Capstone Two", progress: 68, advisor: "Dr. Williams", hours: 6 },
]

const getGradeInfo = (progress: number) => {
  if (progress >= 90) return { grade: "A", color: "#22c55e", status: "Excellent" }
  if (progress >= 80) return { grade: "B", color: "#3b82f6", status: "Good" }
  if (progress >= 70) return { grade: "C", color: "#f59e0b", status: "Average" }
  if (progress >= 60) return { grade: "D", color: "#f97316", status: "Needs Improvement" }
  return { grade: "F", color: "#ef4444", status: "At Risk" }
}

interface SubjectCardProps {
  subject: {
    id: number
    name: string
    progress: number
    advisor: string
    hours: number
  }
}

const SubjectCard: React.FC<SubjectCardProps> = React.memo(({ subject }) => {
  const { grade, color, status } = useMemo(() => getGradeInfo(subject.progress), [subject.progress])

  return (
    <div className="flex items-center space-x-3 rounded-lg bg-gray-100 px-4 py-3 shadow dark:bg-gray-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow dark:bg-gray-800">
        <BookOpen className="h-5 w-5 text-blue-500" />
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{subject.name}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">{subject.advisor}</p>
      </div>
      <div className="text-right">
        <span className="text-lg font-bold" style={{ color }}>
          {grade}
        </span>
        <p className="text-xs" style={{ color }}>
          {subject.progress}%
        </p>
      </div>
    </div>
  )
})

SubjectCard.displayName = "SubjectCard"

export default function AcademicProgress() {
  const averageProgress = useMemo(() => {
    return (capstoneSubjects.reduce((sum, s) => sum + s.progress, 0) / capstoneSubjects.length).toFixed(1)
  }, [])

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white">
        Capstone Progress
        <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">{averageProgress}%</span>
      </h2>

      <div className="space-y-4">
        {capstoneSubjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  )
}

