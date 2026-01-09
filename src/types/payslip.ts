/**
 * Payslip data model
 * Each payslip represents a payment period with associated file
 */

export type FileType = 'pdf';

export interface PayslipFile {
  type: FileType;

  // Native-bundled locations (used for download/copy)
  iosBundleName: string;       // e.g. "sample.pdf" (must be in Copy Bundle Resources)
  androidAssetPath: string;    // e.g. "payslips/sample.pdf" (android/app/src/main/assets)

}

export interface Payslip {
  id: string;
  fromDate: string;
  toDate: string;
  file: PayslipFile;
}

/**
 * Sort options for payslip list
 */
export enum SortOption {
  MostRecent = 'most-recent',
  OldestFirst = 'oldest-first',
}

/**
 * Filter options for payslip list
 */
export interface PayslipFilters {
  year?: number;
  searchText?: string;
}
