// Date utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isDeadlineOverdue = (deadline) => {
  return new Date(deadline) < new Date();
};

export const calculateTimeRemaining = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const difference = deadlineDate - now;

  if (difference < 0) return { isOverdue: true, timeString: 'Overdue' };

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return {
      isOverdue: false,
      timeString: `${days} day${days === 1 ? '' : 's'} remaining`,
    };
  }

  return {
    isOverdue: false,
    timeString: `${hours} hour${hours === 1 ? '' : 's'} remaining`,
  };
};

// Progress calculations
export const calculatePhaseProgress = (phase) => {
  if (!phase.chapters) return phase.progress;

  const chapterProgresses = Object.values(phase.chapters).map((chapter) => chapter.progress);
  const totalProgress = chapterProgresses.reduce((sum, progress) => sum + progress, 0);
  return Math.round(totalProgress / chapterProgresses.length);
};

export const calculateOverallProgress = (phases) => {
  const phaseProgresses = Object.values(phases).map((phase) => calculatePhaseProgress(phase));
  const totalProgress = phaseProgresses.reduce((sum, progress) => sum + progress, 0);
  return Math.round(totalProgress / phaseProgresses.length);
};

// Validation utilities
export const validateChapter = (content) => {
  const minWords = 1000;
  const words = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  return {
    wordCount: words.length,
    isValid: words.length >= minWords,
    message:
      words.length < minWords
        ? `Need ${minWords - words.length} more words to meet minimum requirement`
        : 'Chapter meets minimum word requirement',
  };
};

export const validateDefenseRequirements = (phase) => {
  const requirements = [
    {
      name: 'Chapters Complete',
      isMet: Object.values(phase.chapters).every((chapter) => chapter.status === 'completed'),
    },
    {
      name: 'Panel Members Confirmed',
      isMet: phase.defense.panelMembers.every((member) => member.status === 'confirmed'),
    },
    {
      name: 'Defense Date Scheduled',
      isMet: !!phase.defense.date,
    },
  ];

  return {
    requirements,
    allMet: requirements.every((req) => req.isMet),
  };
};

// File handling utilities
export const generateFileName = (phase, chapter, extension = 'pdf') => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${phase}_${chapter}_${timestamp}.${extension}`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Status utilities
export const getStatusColor = (status) => {
  const statusColors = {
    completed: 'var(--success-color)',
    'in-progress': 'var(--warning-color)',
    'not-started': 'var(--danger-color)',
    pending: 'var(--warning-color)',
    confirmed: 'var(--success-color)',
    rejected: 'var(--danger-color)',
  };

  return statusColors[status] || 'var(--text-secondary)';
};

export const getNextDeadline = (phases) => {
  const deadlines = Object.entries(phases)
    .map(([phase, data]) => ({
      phase,
      deadline: data.deadline,
    }))
    .filter((item) => item.deadline && new Date(item.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return deadlines[0] || null;
};

// Defense utilities
export const generateDefenseSchedule = (date, panelMembers) => {
  const schedule = [
    { time: '00:00', duration: 5, activity: 'Opening Remarks' },
    { time: '00:05', duration: 20, activity: 'Presentation' },
    { time: '00:25', duration: 30, activity: 'Panel Questions' },
    { time: '00:55', duration: 15, activity: 'Deliberation' },
    { time: '01:10', duration: 5, activity: 'Announcement' },
  ];

  return schedule.map((item) => ({
    ...item,
    startTime: new Date(date).setMinutes(
      new Date(date).getMinutes() +
        parseInt(item.time.split(':')[0]) * 60 +
        parseInt(item.time.split(':')[1])
    ),
  }));
};
