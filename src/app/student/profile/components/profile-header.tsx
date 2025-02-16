"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Pencil, Mail, Phone, GraduationCap } from "lucide-react"

// Types & Interfaces
interface ProfileInfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
  type?: string
  onEdit: () => void
}

interface EditDialogProps {
  field: string
  value: string
  type?: string
  onSave: (value: string) => void
  onCancel: () => void
}

interface PhotoDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (imageData: string) => void
}

interface StudentData {
  id: string
  name: string
  grade: string
  email: string
  phone: string
  image: string | null
}

interface ProfileHeaderProps {
  studentData: StudentData
  onUpdateProfile: (data: StudentData) => void
}

interface EditFieldState {
  field: string
  value: string
  type?: string
}

// Utility Components
const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ icon, label, value, type = "text", onEdit }) => {
  return (
    <div className="group relative flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-all hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="absolute right-2 top-2 rounded-full p-2 text-gray-500 opacity-0 transition-opacity hover:bg-white hover:text-blue-600 group-hover:opacity-100 dark:hover:bg-gray-600"
        aria-label={`Edit ${label}`}
      >
        <Pencil className="h-4 w-4" />
      </button>
    </div>
  )
}

// Dialog Components
const EditDialog: React.FC<EditDialogProps> = ({ field, value, type = "text", onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState(value)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Edit {field}
        </h3>
        <input
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(inputValue)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

const PhotoDialog: React.FC<PhotoDialogProps> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Update Profile Photo
        </h3>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            className="w-full text-gray-500 dark:text-gray-400"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  if (typeof reader.result === "string") {
                    onSave(reader.result)
                  }
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Component
export default function ProfileHeader({ studentData, onUpdateProfile }: ProfileHeaderProps) {
  // State Management
  const [editField, setEditField] = useState<EditFieldState | null>(null)
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false)

  // Event Handlers
  const handleFieldClick = (field: string, value: string, type?: string) => {
    setEditField({ field, value, type })
  }

  const handleFieldUpdate = async (field: string, value: string) => {
    try {
      const key = field.toLowerCase().replace(/\s+/g, "") as keyof StudentData
      onUpdateProfile({ ...studentData, [key]: value })
      setEditField(null)
    } catch (error) {
      console.error(`Error updating ${field}:`, error)
    }
  }

  const handlePhotoUpdate = (imageData: string) => {
    onUpdateProfile({ ...studentData, image: imageData })
    setIsPhotoDialogOpen(false)
  }

  // Profile Photo Section
  const renderProfilePhoto = () => (
    <div className="group relative flex-shrink-0">
      <div
        className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-900"
        onClick={() => setIsPhotoDialogOpen(true)}
      >
        <Image
          src={studentData.image || `/api/placeholder/128/128`}
          alt={`${studentData.name}'s profile picture`}
          width={128}
          height={128}
          className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )

  // Profile Info Section
  const renderProfileInfo = () => (
    <div className="flex-1 space-y-4 text-center md:text-left">
      <div className="flex items-center justify-center gap-3 md:justify-start">
        <h2 className="cursor-pointer text-2xl font-bold hover:underline dark:text-white">
          <span onClick={() => handleFieldClick("Name", studentData.name, "text")}>
            {studentData.name}
          </span>
        </h2>
        <button
          onClick={() => handleFieldClick("Name", studentData.name, "text")}
          className="text-gray-500 transition-colors hover:text-blue-600"
          aria-label="Edit name"
        >
          <Pencil className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <ProfileInfoItem
          icon={<Pencil className="h-5 w-5 text-gray-500" />}
          label="Student ID"
          value={studentData.id}
          onEdit={() => handleFieldClick("Student ID", studentData.id, "text")}
        />
        <ProfileInfoItem
          icon={<GraduationCap className="h-5 w-5 text-gray-500" />}
          label="Grade"
          value={studentData.grade}
          onEdit={() => handleFieldClick("Grade", studentData.grade, "text")}
        />
        <ProfileInfoItem
          icon={<Mail className="h-5 w-5 text-gray-500" />}
          label="Email"
          value={studentData.email}
          type="email"
          onEdit={() => handleFieldClick("Email", studentData.email, "email")}
        />
        <ProfileInfoItem
          icon={<Phone className="h-5 w-5 text-gray-500" />}
          label="Phone"
          value={studentData.phone}
          type="tel"
          onEdit={() => handleFieldClick("Phone", studentData.phone, "tel")}
        />
      </div>
    </div>
  )

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-6 p-6 md:flex-row md:items-start">
        {renderProfilePhoto()}
        {renderProfileInfo()}
      </div>

      {editField && (
        <EditDialog
          field={editField.field}
          value={editField.value}
          type={editField.type}
          onSave={(value) => handleFieldUpdate(editField.field, value)}
          onCancel={() => setEditField(null)}
        />
      )}

      <PhotoDialog
        isOpen={isPhotoDialogOpen}
        onClose={() => setIsPhotoDialogOpen(false)}
        onSave={handlePhotoUpdate}
      />
    </div>
  )
}