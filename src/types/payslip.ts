/**
 * Payslip data model
 * Each payslip represents a payment period with associated file
 */

export type FileType = 'pdf' | 'image';

export interface PayslipFile {
  uri: string; // Path to bundled asset (require('./assets/payslips/sample.pdf'))
  type: FileType;
}

export interface Payslip {
  id: string;
  fromDate: string; // ISO format: "2024-01-01"
  toDate: string;   // ISO format: "2024-01-31"
  file: PayslipFile;
}

/**
 * Sort options for payslip list
 */
export type SortOption = 'most-recent' | 'oldest-first';

/**
 * Filter options for payslip list
 */
export interface PayslipFilters {
  year?: number;
  searchText?: string;
}

