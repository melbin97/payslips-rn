/**
 * Payslip Details Screen
 * Displays payslip information and provides download functionality
 * 
 * TODO: Implement details display and download functionality
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipDetails'>;

export default function PayslipDetailsScreen({ route }: Props) {
  const { payslip } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Payslip Details Screen</Text>
      <Text style={styles.subtitle}>Payslip ID: {payslip.id}</Text>
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

