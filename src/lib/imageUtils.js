/**
 * Utility functions for handling images
 */

/**
 * Validates if a URL is a valid image URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL is valid, false otherwise
 */
export function isValidImageUrl(url) {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return false;
  }
  
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

/**
 * Gets a valid image URL or a fallback URL
 * @param {string} url - The image URL to validate
 * @param {string} fallbackUrl - The fallback URL to use if the main URL is invalid
 * @returns {string|null} - The valid URL or null if no valid URL is available
 */
export function getValidImageUrl(url, fallbackUrl = null) {
  return isValidImageUrl(url) ? url : fallbackUrl;
}