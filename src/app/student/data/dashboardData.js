'use client';

export const stats = [
  { title: 'Total Projects', value: '12', change: 8.2 },
  { title: 'Active Tasks', value: '48', change: -2.4 },
  { title: 'Team Members', value: '24', change: 12.5 },
  { title: 'Completion Rate', value: '92%', change: 5.1 },
];

export const projects = [
  {
    title: 'Website Redesign',
    status: 'in-progress',
    progress: 75,
    dueDate: 'Dec 28',
    team: [
      {
        name: 'Alex Smith',
        avatar: '/avatars/alex.jpg',
        role: 'Lead Designer',
      },
      {
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.jpg',
        role: 'Developer',
      },
      { name: 'Mike Brown', avatar: '/avatars/mike.jpg', role: 'UI Designer' },
    ],
    description: 'Redesigning the main website with modern UI/UX principles',
    priority: 'high',
  },
  {
    title: 'Mobile App Development',
    status: 'completed',
    progress: 100,
    dueDate: 'Dec 24',
    team: [
      {
        name: 'Emma Wilson',
        avatar: '/avatars/emma.jpg',
        role: 'Project Manager',
      },
      {
        name: 'James Lee',
        avatar: '/avatars/james.jpg',
        role: 'Mobile Developer',
      },
    ],
    description: 'Creating a new mobile app for iOS and Android platforms',
    priority: 'medium',
  },
  {
    title: 'Database Migration',
    status: 'delayed',
    progress: 35,
    dueDate: 'Dec 30',
    team: [
      {
        name: 'David Chen',
        avatar: '/avatars/david.jpg',
        role: 'Database Engineer',
      },
      {
        name: 'Lisa Wang',
        avatar: '/avatars/lisa.jpg',
        role: 'Backend Developer',
      },
    ],
    description: 'Migrating from MySQL to PostgreSQL database',
    priority: 'high',
  },
];

export const tasks = [
  {
    title: 'Review Project Proposals',
    dueDate: 'Today',
    priority: 'High',
    status: 'pending',
  },
  {
    title: 'Team Meeting - Sprint Planning',
    dueDate: 'Tomorrow',
    priority: 'Medium',
    status: 'scheduled',
  },
  {
    title: 'Update Documentation',
    dueDate: 'Dec 27',
    priority: 'Low',
    status: 'in-progress',
  },
  {
    title: 'Client Presentation',
    dueDate: 'Dec 28',
    priority: 'High',
    status: 'pending',
  },
  {
    title: 'Code Review',
    dueDate: 'Dec 29',
    priority: 'Medium',
    status: 'in-progress',
  },
];

export const notifications = [
  {
    type: 'mention',
    message: '@Alex mentioned you in Website Redesign project',
    time: '5m ago',
  },
  {
    type: 'update',
    message: 'New version of Mobile App deployed',
    time: '30m ago',
  },
  {
    type: 'alert',
    message: 'Database backup completed successfully',
    time: '1h ago',
  },
  {
    type: 'reminder',
    message: 'Team meeting starts in 15 minutes',
    time: '2h ago',
  },
  {
    type: 'update',
    message: 'Project deadline updated: Website Redesign',
    time: '3h ago',
  },
];
