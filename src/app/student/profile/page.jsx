"use client"

import { useState } from "react"
import { Trophy, Star, Zap, BookOpen, Award, Medal, Target } from "lucide-react"
import ProfileHeader from "./components/profile-header"
import Achievements from "./components/achievements"
import RecentActivity from "./components/recent-activity"
import AcademicProgress from "./components/academic-progress"
import SkillsInterests from "./components/skills-interests"

const initialStudentData = {
  id: "STU2024001",
  name: "Alex Johnson",
  grade: "Graduate Student",
  email: "alex.j@school.edu",
  phone: "+1 (555) 123-4567",
  image: null,
}

const initialBadges = [
  { id: 1, name: "Honor Roll", icon: <Star className="h-5 w-5 text-yellow-500" /> },
  { id: 2, name: "Perfect Attendance", icon: <Trophy className="h-5 w-5 text-blue-500" /> },
  { id: 3, name: "Research Excellence", icon: <Zap className="h-5 w-5 text-purple-500" /> },
  { id: 4, name: "Academic Writing", icon: <BookOpen className="h-5 w-5 text-green-500" /> },
  { id: 5, name: "Leadership Award", icon: <Award className="h-5 w-5 text-red-500" /> },
  { id: 6, name: "Presentation Skills", icon: <Medal className="h-5 w-5 text-orange-500" /> },
  { id: 7, name: "Capstone Excellence", icon: <Target className="h-5 w-5 text-indigo-500" /> },
]

const initialActivities = [
  {
    id: 1,
    type: "assignment",
    action: "Submitted Capstone Proposal Draft",
    time: "2 days ago",
  },
  {
    id: 2,
    type: "achievement",
    action: "Completed Capstone One Milestone",
    time: "1 week ago",
  },
  {
    id: 3,
    type: "exam",
    action: "Passed Capstone One Defense",
    time: "2 weeks ago",
  },
  {
    id: 4,
    type: "assignment",
    action: "Started Capstone Two Research",
    time: "1 month ago",
  },
]

const initialSkills = [
  { id: "1", name: "Research Methods" },
  { id: "2", name: "Data Analysis" },
  { id: "3", name: "Academic Writing" },
  { id: "4", name: "Project Management" },
]

const initialInterests = [
  { id: "1", name: "Machine Learning" },
  { id: "2", name: "Sustainable Energy" },
  { id: "3", name: "Bioengineering" },
]

export default function ProfileSettings() {
  const [studentData, setStudentData] = useState(initialStudentData)
  const [badges] = useState(initialBadges)
  const [activities] = useState(initialActivities)
  const [skills, setSkills] = useState(initialSkills)
  const [interests, setInterests] = useState(initialInterests)

  const handleAddSkill = (skill) => {
    setSkills([...skills, { id: Date.now().toString(), name: skill }])
  }

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const handleAddInterest = (interest) => {
    setInterests([...interests, { id: Date.now().toString(), name: interest }])
  }

  const handleRemoveInterest = (id) => {
    setInterests(interests.filter((interest) => interest.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-6 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile information and view your academic progress
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader studentData={studentData} onUpdateProfile={setStudentData} />
            <SkillsInterests
              skills={skills}
              interests={interests}
              onAddSkill={handleAddSkill}
              onRemoveSkill={handleRemoveSkill}
              onAddInterest={handleAddInterest}
              onRemoveInterest={handleRemoveInterest}
            />
            <RecentActivity activities={activities} />
          </div>

          <div className="space-y-6">
            <AcademicProgress />
            <Achievements badges={badges} />
          </div>
        </div>
      </div>
    </div>
  )
}
