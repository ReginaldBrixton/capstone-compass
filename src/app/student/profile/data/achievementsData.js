/**
 * Descriptions for each achievement badge that can be earned
 * @type {Object.<string, string>}
 */
export const badgeDescriptions = {
  'Perfect Attendance':
    'Attended all classes without any absences for the semester',
  'Math Whiz':
    'Achieved an A grade and demonstrated exceptional problem-solving skills in Mathematics',
  'Science Star':
    'Outstanding performance and active participation in Science experiments and projects',
  Bookworm:
    'Exceptional reading comprehension and completed advanced literature assignments',
  Leadership:
    'Demonstrated strong leadership skills in group projects and activities',
  'Tech Savvy': 'Excelled in computer science and digital technology courses',
  'Creative Mind': 'Showed exceptional creativity in arts and creative writing',
  'Team Player': 'Actively contributed to group work and supported peers',
};

/**
 * Constants used for achievement UI components
 */
export const achievementsConstants = {
  tooltipDelay: 300, // Increased for better UX
  tooltipDuration: 200, // Added animation duration
  badgeSize: {
    desktop: 64,
    mobile: 48,
  },
  gridMinWidth: {
    desktop: 120,
    tablet: 120,
    mobile: 100,
  },
  badgeSpacing: 16, // Added consistent spacing
  animationDuration: 300, // Added for badge hover/click effects
  maxBadgesPerRow: {
    desktop: 4,
    tablet: 3,
    mobile: 2,
  },
};
