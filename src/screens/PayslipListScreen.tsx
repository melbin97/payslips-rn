/**
 * Payslip List Screen
 * Displays a scrollable list of payslips with sorting and filtering options
 */

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { usePayslips } from '../context/PayslipsContext';
import { Payslip, SortOption } from '../types/payslip';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { PayslipListItem } from '../components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function PayslipListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { getFilteredAndSortedPayslips, sortOption, setSortOption, setFilters, filters } = usePayslips();
  const payslips = getFilteredAndSortedPayslips();

  const handlePayslipPress = (payslip: Payslip) => {
    navigation.navigate('PayslipDetails', { payslip })
  }

  const renderSortControls = () => (
    <View style={styles.sortContainer}>
      <TouchableOpacity
        style={[
          styles.sortButton,
          sortOption === SortOption.MostRecent && styles.sortButtonActive
        ]}
        onPress={() => setSortOption(SortOption.MostRecent)}
        accessibilityLabel="Sort by most recent">
        <Text style={[
          styles.sortButtonText,
          sortOption === SortOption.MostRecent && styles.sortButtonTextActive
        ]}>
          Most Recent
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.sortButton,
          sortOption === SortOption.OldestFirst && styles.sortButtonActive
        ]}
        onPress={() => setSortOption(SortOption.OldestFirst)}
        accessibilityLabel="Sort by oldest first">
        <Text style={[
          styles.sortButtonText,
          sortOption === SortOption.OldestFirst && styles.sortButtonTextActive
        ]}>
          Oldest First
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search payslips..."
          placeholderTextColor={colors.textTertiary}
          value={filters.searchText || ''}
          onChangeText={(text) => setFilters({ ...filters, searchText: text })}
          accessibilityLabel="Search payslips"
        />
        {filters.searchText && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setFilters({ ...filters, searchText: '' })}
            accessibilityLabel="Clear search">
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No payslips found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderSortControls()}
      <FlatList
        data={payslips}
        renderItem={({ item }) => (
          <PayslipListItem
            payslip={item}
            onPress={handlePayslipPress}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={payslips.length === 0 ? styles.emptyList : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sortContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sortButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: 4,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortButtonText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: colors.background,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xxl * 2,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  emptyList: {
    flexGrow: 1,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  clearButtonText: {
    fontSize: 24,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

