// Sample supervisor data structure for development and testing
export const supervisorData = {
  supervisors: [
    {
      id: 'sup001',
      name: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      title: 'Associate Professor',
      email: 'sarah.johnson@university.edu',
      expertise: ['Software Engineering', 'AI', 'Data Science'],
      assignedStudents: [
        {
          studentId: 'std001',
          name: 'John Smith',
          projectTitle: 'AI-Driven Healthcare Solutions',
          stage: 'proposal',
          lastInteraction: '2024-01-15',
        },
        {
          studentId: 'std002',
          name: 'Emma Davis',
          projectTitle: 'Blockchain in Supply Chain',
          stage: 'implementation',
          lastInteraction: '2024-01-14',
        },
      ],
      pendingReviews: [
        {
          reviewId: 'rev001',
          studentId: 'std001',
          submissionType: 'proposal',
          submissionDate: '2024-01-10',
          dueDate: '2024-01-20',
          status: 'pending',
          priority: 'high',
        },
        {
          reviewId: 'rev002',
          studentId: 'std002',
          submissionType: 'progress_report',
          submissionDate: '2024-01-12',
          dueDate: '2024-01-22',
          status: 'in_progress',
          priority: 'medium',
        },
      ],
      messageContacts: [
        {
          contactId: 'std001',
          name: 'John Smith',
          unreadCount: 2,
          lastMessage: {
            timestamp: '2024-01-15T14:30:00',
            preview: 'Regarding the feedback on methodology section...',
          },
        },
        {
          contactId: 'std002',
          name: 'Emma Davis',
          unreadCount: 0,
          lastMessage: {
            timestamp: '2024-01-14T16:45:00',
            preview: 'Thank you for the project guidance...',
          },
        },
      ],
    },
    {
      id: 'sup002',
      name: 'Prof. Michael Chen',
      department: 'Information Systems',
      title: 'Professor',
      email: 'michael.chen@university.edu',
      expertise: [
        'Information Security',
        'Database Systems',
        'Cloud Computing',
      ],
      assignedStudents: [
        {
          studentId: 'std003',
          name: 'Alice Brown',
          projectTitle: 'Cloud Security Framework',
          stage: 'implementation',
          lastInteraction: '2024-01-13',
        },
        {
          studentId: 'std004',
          name: 'David Wilson',
          projectTitle: 'IoT Data Management',
          stage: 'planning',
          lastInteraction: '2024-01-15',
        },
      ],
      pendingReviews: [
        {
          reviewId: 'rev003',
          studentId: 'std003',
          submissionType: 'implementation_milestone',
          submissionDate: '2024-01-11',
          dueDate: '2024-01-21',
          status: 'pending',
          priority: 'high',
        },
      ],
      messageContacts: [
        {
          contactId: 'std003',
          name: 'Alice Brown',
          unreadCount: 1,
          lastMessage: {
            timestamp: '2024-01-13T11:20:00',
            preview: 'Updated security implementation details...',
          },
        },
        {
          contactId: 'std004',
          name: 'David Wilson',
          unreadCount: 3,
          lastMessage: {
            timestamp: '2024-01-15T09:15:00',
            preview: 'Questions about data collection methods...',
          },
        },
      ],
    },
  ],
};

// Helper function to get supervisor by ID
export const getSupervisorById = (supervisorId) => {
  return supervisorData.supervisors.find(
    (supervisor) => supervisor.id === supervisorId
  );
};

// Helper function to get supervisor's assigned students
export const getSupervisorStudents = (supervisorId) => {
  const supervisor = getSupervisorById(supervisorId);
  return supervisor ? supervisor.assignedStudents : [];
};

// Helper function to get supervisor's pending reviews
export const getSupervisorPendingReviews = (supervisorId) => {
  const supervisor = getSupervisorById(supervisorId);
  return supervisor ? supervisor.pendingReviews : [];
};

// Helper function to get supervisor's message contacts
export const getSupervisorMessageContacts = (supervisorId) => {
  const supervisor = getSupervisorById(supervisorId);
  return supervisor ? supervisor.messageContacts : [];
};
