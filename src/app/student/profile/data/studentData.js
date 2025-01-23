export const studentData = {
  name: 'John Smith',
  id: 'STU123456',
  grade: '12th Grade',
  email: 'john.smith@school.edu',
  phone: '(555) 123-4567',
  image: '/placeholder-avatar.jpg',
  subjects: [
    { name: 'Mathematics', progress: 81 },
    { name: 'Science', progress: 78 },
    { name: 'English', progress: 92 },
    { name: 'History', progress: 88 },
  ],
  badges: [
    {
      id: 1,
      name: 'Perfect Attendance',
      icon: '🌟',
      description: 'Attended all classes without any absences',
    },
    { id: 2, name: 'Math Whiz', icon: '🔢', description: 'Achieved excellence in Mathematics' },
    { id: 3, name: 'Science Star', icon: '🔬', description: 'Outstanding performance in Science' },
    {
      id: 4,
      name: 'Bookworm',
      icon: '📚',
      description: 'Exceptional reading and comprehension skills',
    },
  ],
  recentActivity: [
    { id: 1, action: 'Submitted Math Assignment', time: '2 hours ago', type: 'assignment' },
    { id: 2, action: 'Completed Science Quiz', time: 'Yesterday', type: 'quiz' },
    { id: 3, action: 'Joined Study Group', time: '2 days ago', type: 'group' },
  ],
};
