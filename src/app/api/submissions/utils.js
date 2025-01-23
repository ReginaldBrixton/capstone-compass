import { sanitizeHtml } from '../../../utils/sanitize';

// Submission status constants
export const SUBMISSION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  REVIEWED: 'reviewed',
  NEEDS_REVISION: 'needs_revision',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Validation rules
const MAX_FEEDBACK_LENGTH = 5000;
const MIN_SCORE = 0;
const MAX_SCORE = 100;

/**
 * Validates if the given status is a valid submission status
 */
export function validateSubmissionStatus(status) {
  if (!status || typeof status !== 'string') {
    throw new Error('Status must be a non-empty string');
  }

  const validStatuses = Object.values(SUBMISSION_STATUS);
  if (!validStatuses.includes(status)) {
    throw new Error(
      `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    );
  }

  return true;
}

/**
 * Formats and sanitizes feedback content
 */
export function formatFeedback(feedback) {
  if (!feedback || typeof feedback !== 'string') {
    throw new Error('Feedback must be a non-empty string');
  }

  if (feedback.length > MAX_FEEDBACK_LENGTH) {
    throw new Error(
      `Feedback length must not exceed ${MAX_FEEDBACK_LENGTH} characters`
    );
  }

  // Sanitize HTML content to prevent XSS
  const sanitizedFeedback = sanitizeHtml(feedback);

  return {
    content: sanitizedFeedback,
    timestamp: new Date().toISOString(),
    formattedDate: formatDate(new Date()),
  };
}

/**
 * Aggregates evaluation results and calculates final scores
 */
export function aggregateEvaluationResults(evaluations) {
  if (!Array.isArray(evaluations) || evaluations.length === 0) {
    throw new Error('Evaluations must be a non-empty array');
  }

  const results = {
    totalScore: 0,
    averageScore: 0,
    categoryScores: {},
    feedbackCount: evaluations.length,
  };

  evaluations.forEach((evaluation) => {
    validateEvaluation(evaluation);

    results.totalScore += evaluation.score;

    // Aggregate category scores
    if (evaluation.category) {
      if (!results.categoryScores[evaluation.category]) {
        results.categoryScores[evaluation.category] = {
          total: 0,
          count: 0,
        };
      }
      results.categoryScores[evaluation.category].total += evaluation.score;
      results.categoryScores[evaluation.category].count += 1;
    }
  });

  // Calculate averages
  results.averageScore = results.totalScore / evaluations.length;

  // Calculate category averages
  Object.keys(results.categoryScores).forEach((category) => {
    const categoryData = results.categoryScores[category];
    categoryData.average = categoryData.total / categoryData.count;
  });

  return results;
}

/**
 * Validates an individual evaluation object
 */
function validateEvaluation(evaluation) {
  if (!evaluation || typeof evaluation !== 'object') {
    throw new Error('Invalid evaluation object');
  }

  if (
    typeof evaluation.score !== 'number' ||
    evaluation.score < MIN_SCORE ||
    evaluation.score > MAX_SCORE
  ) {
    throw new Error(
      `Score must be a number between ${MIN_SCORE} and ${MAX_SCORE}`
    );
  }

  if (evaluation.category && typeof evaluation.category !== 'string') {
    throw new Error('Category must be a string');
  }

  return true;
}

/**
 * Formats a date into a readable string
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
