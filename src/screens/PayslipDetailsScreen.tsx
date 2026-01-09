/**
 * Payslip Details Screen
 * Displays payslip information and provides download functionality
 * 
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';
import { formatDateRange } from '../utils/dateFormatter';
import { downloadPayslip, openPayslip } from '../utils/fileHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipDetails'>;

export default function PayslipDetailsScreen({ route }: Props) {
  const { payslip } = route.params;
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const dateRange = formatDateRange(payslip.fromDate, payslip.toDate);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const filePath = await downloadPayslip(
        payslip.id,
        payslip.file
      );

      Alert.alert(
        'Success',
        `Payslip saved to: ${filePath}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Download Failed',
        error instanceof Error ? error.message : 'Unable to download payslip. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreview = async () => {
    setIsPreviewing(true);
    try {
      // First, ensure the file is downloaded
      const filePath = await downloadPayslip(
        payslip.id,
        payslip.file
      );

      // Then open it
      await openPayslip(filePath);
    } catch (error) {
      Alert.alert(
        'Preview Failed',
        error instanceof Error ? error.message : 'Unable to preview payslip. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsPreviewing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Payslip ID</Text>
          <Text style={styles.value}>{payslip.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Period</Text>
          <Text style={styles.value}>{dateRange}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>File Type</Text>
          <View style={styles.fileTypeContainer}>
            <Text style={styles.fileTypeText}>{payslip.file.type.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton, isPreviewing && styles.buttonDisabled]}
          onPress={handlePreview}
          disabled={isPreviewing || isDownloading}
          accessibilityLabel="Preview payslip">
          <Text style={styles.secondaryButtonText}>
            {isPreviewing ? 'Opening...' : 'Preview Payslip'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.downloadButton, isDownloading && styles.buttonDisabled]}
          onPress={handleDownload}
          disabled={isDownloading}
          accessibilityLabel="Download payslip">
          <Text style={styles.buttonText}>
            {isDownloading ? 'Downloading...' : 'Download Payslip'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: colors.text,
  },
  fileTypeContainer: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  fileTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  actions: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButton: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.textTertiary,
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  secondaryButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: spacing.sm,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});

