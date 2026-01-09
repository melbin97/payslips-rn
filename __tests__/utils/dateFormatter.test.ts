/**
 * Tests for date formatting utilities
 */

import {
    formatDateRange,
    formatDate,
    getYear,
    isValidDate,
} from '../../src/utils/dateFormatter';

describe('dateFormatter', () => {
    describe('formatDate', () => {
        test('formats a date correctly', () => {
            const result = formatDate('2024-01-15');
            // Should format as "Jan 15, 2024" (month abbreviation, day, year)
            expect(result).toMatch(/Jan/);
            expect(result).toMatch(/15/);
            expect(result).toMatch(/2024/);
        });

        test('formats different months correctly', () => {
            const jan = formatDate('2024-01-01');
            const dec = formatDate('2024-12-31');

            expect(jan).toMatch(/Jan/);
            expect(dec).toMatch(/Dec/);
        });

        test('formats dates with different years', () => {
            const result2023 = formatDate('2023-06-15');
            const result2024 = formatDate('2024-06-15');

            expect(result2023).toMatch(/2023/);
            expect(result2024).toMatch(/2024/);
        });
    });

    describe('formatDateRange', () => {
        test('formats a date range correctly', () => {
            const result = formatDateRange('2024-01-01', '2024-01-31');
            // Should contain both dates separated by en dash
            expect(result).toContain('Jan');
            expect(result).toContain('2024');
            expect(result).toContain('–'); // en dash character
        });

        test('formats date range spanning different months', () => {
            const result = formatDateRange('2024-01-01', '2024-02-28');
            expect(result).toMatch(/Jan.*Feb/);
            expect(result).toContain('2024');
        });

        test('formats date range spanning different years', () => {
            const result = formatDateRange('2023-12-01', '2024-01-31');
            expect(result).toMatch(/2023/);
            expect(result).toMatch(/2024/);
        });
    });

    describe('getYear', () => {
        test('extracts year from date string', () => {
            expect(getYear('2024-01-15')).toBe(2024);
            expect(getYear('2023-12-31')).toBe(2023);
        });

        test('handles different date formats', () => {
            expect(getYear('2024-06-01')).toBe(2024);
            expect(getYear('2025-01-01')).toBe(2025);
        });
    });

    describe('isValidDate', () => {
        test('returns true for valid date', () => {
            expect(isValidDate('2024-01-15')).toBe(true);
            expect(isValidDate('2023-12-31')).toBe(true);
            expect(isValidDate('2024-02-29')).toBe(true); // Leap year
        });

        test('returns false for invalid date', () => {
            expect(isValidDate('invalid-date')).toBe(false);
            expect(isValidDate('not-a-date')).toBe(false);
            expect(isValidDate('abc')).toBe(false);
            expect(isValidDate('')).toBe(false); // Empty string
        });
    });
});
