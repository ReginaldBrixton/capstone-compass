/**
 * Grade scale definitions with corresponding minimum percentage scores
 */
export const gradeScales = {
  A: 90,
  B: 80,
  C: 70,
  D: 60,
  F: 0, // Added F grade for completeness
};

/**
 * Color mappings for different grade levels using CSS variables
 */
export const gradeColors = {
  A: 'var(--success)',
  B: 'var(--primary-color)',
  C: 'var(--warning)',
  D: 'var(--danger)',
  F: 'var(--danger)', // Added F grade color
};

/**
 * Constants used for academic UI components
 */
export const academicConstants = {
  minSubjectWidth: 250,
  progressBarHeight: 8,
  tooltipWidth: {
    desktop: 200,
    mobile: 180,
  },
  animationDuration: 300, // Added animation duration
  gradeChangeThreshold: 5, // Added threshold for grade warnings
};

/**
 * Gets grade information based on progress percentage
 * @param {number} progress - Progress percentage (0-100)
 * @returns {Object} Grade and color information
 */
export const getGradeInfo = (progress) => {
  if (!Number.isFinite(progress) || progress < 0) {
    throw new Error('Invalid progress value');
  }

  if (progress >= gradeScales.A) return { grade: 'A', color: gradeColors.A };
  if (progress >= gradeScales.B) return { grade: 'B', color: gradeColors.B };
  if (progress >= gradeScales.C) return { grade: 'C', color: gradeColors.C };
  if (progress >= gradeScales.D) return { grade: 'D', color: gradeColors.D };
  return { grade: 'F', color: gradeColors.F };
};

/**
 * Gets academic status based on progress
 * @param {number} progress - Progress percentage (0-100)
 * @returns {string} Status description
 */
export const getStatus = (progress) => {
  if (!Number.isFinite(progress) || progress < 0) {
    throw new Error('Invalid progress value');
  }

  if (progress >= gradeScales.A) return 'Excellent';
  if (progress >= gradeScales.B) return 'Good Standing';
  if (progress >= gradeScales.C) return 'Passing';
  if (progress >= gradeScales.D) return 'Academic Warning';
  return 'Academic Probation';
};
