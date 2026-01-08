/**
 * Theme colors for the app
 * Using React Native's color system
 */

export const colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#5AC8FA',

  // Neutral colors
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  text: '#000000',
  textSecondary: '#6E6E6E',
  textTertiary: '#9E9E9E',

  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',

  // Border and divider
  border: '#E5E5E5',
  divider: '#C6C6C8',

  // Dark mode support (for future use)
  dark: {
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#98989D',
    border: '#38383A',
  },
} as const;

