/**
 * Mock payslip data
 * Sample payslips for development and testing
 */

import type { Payslip } from '../types/payslip';

/**
 * Mock payslips data
 * Contains sample payslips spanning multiple years (2023-2024)
 */
const SAMPLE_PDF_URI = '../assets/payslips/sample.pdf'; // Placeholder - will use require() when file is added

export const mockPayslips: Payslip[] = [
  {
    id: 'payslip-001',
    fromDate: '2024-01-01',
    toDate: '2024-01-31',
    file: {
      uri: SAMPLE_PDF_URI,
      type: 'pdf',
    },
  },
  {
    id: 'payslip-002',
    fromDate: '2024-02-01',
    toDate: '2024-02-29',
    file: {
      uri: SAMPLE_PDF_URI,
      type: 'pdf',
    },
  },
  {
    id: 'payslip-003',
    fromDate: '2024-03-01',
    toDate: '2024-03-31',
    file: {
      uri: SAMPLE_PDF_URI,
      type: 'pdf',
    },
  },
  {
    id: 'payslip-004',
    fromDate: '2023-11-01',
    toDate: '2023-11-30',
    file: {
      uri: SAMPLE_PDF_URI,
      type: 'pdf',
    },
  },
  {
    id: 'payslip-005',
    fromDate: '2023-12-01',
    toDate: '2023-12-31',
    file: {
      uri: SAMPLE_PDF_URI,
      type: 'pdf',
    },
  },
  {
    id: 'payslip-006',
    fromDate: '2023-09-01',
    toDate: '2023-09-30',
    file: {
      uri: SAMPLE_PDF_URI,
      type: 'pdf',
    },
  },
  {
    id: 'payslip-007',
    fromDate: '2023-10-01',
    toDate: '2023-10-31',
    file: {
      uri: SAMPLE_PDF_URI,
      type: 'pdf',
    },
  },
  {
    id: 'payslip-008',
    fromDate: '2024-04-01',
    toDate: '2024-04-30',
    file: {
      uri: SAMPLE_PDF_URI,
      type: 'pdf',
    },
  },
];

