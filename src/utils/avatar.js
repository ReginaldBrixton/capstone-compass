/**
 * Generates an avatar URL with fallback to local assets
 * @param {string} name - The name to generate avatar for
 * @param {string} [image] - Optional custom image URL
 * @returns {string} The avatar URL
 */
export function getAvatarUrl(name, image) {
  if (image) return image;

  // Use local fallback avatar
  return '/images/default-avatar.svg';
}
