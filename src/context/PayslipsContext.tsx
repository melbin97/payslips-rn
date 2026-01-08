/**
 * Payslips Context
 * Provides payslip data and state management throughout the app
 * 
 * TODO: Implement context with mock data and state management
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Payslip, SortOption, PayslipFilters } from '../types/payslip';

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
  const [payslips] = useState<Payslip[]>([]); // TODO: Initialize with mock data
  const [sortOption, setSortOption] = useState<SortOption>('most-recent');
  const [filters, setFilters] = useState<PayslipFilters>({});

  const getFilteredAndSortedPayslips = useCallback((): Payslip[] => {
    // TODO: Implement filtering and sorting logic
    return payslips;
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

