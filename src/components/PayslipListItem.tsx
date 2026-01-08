import React from "react";
import { Payslip } from "../types/payslip";
import { formatDateRange } from "../utils/dateFormatter";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

interface PayslipListItemProps {
    payslip: Payslip;
    onPress: (payslip: Payslip) => void;
}

export default function PayslipListItem({payslip, onPress}: PayslipListItemProps) {
    const dateRange = formatDateRange(payslip.fromDate, payslip.toDate)

    return (
        <TouchableOpacity 
            onPress={() => onPress(payslip)}
            style={styles.container}
            activeOpacity={0.7}
            accessibilityLabel={`Payslip from ${dateRange}`}
            accessibilityRole="button">
                <View style={styles.content}>
                    <View style={styles.fileTypeContainer}>
                        <Text style={styles.fileTypeText}>PDF</Text>
                    </View>
                    <Text style={styles.dateRange}>{dateRange}</Text>
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    fileTypeContainer: {
        backgroundColor: colors.primaryLight,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 4,
    },
    fileTypeText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.primary,
    },  
    dateRange: {
        fontSize: 16,
        color: colors.text,
        flex: 1,
        marginLeft: spacing.md,
    },

})