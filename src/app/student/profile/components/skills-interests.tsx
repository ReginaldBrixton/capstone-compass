"use client"

import { useState } from "react"
import { PlusCircle, X } from "lucide-react"

interface Skill {
  id: string
  name: string
}

interface SkillsInterestsProps {
  skills: Skill[]
  interests: Skill[]
  onAddSkill: (skill: string) => void
  onRemoveSkill: (id: string) => void
  onAddInterest: (interest: string) => void
  onRemoveInterest: (id: string) => void
}

const SkillInterestTag = ({ item, onRemove }) => (
  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
    {item.name}
    <button
      onClick={() => onRemove(item.id)}
      className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100"
    >
      <X className="h-4 w-4" />
    </button>
  </span>
)

const AddItemForm = ({ onAdd, placeholder }) => {
  const [newItem, setNewItem] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newItem.trim()) {
      onAdd(newItem.trim())
      setNewItem("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center">
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder={placeholder}
        className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="inline-flex items-center rounded-r-md border border-l-0 border-blue-600 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add
      </button>
    </form>
  )
}

export default function SkillsInterests({
  skills,
  interests,
  onAddSkill,
  onRemoveSkill,
  onAddInterest,
  onRemoveInterest,
}: SkillsInterestsProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Skills & Interests</h2>
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <SkillInterestTag key={skill.id} item={skill} onRemove={onRemoveSkill} />
            ))}
          </div>
          <AddItemForm onAdd={onAddSkill} placeholder="Add a new skill" />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <SkillInterestTag key={interest.id} item={interest} onRemove={onRemoveInterest} />
            ))}
          </div>
          <AddItemForm onAdd={onAddInterest} placeholder="Add a new interest" />
        </div>
      </div>
    </div>
  )
}

