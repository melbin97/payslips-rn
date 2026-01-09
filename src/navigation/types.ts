/**
 * Navigation type definitions
 * Used for type-safe navigation in React Navigation
 */

import type { Payslip } from '../types/payslip';

export type RootStackParamList = {
  PayslipList: undefined;
  PayslipDetails: {
    payslip: Payslip;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

