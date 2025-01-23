/**
 * Constants and utilities for handling student activity data
 */

// Map of activity types to their corresponding icons
export const activityIcons = {
  assignment: '📝', // Homework, projects, written work
  quiz: '✍️', // Tests, quizzes, assessments
  group: '👥', // Group work, collaboration
  discussion: '💭', // Discussion posts, forums
  resource: '📚', // Learning materials, readings
  default: '📌', // Fallback for unknown types
};

// Configuration constants for activity display
export const activityConstants = {
  iconSize: {
    desktop: 40,
    mobile: 32,
    tablet: 36,
  },
  maxActivities: 5,
  hoverTransitionDuration: 300, // in milliseconds
  loadMoreIncrement: 5,
  initialLoadCount: 3,
};

/**
 * Determines the activity type from an action string
 * @param {string} action - The activity action to analyze
 * @returns {string} The matched activity type or 'default'
 */
export const getActivityType = (action) => {
  if (!action) return 'default';

  const lowerAction = action.toLowerCase().trim();
  const activityMatches = {
    assignment: ['assignment', 'homework', 'project', 'task'],
    quiz: ['quiz', 'test', 'exam', 'assessment'],
    group: ['group', 'team', 'collaborative'],
    discussion: ['discussion', 'forum', 'post'],
    resource: ['resource', 'material', 'reading'],
  };

  for (const [type, keywords] of Object.entries(activityMatches)) {
    if (keywords.some((keyword) => lowerAction.includes(keyword))) {
      return type;
    }
  }

  return 'default';
};
