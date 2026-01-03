/**
 * Date Formatter Utilities
 */

/**
 * Convert ISO date string to DD-MM-YYYY format
 * @param {string} isoDateString - ISO formatted date string (e.g., "2025-12-15T18:38:50.000Z")
 * @returns {string} - Formatted date string in DD-MM-YYYY format (e.g., "15-12-2025")
 */
export const formatDateToDDMMYYYY = (isoDateString) => {
  if (!isoDateString) return '';
  
  const date = new Date(isoDateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return '';
  }
  
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  
  return `${day}-${month}-${year}`;
};
