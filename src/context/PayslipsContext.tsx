/**
 * Payslips Context
 * Provides payslip data and state management throughout the app
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { SortOption, type Payslip, type PayslipFilters } from '../types/payslip';
import { mockPayslips } from '../data/mockPayslips';
import { formatDateRange } from '../utils/dateFormatter';

interface PayslipsContextType {
  payslips: Payslip[];
  sortOption: SortOption;
  filters: PayslipFilters;
  setSortOption: (option: SortOption) => void;
  setFilters: (filters: PayslipFilters) => void;
  getFilteredAndSortedPayslips: () => Payslip[];
}

const PayslipsContext = createContext<PayslipsContextType | undefined>(
  undefined,
);

export function PayslipsProvider({ children }: { children: React.ReactNode }) {
  const [payslips] = useState<Payslip[]>(mockPayslips);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.MostRecent);
  const [filters, setFilters] = useState<PayslipFilters>({});

  const getFilteredAndSortedPayslips = useCallback((): Payslip[] => {
    let result = [...payslips];

    if (filters.year) {
      result = result.filter((payslip) => {
        return new Date(payslip.fromDate).getFullYear() === filters.year
      });
    }

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      result = result.filter((payslip) => {
        // Search in payslip ID
        if (payslip.id.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search in formatted date range (what user sees)
        const formattedDateRange = formatDateRange(payslip.fromDate, payslip.toDate);
        if (formattedDateRange.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search in raw dates (ISO format)
        const rawDates = `${payslip.fromDate} ${payslip.toDate}`;
        if (rawDates.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        return false;
      });
    }

    result.sort((a, b) => {
      const dateA = new Date(a.fromDate).getTime();
      const dateB = new Date(b.fromDate).getTime();

      if (sortOption === SortOption.MostRecent) {
        return dateB - dateA
      } else {
        return dateA - dateB
      }
    });

    return result;
  }, [payslips, sortOption, filters]);

  const value: PayslipsContextType = {
    payslips,
    sortOption,
    filters,
    setSortOption,
    setFilters,
    getFilteredAndSortedPayslips,
  };

  return (
    <PayslipsContext.Provider value={value}>
      {children}
    </PayslipsContext.Provider>
  );
}

export function usePayslips() {
  const context = useContext(PayslipsContext);
  if (context === undefined) {
    throw new Error('usePayslips must be used within a PayslipsProvider');
  }
  return context;
}

