/**
 * Payslips Context
 * Provides payslip data and state management throughout the app
 * 
 * TODO: Implement context with mock data and state management
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Payslip, SortOption, PayslipFilters } from '../types/payslip';
import { mockPayslips } from '../data/mockPayslips';

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
  const [sortOption, setSortOption] = useState<SortOption>('most-recent');
  const [filters, setFilters] = useState<PayslipFilters>({});

  const getFilteredAndSortedPayslips = useCallback((): Payslip[] => {
    let result = [...payslips];

    if (filters.year) {
      result = result.filter((payslip) => {
        return new Date(payslip.fromDate).getFullYear() === filters.year
      });
    }

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase()
      result = result.filter((payslip) => {
        const dateRange = `${payslip.fromDate} ${payslip.toDate}`;
        return dateRange.toLowerCase().includes(searchLower)
      })
    }

    result.sort((a, b) => {
      const dateA = new Date(a.fromDate).getTime();
      const dateB = new Date(b.fromDate).getTime();

      if (sortOption === 'most-recent') {
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

