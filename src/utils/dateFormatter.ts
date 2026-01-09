/**
 * Date formatting utilities
 * Handles formatting of ISO date strings for display
 */

/**
 * Formats a date range for display
 * Example: "Jan 1, 2024 – Jan 31, 2024"
 *
 * @param fromDate - ISO date string (e.g., "2024-01-01")
 * @param toDate - ISO date string (e.g., "2024-01-31")
 * @returns Formatted date range string
 */
export function formatDateRange(fromDate: string, toDate: string): string {
  // Format: "Jan 1, 2024 – Jan 31, 2024"
  const fromFormatted = formatDate(fromDate);
  const toFormatted = formatDate(toDate);

  return `${fromFormatted} – ${toFormatted}`;
}

/**
 * Formats a single date for display
 * Example: "Jan 1, 2024"
 *
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Extracts the year from an ISO date string
 *
 * @param dateString - ISO date string
 * @returns Year as number
 */
export function getYear(dateString: string): number {
  return new Date(dateString).getFullYear();
}

/**
 * Checks if a date string is valid
 *
 * @param dateString - Date string to validate
 * @returns True if valid, false otherwise
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

