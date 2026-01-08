/**
 * Payslip List Screen
 * Displays a scrollable list of payslips with sorting and filtering options
 * 
 * TODO: Implement list rendering, sorting, and filtering
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PayslipListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Payslip List Screen</Text>
      <Text style={styles.subtitle}>To be implemented</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  placeholder: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6E6E6E',
    marginTop: 8,
  },
});

